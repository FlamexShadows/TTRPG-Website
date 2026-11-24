#!/usr/bin/env python3
import os

WEBPAGES = r"c:\Users\kylep\OneDrive\Desktop\TTRPG Website\Webpages"

def spell_html(name, rank, school, subtype, range_, ap_label, ap_cost, duration, concentration, requirements, description):
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sparks | {name}</title>
    <link rel="icon" type="image/svg+xml" href="favicon.svg">
    <link rel="stylesheet" type="text/css" href="styles.css"/>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script>
        $(function(){{
            $("#header-placeholder").load("a-header.html");
        }});
    </script>
</head>
<body>
    <div id="header-placeholder"></div>
    <div class="main-content">
        <div class="content-panel">
            <h2>{name}</h2>
            <br>
            <b>Range:</b> {range_}<br>
            <b>{ap_label}:</b> {ap_cost}<br>
            <b>Spell Rank:</b> {rank}<br>
            <b>Class:</b> {school}<br>
            <b>Subtype:</b> {subtype}<br>
            <b>Requirements:</b> {requirements}<br>
            <b>Duration:</b> {duration}<br>
            <b>Concentration:</b> {concentration}<br>
            <p>{description}</p>
        </div>
    </div>
</body>
</html>"""

def maneuver_html(name, tier, ap, requirements, type_, range_, duration, concentration, description):
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sparks | {name}</title>
    <link rel="icon" type="image/svg+xml" href="favicon.svg">
    <link rel="stylesheet" type="text/css" href="styles.css"/>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script>
        $(function(){{
            $("#header-placeholder").load("a-header.html");
        }});
    </script>
</head>
<body>
    <div id="header-placeholder"></div>
    <div class="main-content">
        <div class="content-panel">
            <h2>{name}</h2>
            <br>
            <b>Tier:</b> {tier}<br>
            <b>AP Cost:</b> {ap}<br>
            <b>Requirements:</b> {requirements}<br>
            <b>Type:</b> {type_}<br>
            <b>Range:</b> {range_}<br>
            <b>Duration:</b> {duration}<br>
            <b>Concentration:</b> {concentration}<br>
            <p>{description}</p>
        </div>
    </div>
</body>
</html>"""

# Each spell: (filename, name, rank, school, subtype, range_, ap_label, ap_cost, duration, concentration, requirements, description)
SPELLS = [
    # ── MORESPELLS ──────────────────────────────────────────────────────────────
    ("gag-order.html","Gag Order","Minor","Enchantment","Decree","10 Meters","AP Cost","2","1 Minute","No","Words of Power",
     "The caster pronounces a writ of silence upon a creature within range, and its voice dies in its throat. The target must succeed on a Resistance (Mind) save or become Silenced for the duration. The target can repeat its save at the end of each of its turns, ending the effect on a success."),
    ("oath.html","Oath","Adept","Enchantment","Decree","Touch","AP Cost","4","1 Week","No","Words of Power, Sigils",
     "The caster binds a creature to a single spoken promise of no more than one sentence, sworn aloud as the spell is cast. An unwilling creature must fail a Resistance (Mind) save for the oath to take hold. For the duration, whenever the oathbound creature attempts an action that breaks its promise, it must succeed on a Resistance (Mind) save or the action fails, its AP for that action is wasted, and it takes 2d8 psychic damage as the oath tightens. The oath ends early if the caster releases it or dies."),
    ("confiscation.html","Confiscation","Adept","Enchantment","Decree","10 Meters","AP Cost","4","1 Minute","No","Words of Power, Sigils",
     "The caster declares a creature's power forfeit and seizes its connection to its own soul. The target must succeed on a Resistance (Mind) save or become Severed for the duration. The target can repeat its save at the end of each of its turns, ending the effect on a success."),
    ("death-sentence.html","Death Sentence","Major","Enchantment","Decree","15 Meters","AP Cost","5","Instant","No","Words of Power, Sigils",
     "The caster passes final judgement on a creature within range and speaks its execution in the language of endings. The target must succeed on a Resistance (Body) save or take 10d8 necrotic damage. A creature that fails its save by 10 or more dies. Upcasting this spell reduces the failure threshold by 2 for each tier upcast."),
    ("spatial-slash.html","Spatial Slash","Adept","Otherworldly","Space","15 Meters","AP Cost","4","Instant","No","Words of Power",
     "The caster pulls space itself in two opposite directions along a line up to 5 meters long within range, opening a cut where the two halves separate. The slash does not travel — it simply occurs — and is therefore unaffected by cover, barriers, and spells or maneuvers such as Arcane Barrier. Each creature in the line must make an Evasion save, taking 4d6 true damage on a failure or half as much on a success. When upcast the damage increases by 1d6 for each tier upcast."),
    ("puncture.html","Puncture","Adept","Otherworldly","Space","15 Meters","AP Cost","3","Instant","No","Words of Power",
     "The caster creates a point in space that violently repels all matter within a small radius, leaving a perfectly spherical wound or hole. The point does not travel — it simply occurs — and is therefore unaffected by cover, barriers, and spells or maneuvers such as Arcane Barrier. A creature at the point must succeed on an Evasion save or take 3d8 true damage as a sphere of its flesh is forced outward. Used on an object or surface, the spell bores a perfect sphere up to 30 centimeters across out of any nonmagical material."),
    ("explosion.html","Explosion","Adept","Pyromancy","Flame","25 Meters","AP Cost","6","Instant","No","Words of Power, Sigils",
     "The caster gathers a violent knot of fire at a point within range and releases it as a 5 meter radius explosion. Each creature in the radius must make an Evasion save, taking 8d8 fire damage on a failure or half as much on a success. Unattended flammable objects in the radius ignite. When upcast the damage increases by 2d8 for each tier upcast."),
    ("phantom-duplicates.html","Phantom Duplicates","Adept","Enchantment","Illusion","Self","AP Cost","3","1 Minute","No","Words of Power, Sigils",
     "The caster splits into a crowd of itself, creating 5 illusory duplicates that surround it and mimic its every movement. While at least one duplicate remains, an attack against the caster has a 10% miss chance for each remaining duplicate (50% with all 5). If an attack misses because of a duplicate, that duplicate shatters and is destroyed. Duplicates have no mass, make no sound of their own, and are destroyed by any area damage that includes the caster's space."),
    ("protective-ice.html","Protective Ice","Minor","Hydromancy","Ice","Self","AP Cost","1 (Reaction)","Instant","No","Words of Power",
     "When the caster is hit by an attack it can see, it can use its reaction to flash-freeze a plate of ice where the blow would land. The caster gains a +1 to its AC against the triggering attack. If the attack still hits, its damage is reduced by 5. When upcast the AC bonus increases by 1 and the damage reduction increases by 5 for each tier upcast."),
    # ── AEROMANCY ───────────────────────────────────────────────────────────────
    ("static-cling.html","Static Cling","Minor","Aeromancy","Lightning","10 Meters","AP Cost","2","1 Minute","No","Words of Power",
     "The caster charges a creature within range with crackling static. The target takes 1d8 lightning damage. If the target is wearing metal armor or holding a metal weapon, it must succeed on a Resistance (Body) save or become Shocked until the end of its next turn."),
    ("wind-tunnel.html","Wind Tunnel","Adept","Aeromancy","Wind","Self","AP Cost","3","1 Minute","Yes","Words of Power, Sigils",
     "The caster creates a roaring corridor of wind 15 meters long and 3 meters wide originating from itself. Ranged attacks fired with the wind gain 10 meters of range and a +2 to their attack rolls. Ranged attacks fired against the wind suffer a -5 to their attack rolls. Creatures moving against the wind treat the corridor as difficult terrain."),
    ("thunderclap-step.html","Thunderclap Step","Major","Aeromancy","Lightning","Self","AP Cost","4","Instant","No","Words of Power",
     "The caster becomes living lightning, instantly moving up to 20 meters in a straight line to a space it can see. Each creature within 3 meters of the space the caster left takes 4d8 lightning damage from the thunderous crack and must succeed on a Resistance (Body) save or become Deaf for 1 minute. When upcast the caster adds an additional 2d8 lightning damage for each tier upcast."),
    ("eye-of-the-storm.html","Eye of the Storm","Major","Aeromancy","Wind","Self","AP Cost","5","1 Minute","Yes","Words of Power, Sigils",
     "The caster surrounds itself with a sphere of perfectly calm air 10 meters in radius wrapped in howling winds. Ranged attacks that cross the boundary of the sphere in either direction suffer a -5 to their attack rolls as the winds fling them off course. A flying creature that enters the storm wall must succeed on a Resistance (Body) save or be knocked down as it is slammed to the ground."),
    ("stormcall.html","Stormcall","Grand","Aeromancy","Lightning","Self","Casting Time","1 Minute","1 Hour","No","Words of Power, Sigils",
     "The caster calls a black storm that gathers over 1 kilometer of sky. Rain and wind impair vision, and flames in the open are snuffed out. While the storm lasts, the caster can spend 2 AP to call a bolt of lightning down on a point it can see. Each creature within 2 meters of the point must make an Evasion save, taking 8d8 lightning damage on a failure or half as much on a success."),
    # ── ARCANOMANCY ─────────────────────────────────────────────────────────────
    ("arcane-lattice.html","Arcane Lattice","Adept","Arcanomancy","Creation","10 Meters","AP Cost","3","1 Minute","No","Words of Power, Sigils",
     "The caster weaves threads of pure magic into a glowing lattice wall up to 5 meters wide and 3 meters tall within range. The wall blocks movement and projectiles but not sight. The lattice has health equal to 5 times the caster's casting modifier. When upcast the wall's size and health are doubled for each tier upcast."),
    ("spellbreaker-lance.html","Spellbreaker Lance","Major","Arcanomancy","Destruction","20 Meters","AP Cost","4","Instant","No","Words of Power",
     "The caster hurls a lance of condensed magic at a creature within range. The caster makes an attack roll. On a hit the target takes 6d8 magic damage. If the target is concentrating on a spell, its concentration check against this damage is made at a -5."),
    ("mirror-cage.html","Mirror Cage","Major","Arcanomancy","Creation","15 Meters","AP Cost","5","1 Minute","Yes","Words of Power, Sigils",
     "The caster traps a creature within a cage of mirrored force. If the creature has no Magical Armor, it must succeed on a Resistance (Mind) save or become sealed inside the cage. A sealed creature cannot move from its space, and attacks and spells cannot pass into or out of the cage. The creature can repeat its save at the end of each of its turns, shattering the cage on a success."),
    ("glyph-of-recall.html","Glyph of Recall","Major","Arcanomancy","Creation","Touch","Casting Time","10 Minutes","Permanent","No","Words of Power, Sigils",
     "The caster inscribes an invisible glyph upon a surface it touches. While within 1 kilometer of the glyph, the caster can spend 2 AP to instantly teleport to it. The glyph is consumed when used. A caster may only have one Glyph of Recall inscribed at a time."),
    ("unravel.html","Unravel","Grand","Arcanomancy","Destruction","15 Meters","AP Cost","6","Instant","No","Words of Power, Sigils",
     "The caster seizes the threads of magic woven around a creature or object within range and tears them apart. All spells of Major rank or lower affecting the target immediately end. For each spell ended this way, the target takes 2d8 magic damage. This spell cannot be upcast."),
    # ── BIOMANCY ────────────────────────────────────────────────────────────────
    ("chitinous-plating.html","Chitinous Plating","Adept","Biomancy","Evolution","Touch","AP Cost","3","1 Hour","No","Words of Power, Sigils",
     "The caster hardens a creature's skin into segmented chitin plates. The target gains a +2 to its AC for the duration. When the spell ends the plates crack and shed. When upcast to Major or above the AC bonus increases to +4."),
    ("adrenal-surge.html","Adrenal Surge","Adept","Biomancy","Evolution","Touch","AP Cost","2","1 Minute","No","Words of Power",
     "The caster floods a creature's body with primal vigor. The target becomes Hastened until the end of its next turn. When the spell ends, the target becomes Tired until the end of its following turn as its body pays the price. This spell cannot be upcast."),
    ("venom-glands.html","Venom Glands","Adept","Biomancy","Evolution","Self","AP Cost","3","10 Minutes","No","Words of Power, Sigils, 1 Mutagen",
     "The caster grows venom glands along its teeth and nails. For the duration, the caster's melee and natural attacks deal an additional 1d6 poison damage, and a creature hit by them must succeed on a Resistance (Body) save or become Poisoned for 1 minute."),
    ("regrow-limb.html","Regrow Limb","Adept","Biomancy","Fleshcraft","Touch","Casting Time","1 Hour","Instant","No","Words of Power, Sigils, 1 Mutagen",
     "The caster coaxes a creature's flesh into rapid, guided growth. Over the course of an hour, one of the target's severed or destroyed limbs regrows whole and functional. The process is painful but harmless."),
    ("predators-senses.html","Predator's Senses","Adept","Biomancy","Evolution","Self","AP Cost","2","1 Hour","No","Words of Power",
     "The caster sharpens its senses to those of an apex hunter. For the duration, the caster gains a +5 to checks made to track, perceive, or smell creatures, and it cannot become Unaware of creatures within 10 meters of itself."),
    ("flesh-sculptor.html","Flesh Sculptor","Major","Biomancy","Fleshcraft","Touch","AP Cost","5","Instant","No","Words of Power, Sigils, 1 Mutagen",
     "The caster reshapes a creature's features like wet clay, changing its face, voice, build, and markings into any form of the same size and species. An unwilling creature must succeed on a Resistance (Body) save or be reshaped. The change is permanent until reversed by this spell or similar magic."),
    ("hivemind-spawn.html","Hivemind Spawn","Major","Biomancy","Fleshcraft","Self","AP Cost","6","1 Hour","No","Words of Power, Sigils, 1 Mutagen",
     "The caster grows a small, chittering drone from its own flesh that detaches and obeys its will. The drone has health equal to the caster's casting modifier, moves 8 meters per AP spent by the caster, and shares its senses with the caster at all times. The drone dissolves into ichor when the spell ends or when reduced to 0 health."),
    ("apex-evolution.html","Apex Evolution","Major","Biomancy","Evolution","Self","AP Cost","6","1 Minute","Yes","Words of Power, Sigils, 1 Mutagen",
     "The caster forces its body through a thousand generations of evolution at once. For the duration the caster grows one size category larger, gains 30 true armor, deals an additional 2d8 physical damage with melee attacks, and is immune to the Poisoned and Diseased conditions. When the spell ends the caster becomes Exhausted. This spell cannot be upcast."),
    ("genetic-memory.html","Genetic Memory","Grand","Biomancy","Evolution","Touch","Casting Time","1 Hour","Instant","No","Words of Power, Sigils, 1 Mutagen",
     "The caster consumes a sample of a creature's flesh and unwinds the memory written in its blood. The caster permanently gains one non-magical trait of that creature, such as gills, darkvision, webbed limbs, or venomous fangs. A caster can only hold one trait gained this way at a time; gaining a new trait replaces the old."),
    # ── CHRONOMANCY ─────────────────────────────────────────────────────────────
    ("moments-glance.html","Moment's Glance","Minor","Chronomancy","Time","Self","AP Cost","1","Instant","No","Words of Power",
     "The caster glimpses six seconds into the future. The caster rerolls one attack roll, check, or save it just made and must use the new result. This spell cannot be upcast."),
    ("rust-and-dust.html","Rust and Dust","Minor","Chronomancy","Entropy","10 Meters","AP Cost","2","Instant","No","Words of Power",
     "The caster accelerates the age of a nonmagical object within range. An unattended object the size of a chest or smaller corrodes, rots, or crumbles with years of decay. If the object is worn or held, its owner can make an Evasion save to pull it clear. Metal armor aged this way begins Corroding."),
    ("echo-step.html","Echo Step","Minor","Chronomancy","Time","Self","AP Cost","2","Instant","No","Words of Power",
     "The caster steps 3 meters in any direction, leaving behind a flickering after-image of itself a half-second out of sync. The first attack roll made against the caster before the start of its next turn automatically misses as it strikes the echo."),
    ("temporal-lock.html","Temporal Lock","Major","Chronomancy","Time","15 Meters","AP Cost","5","1 Minute","Yes","Words of Power, Sigils",
     "The caster seals a 3 meter radius sphere within range outside the flow of time. Each creature in the sphere must succeed on a Resistance (Mind) save or become Paralyzed, frozen in a single instant. A creature frozen this way cannot be damaged or moved, and it repeats its save at the end of each of its turns. Objects and projectiles entering the sphere hang suspended until the spell ends."),
    # ── DEMONOLOGY ──────────────────────────────────────────────────────────────
    ("mark-of-the-pit.html","Mark of the Pit","Adept","Demonology","Damnation","10 Meters","AP Cost","3","1 Minute","No","Words of Power, Sigils",
     "The caster brands a creature within range with a smoldering sigil of the underworld. The target must succeed on a Resistance (Mind) save or become Cursed for the duration. While Cursed this way, the target takes an additional 1d6 unholy damage from all Demonology spells."),
    ("whispering-doubt.html","Whispering Doubt","Adept","Demonology","Torment","15 Meters","AP Cost","2","1 Minute","Yes","Words of Power",
     "The caster fills a creature's mind with whispers in a voice it trusts. The target must succeed on a Resistance (Mind) save or become Fearful for the duration. While Fearful this way, the target takes 1d4 psychic damage at the start of each of its turns. The target can repeat its save at the end of each of its turns."),
    ("soul-bargain.html","Soul Bargain","Adept","Demonology","Tether","Touch","AP Cost","2","1 Hour","No","Words of Power, Sigils",
     "The caster offers a sliver of infernal power in exchange for a hold on a willing creature's soul. The target gains 10 temporary health for the duration. When the spell ends, the caster regains health equal to any of those temporary health that remain. When upcast the temporary health increases by 5 for each tier upcast."),
    ("chains-of-sin.html","Chains of Sin","Adept","Demonology","Tether","10 Meters","AP Cost","4","1 Minute","Yes","Words of Power, Sigils",
     "Spectral chains of black iron burst from the ground beneath a creature within range. The target must succeed on a Resistance (Body) save or become Pinned. A creature Pinned this way takes 2d6 unholy damage each time it attempts to escape and fails. The target can repeat its save at the end of each of its turns."),
    ("hellgate.html","Hellgate","Major","Demonology","Damnation","20 Meters","AP Cost","6","1 Minute","Yes","Words of Power, Sigils",
     "The caster tears a 3 meter wide breach into the underworld at a point it can see. At the start of each of the caster's turns, a lesser fiend crawls out of the breach under the caster's command, to a maximum of 3 fiends. The fiends use the caster's Magic Potency DC and crumble to ash when the spell ends."),
    ("price-of-pride.html","Price of Pride","Major","Demonology","Curse","Sight","Casting Time","1 Minute","Permanent","No","Words of Power, Sigils, An Obsidian Skull worth at least 3000 Gold consumed upon casting",
     "The caster lays a grand curse upon a creature it can see, naming aloud a task that would take no longer than 1 action. The target must succeed on a Resistance (Mind) save or have one stat of the caster's choice reduced by 5. The curse can only be ended by a grand purge of Grand rank or by fulfilling a condition the caster names when the curse is laid. This spell cannot be upcast."),
    # ── ENCHANTMENT ─────────────────────────────────────────────────────────────
    ("phantom-orchestra.html","Phantom Orchestra","Minor","Enchantment","Illusion","20 Meters","AP Cost","2","1 Minute","Yes","Words of Power",
     "The caster conjures sound anywhere within range: music, marching boots, a voice, or any noise it has heard before. The sound can move within range and change as the caster wishes. A creature that inspects the sound must succeed on a Resistance (Mind) save to recognize it as illusory."),
    ("crowds-favor.html","Crowd's Favor","Adept","Enchantment","Charm","Self","AP Cost","3","10 Minutes","No","Words of Power",
     "The caster wraps itself in an aura of effortless charisma. For the duration, creatures within 10 meters that can see the caster view it as friendly and trustworthy unless given reason not to, and the caster gains a +5 to checks made to persuade, entertain, or deceive. A creature that is attacked by the caster or its allies is freed from the effect."),
    ("marionette-strings.html","Marionette Strings","Adept","Enchantment","Puppetry","10 Meters","AP Cost","4","1 Minute","Yes","Words of Power, Sigils",
     "Threads of invisible will settle over a creature within range. If the creature has no Magical Armor, it must succeed on a Resistance (Mind) save or be strung like a puppet. While the target is strung, the caster can spend 2 AP to force it to move up to its speed or make a single attack against a target of the caster's choice. The target repeats its save at the end of each of its turns."),
    ("waking-dream.html","Waking Dream","Adept","Enchantment","Illusion","15 Meters","AP Cost","5","10 Minutes","Yes","Words of Power, Sigils",
     "The caster pulls a creature's mind into a dream while its eyes remain open. The target must succeed on a Resistance (Mind) save or become Unaware as it perceives an environment entirely of the caster's design. The target repeats its save each time it takes damage. When the spell ends, the target remembers the dream as if it truly happened."),
    ("mass-beguile.html","Mass Beguile","Major","Enchantment","Charm","15 Meters","AP Cost","6","1 Minute","No","Words of Power, Sigils",
     "The caster's voice splits into a chorus that each listener hears alone. Up to 5 creatures of the caster's choice within range must succeed on a Resistance (Mind) save or become Charmed by the caster for the duration. A creature Charmed this way is freed if it or an ally it can see is harmed by the caster."),
    ("memory-architect.html","Memory Architect","Grand","Enchantment","Manipulation","Touch","Casting Time","10 Minutes","Permanent","No","Words of Power, Sigils",
     "The caster rebuilds a creature's memories like rooms in a house, removing, altering, or constructing up to one year of memory in vivid detail. An unwilling creature must fail a Resistance (Mind) save for the work to take hold. Restoring the true memories requires magic of Grand rank. This spell cannot be upcast."),
    # ── GEOMANCY ────────────────────────────────────────────────────────────────
    ("seismic-sense.html","Seismic Sense","Minor","Geomancy","Earth","Self","AP Cost","2","10 Minutes","No","Words of Power",
     "The caster reads the tremors in the ground beneath it. For the duration, the caster knows the location of every creature touching the ground within 15 meters of it, and it cannot become Unaware of grounded creatures within that distance."),
    ("iron-maiden.html","Iron Maiden","Adept","Geomancy","Metal","10 Meters","AP Cost","5","1 Minute","No","Words of Power, Sigils",
     "The caster bends a creature's own armor against it. A creature within range wearing metal armor must succeed on a Resistance (Body) save or take 4d8 piercing damage as the armor constricts and become Pinned inside it. The target repeats its save at the end of each of its turns, taking 2d8 piercing damage on each failure. This spell has no effect on creatures not wearing metal armor."),
    ("fault-line.html","Fault Line","Major","Geomancy","Earth","20 Meters","AP Cost","5","Instant","No","Words of Power, Sigils",
     "The ground splits in a line 15 meters long and 2 meters wide from a point within range. Each creature in the line must make an Evasion save. On a failure a creature takes 4d6 bludgeoning damage and falls 3 meters into the fissure, becoming Pinned until it climbs free. On a success a creature takes half damage and moves to the nearest edge. The fissure remains as difficult terrain."),
    ("crystal-resonance.html","Crystal Resonance","Major","Geomancy","Crystal","15 Meters","AP Cost","4","1 Minute","No","Words of Power, Sigils",
     "The caster embeds a humming shard of crystal into a creature within range. The target must succeed on a Resistance (Body) save or be pierced by the shard for the duration. Each time the pierced creature casts a spell, the shard rings violently and deals 6d6 earth damage to it. The shard can be torn free as an action with 2 AP, dealing 1d6 piercing damage."),
    ("meteoric-spire.html","Meteoric Spire","Major","Geomancy","Rock","20 Meters","AP Cost","6","Instant","No","Words of Power, Sigils",
     "A spire of stone 10 meters tall erupts from the ground at a point within range. Each creature standing on the point must make an Evasion save, taking 5d10 bludgeoning damage and being carried to the top of the spire on a failure, or moving to the nearest edge on a success. The spire is permanent and can be climbed with a Body check."),
    ("magma-wake.html","Magma Wake","Grand","Geomancy","Magma","Self","AP Cost","6","1 Minute","Yes","Words of Power, Sigils",
     "The caster's steps melt the earth. For the duration, the caster leaves a trail of molten rock 5 meters wide behind it as it moves. A creature that enters the trail or starts its turn in it takes 15d8 fire damage. When the spell ends the trail cools into jagged, difficult terrain."),
    ("continental-wrath.html","Continental Wrath","Grand","Geomancy","Earth","Self","Casting Time","1 Minute","Instant","No","Words of Power, Sigils",
     "The caster drives its will deep into the bones of the earth and heaves. The ground within 1 kilometer shakes violently for one minute. Structures crack and lesser buildings collapse. Each creature within 100 meters of the caster must succeed on a Balance check at the start of each of its turns or be knocked down, and creatures within 20 meters of the caster take 16d6 earth damage as the ground tears open. The caster is unaffected by the quake."),
    # ── HEAVENLY ────────────────────────────────────────────────────────────────
    ("lantern-of-vigil.html","Lantern of Vigil","Adept","Heavenly","Protection","Touch","AP Cost","2","1 Hour","No","Words of Power",
     "The caster kindles a warm, golden light upon an object it touches, shedding bright light for 15 meters. Allies within the light cannot become Fearful or Hopeless, and fiends and undead within the light suffer a -2 to their attack rolls."),
    ("aegis-of-devotion.html","Aegis of Devotion","Adept","Heavenly","Protection","10 Meters","AP Cost","3","1 Minute","Yes","Words of Power, Sigils",
     "A shimmering ward of golden wings settles over a creature within range. The first 3 attacks that hit the warded creature deal half damage as the wings absorb the blow. After the third attack the ward shatters and the spell ends."),
    ("censure.html","Censure","Adept","Heavenly","Retribution","15 Meters","AP Cost","3","Instant","No","Words of Power",
     "The caster pronounces judgement upon a creature within range, striking it with a column of white flame. The target takes 3d8 holy damage, or 5d8 holy damage if it is a fiend or undead. A fiend or undead damaged this way must succeed on a Resistance (Mind) save or become Silenced until the end of its next turn."),
    ("mercys-touch.html","Mercy's Touch","Adept","Heavenly","Mercy","Touch","AP Cost","2","Instant","No","Words of Power",
     "The caster lays its hand upon a creature and draws out its affliction. The target is healed for 2d8 health, and one of the following conditions affecting it ends: Bleeding, Poisoned, or Diseased."),
    ("oath-of-the-shepherd.html","Oath of the Shepherd","Adept","Heavenly","Virtue","Self","AP Cost","3","10 Minutes","No","Words of Power, Sigils",
     "The caster swears to stand between its companions and harm. Choose up to 3 allied creatures within 10 meters. For the duration, whenever a chosen ally within 10 meters of the caster takes damage, the caster can use its reaction to take half of that damage in the ally's place."),
    ("halo-of-returning.html","Halo of Returning","Adept","Heavenly","Mercy","Touch","AP Cost","4","1 Hour","No","Words of Power, Sigils",
     "The caster crowns a creature with a faint, golden ring of light. If the marked creature would be reduced to 0 health while the spell lasts, it instead drops to 1 health and the halo burns away, ending the spell. A creature can only benefit from Halo of Returning once per day."),
    ("choir-eternal.html","Choir Eternal","Major","Heavenly","Virtue","Self","AP Cost","5","1 Minute","Yes","Words of Power, Sigils",
     "Unseen voices rise around the caster in a hymn that fills a 10 meter radius. Allies that start their turn within the hymn regain 1d8 health and cannot become Fearful or Hopeless. Enemies within the hymn suffer a -2 to their attack rolls as the song weighs on their resolve."),
    ("judgement-of-the-host.html","Judgement of the Host","Grand","Heavenly","Retribution","Sight","Casting Time","1 Minute","Instant","No","Words of Power, Sigils, Holy Offering Worth at least 1000 GP",
     "The caster condenses a beam of blinding light 100 meters long and 10 meters wide. Each creature in the pillar must make an Evasion save, taking 10d8 holy damage on a failure or half as much on a success. A creature that fails the save is also Severed for 1 minute. This spell cannot be upcast."),
    # ── HYDROMANCY ──────────────────────────────────────────────────────────────
    ("undertow.html","Undertow","Adept","Hydromancy","Water","15 Meters","AP Cost","3","Instant","No","Words of Power, Sigils",
     "A surge of churning water rushes along the ground in a line 10 meters long from a point within range. Each creature in the line takes 3d6 water damage and must succeed on a Resistance (Body) save or be dragged 5 meters toward a point of the caster's choice along the line and knocked down."),
    ("glacial-tomb.html","Glacial Tomb","Major","Hydromancy","Ice","15 Meters","AP Cost","5","1 Minute","No","Words of Power, Sigils",
     "The caster entombs a creature within range in a coffin of ice. If the creature has no Magical Armor, it must succeed on a Resistance (Body) save or become Pinned inside the ice, taking 3d6 cold damage at the start of each of its turns. The tomb has 30 health and an AC equal to the caster's DC. The tomb can be attacked by other creatures. The target repeats its save at the end of each of its turns."),
    ("riptide-serpent.html","Riptide Serpent","Major","Hydromancy","Water","20 Meters","AP Cost","6","1 Minute","Yes","Words of Power, Sigils",
     "The caster shapes a great serpent of rushing water that occupies a large creature's space within range. The caster can spend 2 AP to command the serpent to move 10 meters or strike a creature within 3 meters of it. On a strike the caster makes an attack roll; on a hit the target takes 4d8 water damage and must succeed on a Resistance (Body) save or be Grappling with the serpent's coils."),
    ("pressure-of-the-deep.html","Pressure of the Deep","Major","Hydromancy","Water","15 Meters","AP Cost","5","Instant","No","Words of Power, Sigils",
     "The caster crushes a 5 meter radius sphere within range under the weight of a drowned ocean. Each creature in the sphere must make a Resistance (Body) save, taking 6d10 bludgeoning damage and becoming Slowed until the end of its next turn on a failure, or taking half damage on a success."),
    ("wrath-of-the-tides.html","Wrath of the Tides","Grand","Hydromancy","Water","Sight","Casting Time","1 Minute","Instant","No","Words of Power, Sigils, Water",
     "The caster raises a wall of seawater 20 meters tall and 100 meters wide and sends it crashing forward up to 500 meters. Each creature caught in the wave takes 10d6 water damage and is swept up to 20 meters and knocked down; a creature that succeeds on a Resistance (Body) save takes half damage and is not swept. Small structures are destroyed and flames are extinguished. The water drains away over the following minute."),
    # ── NATURE ──────────────────────────────────────────────────────────────────
    ("thorn-snare.html","Thorn Snare","Minor","Nature","Primal","10 Meters","AP Cost","2","1 Minute","No","Words of Power",
     "Barbed vines whip out of the ground beneath a creature within range. The target must make an Evasion save or take 1d6 piercing damage and become Pinned by the vines. The target can repeat a Resistance (Body) save at the end of each of its turns to tear free."),
    ("verdant-pulse.html","Verdant Pulse","Minor","Nature","Nurture","Touch","AP Cost","2","Instant","No","Words of Power",
     "The caster presses life into the soil. Plants within 10 meters bloom, ripen, and thicken as though a season has passed. A plant creature touched by the caster instead regains 2d6 health."),
    ("call-of-the-wild.html","Call of the Wild","Adept","Nature","Primal","Self","AP Cost","4","10 Minutes","No","Words of Power, Sigils",
     "The caster's howl rings far beyond what any ear can hear. Two beasts of the wild shaped from leaf and sinew answer, appearing within 5 meters of the caster. The beasts use the caster's Magic Potency DC, obey its commands, and scatter into leaves when the spell ends or when reduced to 0 health."),
    ("bark-of-the-ancient.html","Bark of the Ancient","Adept","Nature","Nurture","Touch","AP Cost","3","10 Minutes","No","Words of Power",
     "The caster wraps a creature in layered bark as hard as old oak. The target gains a +3 to its AC for the duration, but takes an additional 1d6 damage from fire damage as the bark kindles."),
    ("pollen-daze.html","Pollen Daze","Adept","Nature","Primal","15 Meters","AP Cost","3","1 Minute","No","Words of Power, Sigils",
     "A golden cloud of pollen blooms in a 5 meter radius at a point within range and lingers for the duration. A creature that enters the cloud or starts its turn within it must succeed on a Resistance (Body) save or become Nauseated until the end of its next turn."),
    ("heartwood-sanctum.html","Heartwood Sanctum","Major","Nature","Nurture","Touch","AP Cost","6","8 Hours","No","Words of Power, Sigils",
     "The caster touches a living tree of large size or greater, and its trunk opens into a hidden hollow that can shelter up to 8 creatures. The entrance seals behind those who enter and cannot be found without magic. Creatures resting within the sanctum recover twice the health they normally would."),
    ("worldroot-march.html","Worldroot March","Grand","Nature","Primal","Sight","Casting Time","1 Minute","1 Hour","Yes","Words of Power, Sigils",
     "The caster wakes the old roots. Up to 3 trees the caster can see tear themselves from the earth as towering guardians. Each guardian has health equal to 10 times the caster's casting modifier, strikes with branches for 4d8 bludgeoning damage using the caster's Magic Potency DC, and moves 5 meters per 2 AP the caster spends."),
    ("seasons-turning.html","Season's Turning","Grand","Nature","Nurture","Self","Casting Time","1 Hour","1 Week","No","Words of Power, Sigils",
     "The caster turns the wheel of the year within 1 kilometer of itself, shifting the land into a season of its choice. Snow falls in midsummer or orchards bloom in deep winter; crops grow or sleep, rivers freeze or thaw, and beasts behave according to the new season. The land returns to its true season when the spell ends. This spell cannot be upcast."),
    # ── NECROMANCY ──────────────────────────────────────────────────────────────
    ("deadmans-tale.html","Deadman's Tale","Minor","Necromancy","Death","Touch","AP Cost","4","Instant","No","Words of Power, Sigils",
     "The caster opens the final account of a corpse it touches that has been dead for no longer than one week. The corpse answers up to 3 questions put to it, speaking with what knowledge it held in life. The dead are not compelled to honesty toward those they hated."),
    ("grave-chill.html","Grave Chill","Adept","Necromancy","Death","15 Meters","AP Cost","3","1 Minute","No","Words of Power",
     "The caster reaches into a creature within range with the cold of the grave. The target takes 4d6 cold damage and must succeed on a Resistance (Body) save or begin Draining for the duration. The target can repeat its save at the end of each of its turns."),
    ("merged-monstrosity.html","Merged Monstrosity","Adept","Necromancy","Puppetry","10 Meters","AP Cost","6","1 Hour","No","Words of Power, Sigils, An obsidian skull worth at least 750 gold, Mimic Life",
     "The caster calls still-warm bones and cold flesh to combine into a merged beast. This creature uses the same stats as undead raised by Mimic Life cast at the same tier and gains a trait from each of the creatures used as an undead."),
    ("soul-harvest.html","Soul Harvest","Major","Necromancy","Death","Self","AP Cost","5","Instant","No","Words of Power, Sigils",
     "The caster gathers the unspent essence of the recently dead. For each creature that has died within 20 meters of the caster in the last minute, to a maximum of 3, the caster regains 5 health and 1 AP. The harvested dead cannot be raised as undead for one week."),
    ("necrotic-bloom.html","Necrotic Bloom","Major","Necromancy","Decay","20 Meters","AP Cost","5","1 Minute","No","Words of Power, Sigils",
     "A flower of rot unfurls at a point within range, blighting a 5 meter radius circle. Each creature in the circle takes 6d6 necrotic damage, or half on a successful Resistance (Body) save. Plants in the circle wither and die, and for the duration any healing received by a creature within the circle is reduced to 0."),
    ("pact-of-the-deathless.html","Pact of the Deathless","Grand","Necromancy","Death","Self","Casting Time","1 Hour","Permanent","No","Words of Power, Sigils, An Obsidian Skull worth at least 3000 Gold consumed upon casting",
     "The caster binds a fragment of its soul into the prepared skull, hiding it from death itself. The first time each month the caster begins Dying, its body crumbles to ash and reforms whole beside the skull 24 hours later. If the skull is destroyed the pact is broken. A caster may only be bound to one such vessel at a time. This spell cannot be upcast."),
    ("silence-of-the-grave.html","Silence of the Grave","Grand","Necromancy","Decay","20 Meters","AP Cost","6","1 Minute","Yes","Words of Power, Sigils",
     "The caster smothers a 10 meter radius sphere within range under the stillness of a tomb. No sound can be made within the sphere, and creatures inside are Silenced. A living creature that starts its turn in the sphere must succeed on a Resistance (Body) save or begin Draining until it leaves the sphere. Undead within the sphere deal an additional 2 dice with their attacks."),
    # ── OTHERWORLDLY ────────────────────────────────────────────────────────────
    ("pocket-stash.html","Pocket Stash","Minor","Otherworldly","Dimension","Self","AP Cost","1","Permanent","No","Words of Power",
     "The caster folds a small pocket of space just outside reality. The pocket holds up to 10 kilograms of objects, which the caster can store or retrieve with 1 AP. If the spell is dispelled, its contents spill out at the caster's feet. A caster may only maintain one Pocket Stash at a time."),
    ("fold-space.html","Fold Space","Adept","Otherworldly","Space","Self","AP Cost","3","Instant","No","Words of Power",
     "The caster creases the world like paper and steps across the fold, teleporting up to 10 meters to a space it can see. The caster may instead swap places with a willing creature within 10 meters. When upcast the distance doubles for each tier upcast."),
    ("probability-flux.html","Probability Flux","Adept","Otherworldly","Chaos","10 Meters","AP Cost","2","1 Minute","Yes","Words of Power",
     "The caster knots the threads of chance around a creature within range. For the duration, whenever the target rolls a d20, it also rolls a d4: on a 1 it subtracts 5 from the result, and on a 4 it adds 5. If the target has no Magical Armor it receives no save; otherwise it negates the spell with a successful Resistance (Mind) save."),
    ("maze-of-elsewhere.html","Maze of Elsewhere","Adept","Otherworldly","Dimension","15 Meters","AP Cost","5","1 Minute","No","Words of Power, Sigils",
     "The caster banishes a creature within range into a shifting labyrinth folded between worlds. The target must succeed on a Resistance (Mind) save or vanish from the world. While in the maze the target can do nothing on its turn except make a Resistance (Mind) check to find the way out; on a success, or when the spell ends, it reappears in the space it left or the nearest open space."),
    ("rift-storm.html","Rift Storm","Grand","Otherworldly","Chaos","20 Meters","AP Cost","6","1 Minute","Yes","Words of Power, Sigils",
     "Reality tears open across a 10 meter radius sphere within range. A creature that starts its turn in the storm takes 6d8 magic damage and is teleported 5 meters in a random direction. The terrain within the storm shifts and rearranges at the start of each of the caster's turns. This spell cannot be upcast."),
    ("door-to-anywhere.html","Door to Anywhere","Grand","Otherworldly","Dimension","Self","Casting Time","10 Minutes","1 Minute","No","Words of Power, Sigils, Material listed below worth 10,000 GP",
     "The caster inscribes a doorframe in silver dust and opens it onto any location it has seen with its own eyes, on this world or another. The door remains open for one minute, allowing creatures to pass freely in both directions, then seals forever. The silver dust is consumed upon casting."),
    # ── PNEUMAMANCY ─────────────────────────────────────────────────────────────
    ("soul-sight.html","Soul Sight","Minor","Pneumamancy","Manipulation","Self","AP Cost","1","10 Minutes","No","Words of Power",
     "The caster's eyes open to the world of souls. For the duration, the caster sees the glow of living souls within 10 meters even through walls, and can tell at a glance whether a creature is living, undead, Severed, or Possessed."),
    ("breath-of-vigor.html","Breath of Vigor","Minor","Pneumamancy","Restoration","Touch","AP Cost","2","Instant","No","Words of Power",
     "The caster breathes a measure of its own essence into a creature it touches. The caster takes 1d6 true damage and the target regains 2d6 health and is no longer Tired or Exhausted."),
    ("spirit-nudge.html","Spirit Nudge","Minor","Pneumamancy","Manipulation","10 Meters","AP Cost","2","Instant","No","Words of Power",
     "The caster flicks a creature's soul slightly out of step with its body. The target must succeed on a Resistance (Mind) save or lose 1 AP on its next turn as it stumbles back into itself."),
    ("twinned-souls.html","Twinned Souls","Minor","Pneumamancy","Manipulation","Touch","AP Cost","3","1 Hour","No","Words of Power, Sigils",
     "The caster braids the souls of two willing creatures together with a silver thread only they can see. For the duration, each knows the direction to the other and whether the other is wounded, Dying, or under a condition. The thread snaps harmlessly if they move more than 1 kilometer apart."),
    ("essence-lash.html","Essence Lash","Adept","Pneumamancy","Severance","10 Meters","AP Cost","3","Instant","No","Words of Power",
     "The caster cracks a whip of pale soulstuff at a creature within range. The caster makes an attack roll. On a hit the lash passes through shield and steel, dealing 4d6 magic damage that ignores AC granted by magic."),
    ("spirit-walk.html","Spirit Walk","Adept","Pneumamancy","Manipulation","Self","AP Cost","4","10 Minutes","Yes","Words of Power, Sigils",
     "The caster steps out of its body, which falls Unconscious where it stands. The caster's spirit moves up to 10 meters per AP spent, passes through solid objects, and cannot be seen except by magic that perceives souls. The spirit cannot interact with the physical world. The caster returns to its body when the spell ends, or instantly if the body takes damage."),
    ("mend-the-veil.html","Mend the Veil","Adept","Pneumamancy","Restoration","Touch","AP Cost","3","Instant","No","Words of Power, Sigils",
     "The caster smooths the torn edges where soul meets body. The Severed condition affecting a creature the caster touches ends. If the creature is Possessed, the possessing entity must succeed on a Resistance (Mind) save against the caster's Magic Potency DC or be expelled."),
    ("soul-brand.html","Soul Brand","Adept","Pneumamancy","Severance","10 Meters","AP Cost","4","1 Minute","No","Words of Power, Sigils",
     "The caster sears a glowing mark directly onto a creature's soul. The target must succeed on a Resistance (Mind) save or begin Draining for the duration as its essence leaks through the brand. While branded, the target takes an additional 1d6 true damage from all magic damage. The target repeats its save at the end of each of its turns."),
    ("transmigration.html","Transmigration","Grand","Pneumamancy","Manipulation","Touch","Casting Time","1 Hour","Permanent","No","Words of Power, Sigils, Material listed below worth 10,000 GP",
     "Over the course of an hour, the caster guides a willing creature's soul out of its body and into a prepared vessel: a fresh corpse, a constructed body, or a body grown by magic. The original body dies as the soul departs. The soul wakes in its new vessel with all of its memories and none of its old body's ailments. This spell cannot be upcast."),
    # ── PYROMANCY ───────────────────────────────────────────────────────────────
    ("cinder-snap.html","Cinder Snap","Minor","Pyromancy","Flame","Self","AP Cost","4","Instant","No","Words of Power, Sigils",
     "The caster snaps its fingers, creating 3 motes of fire that float above its head. Once per turn as a free action, the caster makes an attack roll on a creature within 10 meters. On a hit the target takes 1d8 fire damage and flammable unattended objects ignite."),
    ("ashen-shroud.html","Ashen Shroud","Adept","Pyromancy","Ash","Self","AP Cost","3","1 Minute","No","Words of Power, Sigils",
     "The caster wraps itself in a whirling shroud of hot ash. Attack rolls against the caster suffer a -2 for the duration. When a creature within melee range hits the caster with an attack, it must succeed on a Resistance (Body) save or become Blind until the end of its next turn as the ash stings its eyes."),
    ("phoenix-heart.html","Phoenix Heart","Grand","Pyromancy","Flame","Self","AP Cost","6","1 Hour","No","Words of Power, Sigils",
     "The caster kindles an ember of rebirth behind its ribs. If the caster is reduced to 0 health while the spell lasts, its body erupts in a 5 meter radius blast of flame dealing 8d6 fire damage to each creature in the radius, and the caster rises from the ashes at half its maximum health. The spell then ends. This spell cannot be upcast."),
    ("caldera.html","Caldera","Grand","Pyromancy","Magma","Sight","Casting Time","1 Minute","Instant","No","Words of Power, Sigils, Sulfur",
     "The caster cracks the world's crust at a point it can see. The ground in a 30 meter radius sinks and floods with magma. Each creature in the area when the caldera forms takes 10d6 fire damage, or half on a successful Evasion save, and must reach the edge or burn. The magma cools over a day, leaving the land permanently scarred."),
    # ── TENEMANCY ───────────────────────────────────────────────────────────────
    ("gloom-veil.html","Gloom Veil","Minor","Tenemancy","Penumbra","Self","AP Cost","2","10 Minutes","No","Words of Power",
     "The caster gathers the dimness around itself into a clinging veil. For the duration, the caster gains a +5 to checks made to hide or move unseen while in dim light or darkness."),
    ("dark-whisper.html","Dark Whisper","Minor","Tenemancy","Umbra","15 Meters","AP Cost","1","Instant","No","Words of Power",
     "The caster speaks into its own shadow, and the words crawl along the dark to a creature within range whose shadow the caster can see. Only the target hears the message, and it may whisper a reply along the same path."),
    ("umbral-hand.html","Umbral Hand","Adept","Tenemancy","Umbra","15 Meters","AP Cost","3","1 Minute","Yes","Words of Power, Sigils",
     "A great hand of solid shadow rises within range. The caster can spend 2 AP to command the hand to move 10 meters, strike, shove, or grasp. On a strike the caster makes an attack roll, dealing 3d6 magic damage on a hit. A creature grasped by the hand must succeed on a Resistance (Body) save or be Grappling with it."),
    ("nights-mantle.html","Night's Mantle","Adept","Tenemancy","Penumbra","Self","AP Cost","4","1 Minute","No","Words of Power, Sigils",
     "The caster's body thins into half-shadow. For the duration, the caster takes half damage from physical attacks and can squeeze through any gap a coin could pass through. While in bright light the mantle frays, and the caster loses these benefits until it returns to dim light or darkness."),
    ("eclipse.html","Eclipse","Major","Tenemancy","Penumbra","Self","AP Cost","6","1 Minute","Yes","Words of Power, Sigils",
     "The caster pulls a dome of perfect darkness 20 meters in radius over itself. No light can pierce the dome, and creatures other than the caster within it are Blind. The caster sees within its own darkness as though it were day. Magical light of Major rank or higher burns a hole in the dome where it shines."),
    ("kingdom-of-shadow.html","Kingdom of Shadow","Grand","Tenemancy","Umbra","Self","Casting Time","10 Minutes","1 Hour","No","Words of Power, Sigils",
     "The caster drags a 10 meter radius circle of the world down into the realm of shadow. Everything within the circle vanishes from the world, leaving empty ground behind. Within the shadowed kingdom, the caster chooses the shape of the terrain and the dark obeys its will. Creatures inside can only leave if the caster permits it, the caster is slain, or the spell ends, at which point the circle and everything in it return. This spell cannot be upcast."),
    # ── TRANSMUTATION ───────────────────────────────────────────────────────────
    ("quicksilver-body.html","Quicksilver Body","Adept","Transmutation","Enhancement","Touch","AP Cost","3","1 Minute","No","Words of Power, Sigils",
     "The caster makes a creature's flesh flow like living mercury. For the duration, the target automatically escapes the Grappling and Pinned conditions at the start of its turn, and can squeeze through any gap a coin could pass through."),
    ("leaden-bones.html","Leaden Bones","Adept","Transmutation","Transformation","10 Meters","AP Cost","4","1 Minute","No","Words of Power, Sigils",
     "The caster turns the marrow of a creature within range to lead. If the creature has no Magical Armor, it must succeed on a Resistance (Body) save or become Slowed for the duration as its weight triples. A flying creature that fails the save falls. The target repeats its save at the end of each of its turns."),
    ("perfect-edge.html","Perfect Edge","Adept","Transmutation","Enhancement","Touch","AP Cost","2","10 Minutes","No","Words of Power",
     "The caster realigns the metal of a weapon it touches into a flawless killing edge. For the duration, the weapon deals an additional 1d4 physical damage and ignores 5 physical resistance. When upcast to Major the physical resistance ignored doubles."),
    ("philosophers-decree.html","Philosopher's Decree","Grand","Transmutation","Transformation","Touch","Casting Time","1 Hour","Permanent","No","Words of Power, Sigils, Material listed below worth 10,000 GP",
     "The caster speaks the true name of matter and it obeys. One nonmagical object the caster touches, weighing up to 50 kilograms, is permanently transmuted into another material of the caster's choice of equal or lesser value. Living creatures cannot be transmuted this way. This spell cannot be upcast."),
]

MANEUVERS = [
    ("dash.html","Dash","Basic","1","—","Movement","Self","Instant","No",
     "The martialist moves with measured, defensive footwork. Until the end of its turn, the martialist's movement does not provoke opportunity attacks."),
    ("sprint.html","Sprint","Basic","1","Dash","Movement","Self","Instant","No",
     "The martialist breaks into a hard run. Until the end of its turn, the martialist's movement speed increases by 10 meters."),
    ("breakneck.html","Breakneck","Expert","2","Sprint","Movement","Self","Instant","No",
     "The martialist explodes forward faster than the eye can follow, moving up to 50 meters. This movement is too fast to provoke opportunity attacks."),
]

# ── 1. Generate spell pages ──────────────────────────────────────────────────
created = 0
skipped = 0
for row in SPELLS:
    fn, name, rank, school, subtype, range_, ap_label, ap_cost, duration, conc, req, desc = row
    path = os.path.join(WEBPAGES, fn)
    if os.path.exists(path):
        skipped += 1
        continue
    with open(path, "w", encoding="utf-8") as f:
        f.write(spell_html(name, rank, school, subtype, range_, ap_label, ap_cost, duration, conc, req, desc))
    created += 1

print(f"Spell pages: {created} created, {skipped} already existed")

# ── 2. Generate maneuver pages ───────────────────────────────────────────────
mc, ms = 0, 0
for row in MANEUVERS:
    fn, name, tier, ap, req, type_, range_, duration, conc, desc = row
    path = os.path.join(WEBPAGES, fn)
    if os.path.exists(path):
        ms += 1
        continue
    with open(path, "w", encoding="utf-8") as f:
        f.write(maneuver_html(name, tier, ap, req, type_, range_, duration, conc, desc))
    mc += 1

print(f"Maneuver pages: {mc} created, {ms} already existed")

# ── 3. Update spells-complete.html ──────────────────────────────────────────
def inject_spells(html, school_id, rank_name, new_items):
    """Insert new spell-items into the correct school+rank spell-list div."""
    school_marker = f'id="{school_id}"'
    school_pos = html.find(school_marker)
    if school_pos == -1:
        print(f"  WARNING: school '{school_id}' not found")
        return html

    rank_marker = f'>{rank_name}<'
    rank_pos = html.find(rank_marker, school_pos)
    if rank_pos == -1:
        print(f"  WARNING: rank '{rank_name}' not found in '{school_id}'")
        return html

    sl_marker = 'class="spell-list">'
    sl_pos = html.find(sl_marker, rank_pos)
    if sl_pos == -1:
        print(f"  WARNING: spell-list not found for '{school_id}' {rank_name}")
        return html

    content_start = sl_pos + len(sl_marker)
    depth = 1
    pos = content_start
    while pos < len(html) and depth > 0:
        next_open = html.find('<div', pos)
        next_close = html.find('</div>', pos)
        if next_close == -1:
            break
        if next_open != -1 and next_open < next_close:
            depth += 1
            pos = next_open + 4
        else:
            depth -= 1
            if depth == 0:
                insert_str = "\n" + "\n".join(
                    f'                        <div class="spell-item"><a href="{fn}">{name}</a></div>'
                    for fn, name in new_items
                )
                return html[:next_close] + insert_str + "\n                    " + html[next_close:]
            pos = next_close + 6

    print(f"  WARNING: could not find end of spell-list for '{school_id}' {rank_name}")
    return html

# Map: (school_id, rank) -> [(filename, display_name)]
injections = {
    ("aeromancy","Minor"): [("static-cling.html","Static Cling")],
    ("aeromancy","Adept"): [("wind-tunnel.html","Wind Tunnel")],
    ("aeromancy","Major"): [("thunderclap-step.html","Thunderclap Step"),("eye-of-the-storm.html","Eye of the Storm")],
    ("aeromancy","Grand"): [("stormcall.html","Stormcall")],
    ("arcanomancy","Adept"): [("arcane-lattice.html","Arcane Lattice")],
    ("arcanomancy","Major"): [("spellbreaker-lance.html","Spellbreaker Lance"),("mirror-cage.html","Mirror Cage"),("glyph-of-recall.html","Glyph of Recall")],
    ("arcanomancy","Grand"): [("unravel.html","Unravel")],
    ("biomancy","Adept"): [("chitinous-plating.html","Chitinous Plating"),("adrenal-surge.html","Adrenal Surge"),("venom-glands.html","Venom Glands"),("regrow-limb.html","Regrow Limb"),("predators-senses.html","Predator's Senses")],
    ("biomancy","Major"): [("flesh-sculptor.html","Flesh Sculptor"),("hivemind-spawn.html","Hivemind Spawn"),("apex-evolution.html","Apex Evolution")],
    ("biomancy","Grand"): [("genetic-memory.html","Genetic Memory")],
    ("chronomancy","Minor"): [("moments-glance.html","Moment's Glance"),("rust-and-dust.html","Rust and Dust"),("echo-step.html","Echo Step")],
    ("chronomancy","Major"): [("temporal-lock.html","Temporal Lock")],
    ("demonology","Adept"): [("mark-of-the-pit.html","Mark of the Pit"),("whispering-doubt.html","Whispering Doubt"),("soul-bargain.html","Soul Bargain"),("chains-of-sin.html","Chains of Sin")],
    ("demonology","Major"): [("hellgate.html","Hellgate"),("price-of-pride.html","Price of Pride")],
    ("enchantment","Minor"): [("phantom-orchestra.html","Phantom Orchestra"),("gag-order.html","Gag Order")],
    ("enchantment","Adept"): [("crowds-favor.html","Crowd's Favor"),("marionette-strings.html","Marionette Strings"),("waking-dream.html","Waking Dream"),("oath.html","Oath"),("confiscation.html","Confiscation"),("phantom-duplicates.html","Phantom Duplicates")],
    ("enchantment","Major"): [("mass-beguile.html","Mass Beguile"),("death-sentence.html","Death Sentence")],
    ("enchantment","Grand"): [("memory-architect.html","Memory Architect")],
    ("geomancy","Minor"): [("seismic-sense.html","Seismic Sense")],
    ("geomancy","Adept"): [("iron-maiden.html","Iron Maiden")],
    ("geomancy","Major"): [("fault-line.html","Fault Line"),("crystal-resonance.html","Crystal Resonance"),("meteoric-spire.html","Meteoric Spire")],
    ("geomancy","Grand"): [("magma-wake.html","Magma Wake"),("continental-wrath.html","Continental Wrath")],
    ("heavenly","Adept"): [("lantern-of-vigil.html","Lantern of Vigil"),("aegis-of-devotion.html","Aegis of Devotion"),("censure.html","Censure"),("mercys-touch.html","Mercy's Touch"),("oath-of-the-shepherd.html","Oath of the Shepherd"),("halo-of-returning.html","Halo of Returning")],
    ("heavenly","Major"): [("choir-eternal.html","Choir Eternal")],
    ("heavenly","Grand"): [("judgement-of-the-host.html","Judgement of the Host")],
    ("hydromancy","Minor"): [("protective-ice.html","Protective Ice")],
    ("hydromancy","Adept"): [("undertow.html","Undertow")],
    ("hydromancy","Major"): [("glacial-tomb.html","Glacial Tomb"),("riptide-serpent.html","Riptide Serpent"),("pressure-of-the-deep.html","Pressure of the Deep")],
    ("hydromancy","Grand"): [("wrath-of-the-tides.html","Wrath of the Tides")],
    ("nature","Minor"): [("thorn-snare.html","Thorn Snare"),("verdant-pulse.html","Verdant Pulse")],
    ("nature","Adept"): [("call-of-the-wild.html","Call of the Wild"),("bark-of-the-ancient.html","Bark of the Ancient"),("pollen-daze.html","Pollen Daze")],
    ("nature","Major"): [("heartwood-sanctum.html","Heartwood Sanctum")],
    ("nature","Grand"): [("worldroot-march.html","Worldroot March"),("seasons-turning.html","Season's Turning")],
    ("necromancy","Minor"): [("deadmans-tale.html","Deadman's Tale")],
    ("necromancy","Adept"): [("grave-chill.html","Grave Chill"),("merged-monstrosity.html","Merged Monstrosity")],
    ("necromancy","Major"): [("soul-harvest.html","Soul Harvest"),("necrotic-bloom.html","Necrotic Bloom")],
    ("necromancy","Grand"): [("pact-of-the-deathless.html","Pact of the Deathless"),("silence-of-the-grave.html","Silence of the Grave")],
    ("otherworldly","Minor"): [("pocket-stash.html","Pocket Stash")],
    ("otherworldly","Adept"): [("spatial-slash.html","Spatial Slash"),("puncture.html","Puncture"),("fold-space.html","Fold Space"),("probability-flux.html","Probability Flux"),("maze-of-elsewhere.html","Maze of Elsewhere")],
    ("otherworldly","Grand"): [("rift-storm.html","Rift Storm"),("door-to-anywhere.html","Door to Anywhere")],
    ("pneumamancy","Minor"): [("soul-sight.html","Soul Sight"),("breath-of-vigor.html","Breath of Vigor"),("spirit-nudge.html","Spirit Nudge"),("twinned-souls.html","Twinned Souls")],
    ("pneumamancy","Adept"): [("essence-lash.html","Essence Lash"),("spirit-walk.html","Spirit Walk"),("mend-the-veil.html","Mend the Veil"),("soul-brand.html","Soul Brand")],
    ("pneumamancy","Grand"): [("transmigration.html","Transmigration")],
    ("pyromancy","Minor"): [("cinder-snap.html","Cinder Snap")],
    ("pyromancy","Adept"): [("explosion.html","Explosion"),("ashen-shroud.html","Ashen Shroud")],
    ("pyromancy","Grand"): [("phoenix-heart.html","Phoenix Heart"),("caldera.html","Caldera")],
    ("tenemancy","Minor"): [("gloom-veil.html","Gloom Veil"),("dark-whisper.html","Dark Whisper")],
    ("tenemancy","Adept"): [("umbral-hand.html","Umbral Hand"),("nights-mantle.html","Night's Mantle")],
    ("tenemancy","Major"): [("eclipse.html","Eclipse")],
    ("tenemancy","Grand"): [("kingdom-of-shadow.html","Kingdom of Shadow")],
    ("transmutation","Adept"): [("quicksilver-body.html","Quicksilver Body"),("leaden-bones.html","Leaden Bones"),("perfect-edge.html","Perfect Edge")],
    ("transmutation","Grand"): [("philosophers-decree.html","Philosopher's Decree")],
}

sc_path = os.path.join(WEBPAGES, "spells-complete.html")
with open(sc_path, "r", encoding="utf-8") as f:
    sc_html = f.read()

for (school_id, rank), items in injections.items():
    # Skip items already present
    items_to_add = [(fn, name) for fn, name in items if fn not in sc_html]
    if not items_to_add:
        continue
    sc_html = inject_spells(sc_html, school_id, rank, items_to_add)
    print(f"  + {school_id} {rank}: added {[n for _,n in items_to_add]}")

with open(sc_path, "w", encoding="utf-8") as f:
    f.write(sc_html)
print("spells-complete.html updated")

# ── 4. Update martial-maneuver.html ─────────────────────────────────────────
mm_path = os.path.join(WEBPAGES, "martial-maneuver.html")
with open(mm_path, "r", encoding="utf-8") as f:
    mm_html = f.read()

# Add Dash and Sprint to Basic column (after last Basic item - whirlwind.html)
if "dash.html" not in mm_html:
    mm_html = mm_html.replace(
        '<a href="whirlwind.html">Whirlwind</a>',
        '<a href="whirlwind.html">Whirlwind</a>\n                        <a href="dash.html">Dash</a>\n                        <a href="sprint.html">Sprint</a>'
    )
    print("  + Basic: added Dash, Sprint")

# Add Breakneck to Expert column (after last Expert item - vanish.html)
if "breakneck.html" not in mm_html:
    mm_html = mm_html.replace(
        '<a href="vanish.html">Vanish</a>',
        '<a href="vanish.html">Vanish</a>\n                        <a href="breakneck.html">Breakneck</a>'
    )
    print("  + Expert: added Breakneck")

with open(mm_path, "w", encoding="utf-8") as f:
    f.write(mm_html)
print("martial-maneuver.html updated")

print("\nDone.")
