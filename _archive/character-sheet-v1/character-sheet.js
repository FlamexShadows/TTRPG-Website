// character-sheet.js — Sparks of Dynasty Character Sheet Engine
// =============================================================================

(function () {
    'use strict';

    // =========================================================================
    //  GAME DATA (from Sparks (New).xlsx reference sheets)
    // =========================================================================

    const STATS = [
        { key: 'strength',     label: 'Strength' },
        { key: 'finesse',      label: 'Finesse' },
        { key: 'fortitude',    label: 'Fortitude' },
        { key: 'charisma',     label: 'Charisma' },
        { key: 'wits',         label: 'Wits' },
        { key: 'intelligence', label: 'Intelligence' },
        { key: 'memory',       label: 'Memory' },
    ];

    // Skill → governing stat key mapping
    const SKILLS = [
        { name: 'Allure',                   stat: 'charisma' },
        { name: 'Animal Handling',          stat: 'charisma' },
        { name: 'Balance',                  stat: 'finesse' },
        { name: 'Deception',               stat: 'charisma' },
        { name: 'Endurance',               stat: 'fortitude' },
        { name: 'Heavy Object Interaction', stat: 'strength' },
        { name: 'Inspect Object',          stat: 'intelligence' },
        { name: 'Intimidate (Cha)',        stat: 'charisma' },
        { name: 'Intimidate (Str)',        stat: 'strength' },
        { name: 'Intuition',              stat: 'wits' },
        { name: 'Knowledge (Arcana)',      stat: 'intelligence' },
        { name: 'Knowledge (Demonic)',     stat: 'intelligence' },
        { name: 'Knowledge (Divine)',      stat: 'intelligence' },
        { name: 'Knowledge (History)',     stat: 'memory' },
        { name: 'Knowledge (Medical)',     stat: 'intelligence' },
        { name: 'Knowledge (Nature)',      stat: 'intelligence' },
        { name: 'Knowledge (Spiritual)',   stat: 'intelligence' },
        { name: 'Overpower',              stat: 'strength' },
        { name: 'Persuasion',             stat: 'charisma' },
        { name: 'Sense Environment',      stat: 'wits' },
        { name: 'Sleight of Hand',        stat: 'finesse' },
        { name: 'Sneak',                  stat: 'finesse' },
        { name: 'Survival',               stat: 'wits' },
        { name: 'Traverse (Finesse)',     stat: 'finesse' },
        { name: 'Traverse (Str)',         stat: 'strength' },
        { name: 'Teamwork',               stat: 'charisma' },
    ];

    const RACES = [
        { name: 'Changeling',   bonuses: 'Charisma +2', speed: '5 Walk',  alignment: 'Any Neutral', resist: '--',         languages: 'Universal, Changeling',           ability: "As a changeling you gain the ability to transform into a humanoid creature you've touched. You can only maintain one disguise at a time." },
        { name: 'Clockwork',    bonuses: 'Intelligence +2', speed: '5 Walk', alignment: 'Any Non-Evil', resist: '--',     languages: 'Universal, 2 Languages of choice', ability: "As a clockwork being when you take a full rest you heal your entire HP. In addition you are resistant to poison damage and cannot be poisoned." },
        { name: 'Dark Elf',     bonuses: 'Finesse +2', speed: '5 Walk',   alignment: 'Any', resist: '--',               languages: 'Universal, Elvish',                 ability: "Dark Elves use the Moon Elf racial but replace fire with shadow spells." },
        { name: 'Dragonborn',   bonuses: 'Strength +2, Fortitude +1', speed: '5 Walk', alignment: 'Any', resist: 'Choice 10', languages: 'Universal, Draconic', ability: "As a dragonborn the blood of dragons is potent in your veins. You may select a color of dragon. You gain the damage type associated with that dragon as a resistance." },
        { name: 'Dwarf',        bonuses: 'Fortitude +2', speed: '4 Walk', alignment: 'Any Lawful', resist: 'Poison 10', languages: 'Universal, Dwarvish',             ability: "As a dwarf your keen eye for stone and masonry has lead to a lifetime of craftsmanship. You gain proficiency in one tool of choice and receive an additional 1d4 on tool checks." },
        { name: 'Elf',          bonuses: 'Intelligence +2', speed: '5 Walk', alignment: 'Any', resist: '--',           languages: 'Universal, Elvish',                 ability: "As an elf you embrace the memory of others through flesh. A number of times equal to your level per full rest, when an elf tastes a creature's flesh it reads its memories." },
        { name: 'Fiary',        bonuses: 'Wits +2', speed: '3 Walk, 5 Fly', alignment: 'Any Good', resist: '--',        languages: 'Universal, Sylvan',                 ability: "As a fairy, the inherent magic allows flight and fey charm." },
        { name: 'Gnome',        bonuses: 'Intelligence +1, Memory +1', speed: '5 Walk', alignment: 'Any', resist: '--', languages: 'Universal, Gnomish',               ability: "As a gnome, you may select 2 Minor spells of choice. Cast once per rest without mana." },
        { name: 'Goblin',       bonuses: 'Finesse +1, Wits +1', speed: '5 Walk', alignment: 'Any Non-Lawful', resist: '--', languages: 'Universal, Goblin',           ability: "As a goblin any creature larger than you provokes opportunity attacks from you when moving out of your reach." },
        { name: 'Goliath',      bonuses: 'Strength +2, Fortitude +1', speed: '5 Walk', alignment: 'Any', resist: '--',  languages: 'Universal, Giant',                 ability: "As a goliath your massive size gives you a 10ft reach and you count as large for grapple checks." },
        { name: 'Half Elf',     bonuses: 'Charisma +1, +1 to stat of choice', speed: '5 Walk', alignment: 'Any', resist: '--', languages: 'Universal, Elvish, Language of choice', ability: "As a half elf you gain an additional feat at 1st level." },
        { name: 'Half Orc',     bonuses: 'Strength +1, +1 to stat of choice', speed: '5 Walk', alignment: 'Any', resist: '--', languages: 'Universal, Language of choice', ability: "As a half orc whenever you roll for a critical or decisive strike your threat range is increased by 10." },
        { name: 'Human',        bonuses: 'Intelligence +2, Memory +2', speed: '5 Walk', alignment: 'Any', resist: '--', languages: 'Universal, 1 Common language of choice', ability: "As a human you gain additional skill levels equal to your level." },
        { name: 'Kederkai',     bonuses: 'Wits +1', speed: '5 Walk', alignment: 'Any Neutral', resist: 'Magic 10',     languages: 'Universal, Kender',                 ability: "As a kenderkai select two Templates: Winged (fly 5), Thick Carapace (+2 AC), Antenne (+2 Sense Environment), Hardened Exoskeleton (enemies +10 penalty on crits)." },
        { name: 'Kull',         bonuses: 'Intelligence +2', speed: '5 Walk', alignment: 'Any Evil', resist: 'Poison 10', languages: 'Universal, Kull',                 ability: "As a Kull you gain a natural bite weapon (1d4 piercing, light, hidden). Bitten creatures must save vs DC 10+Level or become paralyzed for hours equal to your level." },
        { name: 'Moon Elf',     bonuses: 'Finesse +2', speed: '5 Walk', alignment: 'Any', resist: 'Fire 10',           languages: 'Universal, Elvish',                 ability: "Select 2 Minor Pyromancy spells. Cast once per rest without mana. Taste flesh to read memories." },
        { name: 'Orc',          bonuses: 'Strength +2', speed: '5 Walk', alignment: 'Any', resist: '--',               languages: 'Universal, Orcish',                 ability: "A number of times per full rest equal to your level, reroll a harmful check. Cannot stack with itself." },
        { name: 'Predator Slime', bonuses: 'Fortitude +2', speed: '5 Walk', alignment: 'Any', resist: '--',            languages: 'Universal, 1 Language of Choice',   ability: "Amorphous body (fit through 1cm gaps). Natural weapon 1d6+Str/Dex. Every 5 levels add deadly/reach/ranged/defensive/cleave/enchanted. Can consume a magic weapon." },
        { name: 'Qeptol',       bonuses: 'Fortitude +2, Strength +1', speed: '5 Walk', alignment: 'Any', resist: 'Earth 10', languages: 'Universal',                  ability: "+5 to Resistance (Body) checks. No food/sleep required. Need 6h sunlight/day. Considered a plant." },
        { name: 'Undead',       bonuses: 'Racial bonus of previous race', speed: 'Base Race Speed', alignment: 'Any Neutral', resist: '--', languages: '2 Languages of Choice', ability: "When gaining the dying condition, remain dying for rounds equal to your level and continue acting normally." },
    ];

    const CLASSES = [
        { name: 'Grove Keeper', hp: 5 },
        { name: 'Hunter',      hp: 4 },
        { name: 'Mage',        hp: 3 },
        { name: 'Pact Keeper', hp: 3 },
        { name: 'Phantom',     hp: 4 },
        { name: 'Priest',      hp: 3 },
        { name: 'Warrior',     hp: 6 },
    ];

    // Mana per level per class (index 0 = level 1, up to level 25)
    const MANA_TABLE = {
        'Mage':        [4,8,12,16,20,24,28,32,36,40,44,48,52,56,60,64,68,72,76,80,84,88,92,96,100],
        'Pact Keeper': [5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100,105,110,115,120,125],
        'Grove Keeper':[3,6,9,12,15,18,21,24,27,30,33,36,39,42,45,48,51,54,57,60,63,66,69,72,75],
        'Priest':      [3,6,9,12,15,18,21,24,27,30,33,36,39,42,45,48,51,54,57,60,63,66,69,72,75],
        'Warrior':     [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25],
        'Phantom':     [2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50],
        'Hunter':      [2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50],
    };

    // Stat increases by level from the Dump sheet (primary, secondary per level)
    const LEVEL_STAT_PROGRESSION = [
        // [level, primary, secondary]
        [1,  2, 1],  [2,  2, 2],  [3,  3, 2],  [4,  4, 2],  [5,  5, 3],
        [6,  6, 3],  [7,  6, 4],  [8,  7, 4],  [9,  8, 4],  [10,10, 5],
        [11,12, 5],  [12,12, 7],  [13,14, 7],  [14,16, 7],  [15,19,10],
        [16,22,10],  [17,22,13],  [18,25,13],  [19,28,13],  [20,32,17],
        [21,36,17],  [22,36,21],  [23,40,21],  [24,44,21],  [25,49,26],
    ];

    const WEAPONS = [
        { name: 'Longsword',    die: '1d10', traits: 'Two Handed',                          price: 20,  range: 1, dmgType: 'Physical' },
        { name: 'Arming Sword', die: '1d8',  traits: 'Deadly I',                            price: 10,  range: 1, dmgType: 'Physical' },
        { name: 'Rapier',       die: '1d6',  traits: 'Light, Deadly',                       price: 50,  range: 1, dmgType: 'Physical' },
        { name: 'Claymore',     die: '2d10', traits: 'Heavy, Cleave, Reach I, Skilled',     price: 100, range: 1, dmgType: 'Physical' },
        { name: 'Unarmed Strike', die: '1',  traits: 'N/A',                                 price: 0,   range: 1, dmgType: 'Physical' },
    ];

    const ARMORS = [
        { name: 'Plate',     ac: 30, maxFinesse: 2,  penalty: 8, price: 2500, type: 'Heavy' },
        { name: 'Half Plate',ac: 20, maxFinesse: 7,  penalty: 3, price: 1500, type: 'Medium' },
        { name: 'Chainmail', ac: 18, maxFinesse: 3,  penalty: 1, price: 200,  type: 'Heavy' },
        { name: 'Leather',   ac: 10, maxFinesse: 30, penalty: 0, price: 50,   type: 'Light' },
    ];

    const SHIELDS = [
        { name: 'Round Shield', acBonus: 3, price: 20,  weight: '1 KG', penalty: 2 },
        { name: 'Kite Shield',  acBonus: 5, price: 30,  weight: '5 KG', penalty: 3 },
        { name: 'Buckler',      acBonus: 1, price: 50,  weight: '10 KG', penalty: 0 },
        { name: 'Rondache',     acBonus: 4, price: 0,   weight: '-',    penalty: 4 },
    ];

    const WEAPON_TRAITS = [
        { name: 'Hidden',   desc: 'Easily concealable. Creatures without Observant cannot spot it.' },
        { name: 'Piercing', desc: 'Spend 2 extra AP to deal true damage with damage dice.' },
        { name: 'Light',    desc: 'Uses Finesse instead of Strength for attack and damage.' },
        { name: 'Ranged',   desc: 'Used from range. -5 to attacks while in melee with hostile creatures.' },
        { name: 'Heavy',    desc: 'Requires Strength to wield effectively.' },
        { name: 'Cleave',   desc: 'Can hit adjacent targets.' },
        { name: 'Reach I',  desc: 'Extends attack reach.' },
        { name: 'Deadly',   desc: 'Enhanced critical hit damage.' },
        { name: 'Skilled',  desc: 'Requires training to use.' },
        { name: 'Two Handed', desc: 'Requires both hands.' },
        { name: 'Defensive', desc: 'Provides defensive bonuses.' },
    ];

    const SPELL_TIERS = [
        { key: 'minor', label: 'Minor',  cost: '5 Mana',  slots: 15 },
        { key: 'adept', label: 'Adept',  cost: '10 Mana', slots: 15 },
        { key: 'major', label: 'Major',  cost: '20 Mana', slots: 15 },
        { key: 'grand', label: 'Grand',  cost: '40 Mana', slots: 15 },
    ];

    const MANEUVER_TIERS = [
        { key: 'basic',    label: 'Basic',    cost: '5 Stamina',  slots: 15 },
        { key: 'advanced', label: 'Advanced', cost: '10 Stamina', slots: 15 },
        { key: 'expert',   label: 'Expert',   cost: '15 Stamina', slots: 15 },
        { key: 'master',   label: 'Master',   cost: '20 Stamina', slots: 15 },
    ];

    const BODY_SLOTS = ['Head','Face','Neck','Body','Wrists','Waist','Legs','Feet','Hands','Misc 1','Misc 2'];

    const CELL_MODIFIERS = [
        'Health Bonus',          'Initiative Bonus',
        'Magic Armor Bonus',     'Critical/Decisive Bonus',
        'Physical Armor Bonus',  'Armor Class Bonus',
        'Attack Mod Bonus (W1)', 'Spell 1 DC Bonus',
        'Attack Dmg Bonus (W1)', 'Spell Atk 1 Modifier',
        'Attack Mod Bonus (W2)', 'Spell 2 DC Bonus',
        'Attack Dmg Bonus (W2)', 'Spell Atk 2 Bonus',
        'Attack Mod Bonus (W3)', 'Martial 1 DC Bonus',
        'Attack Dmg Bonus (W3)', 'Martial Atk 1 Bonus',
        'Attack Mod Bonus (W4)', 'Martial 2 DC Bonus',
        'Attack Dmg Bonus (W4)', 'Martial Atk 2 Bonus',
        'Armor Penalty Reduction','Armor Finesse Maximum',
    ];


    // =========================================================================
    //  DOM HELPERS
    // =========================================================================

    const $ = id => document.getElementById(id);
    const numVal = id => { const v = parseFloat($(id)?.value); return isNaN(v) ? 0 : v; };

    function showToast(msg) {
        const t = $('toast');
        t.textContent = msg;
        t.classList.add('show');
        setTimeout(() => t.classList.remove('show'), 2200);
    }


    // =========================================================================
    //  TAB NAVIGATION
    // =========================================================================

    document.querySelectorAll('.sheet-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.sheet-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
            tab.classList.add('active');
            $(tab.dataset.tab).classList.add('active');
        });
    });


    // =========================================================================
    //  POPULATE DROPDOWNS
    // =========================================================================

    function populateDropdowns() {
        // Races
        const raceSelect = $('char-race');
        RACES.forEach(r => {
            const o = document.createElement('option');
            o.value = r.name; o.textContent = r.name;
            raceSelect.appendChild(o);
        });

        // Classes (both slots)
        ['char-class1', 'char-class2'].forEach(id => {
            const sel = $(id);
            CLASSES.forEach(c => {
                const o = document.createElement('option');
                o.value = c.name; o.textContent = c.name;
                sel.appendChild(o);
            });
            if (id === 'char-class2') {
                const none = document.createElement('option');
                none.value = 'None'; none.textContent = 'None';
                sel.appendChild(none);
            }
        });

        // Armor
        const armorSel = $('combat-armor');
        ARMORS.forEach(a => {
            const o = document.createElement('option');
            o.value = a.name; o.textContent = `${a.name} (AC ${a.ac}, ${a.type})`;
            armorSel.appendChild(o);
        });

        // Shield
        const shieldSel = $('combat-shield');
        SHIELDS.forEach(s => {
            const o = document.createElement('option');
            o.value = s.name; o.textContent = `${s.name} (+${s.acBonus} AC)`;
            shieldSel.appendChild(o);
        });
    }


    // =========================================================================
    //  BUILD STAT TABLE
    // =========================================================================

    function buildStatTable() {
        const tbody = $('stat-body');
        const fields = ['base','primary','secondary','leveling','permanent','temporary','drain'];
        STATS.forEach(s => {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${s.label}</td>` +
                fields.map(f =>
                    `<td><input class="field-input" type="number" value="0" id="stat-${s.key}-${f}" data-save="stat_${s.key}_${f}" data-stat="${s.key}"></td>`
                ).join('') +
                `<td><span class="calc-value" id="stat-${s.key}-total">0</span></td>` +
                `<td><span class="calc-value" id="stat-${s.key}-mod">-4</span></td>`;
            tbody.appendChild(tr);
        });
    }


    // =========================================================================
    //  BUILD SKILLS LIST
    // =========================================================================

    function buildSkillsList() {
        const container = $('skills-list');
        SKILLS.forEach((sk, i) => {
            const div = document.createElement('div');
            div.className = 'skill-row';
            div.innerHTML =
                `<div class="skill-name">${sk.name}</div>` +
                `<div><input class="field-input small" type="number" value="0" id="skill-${i}-level" data-save="skill_${i}_level"></div>` +
                `<div style="text-align:center"><span class="calc-value" id="skill-${i}-statbonus">-4</span></div>` +
                `<div style="text-align:center"><span class="calc-value" id="skill-${i}-mod">-4</span></div>`;
            container.appendChild(div);
        });
    }


    // =========================================================================
    //  BUILD TOOLS LIST
    // =========================================================================

    function buildToolsList() {
        const container = $('tools-list');
        for (let i = 0; i < 10; i++) {
            const div = document.createElement('div');
            div.className = 'skill-row';
            div.innerHTML =
                `<div><input class="field-input" type="text" placeholder="Tool Name" id="tool-${i}-name" data-save="tool_${i}_name" style="font-size:0.82em; width:150px"></div>` +
                `<div><input class="field-input small" type="number" value="0" id="tool-${i}-level" data-save="tool_${i}_level"></div>` +
                `<div style="text-align:center"><span class="calc-value" id="tool-${i}-statbonus">-4</span></div>` +
                `<div style="text-align:center"><span class="calc-value" id="tool-${i}-mod">-4</span></div>`;
            container.appendChild(div);
        }
    }


    // =========================================================================
    //  BUILD WEAPON CARDS
    // =========================================================================

    function buildWeaponCards() {
        const container = $('weapons-container');
        const positions = ['Top Left','Top Right','Bottom Left','Bottom Right'];
        for (let w = 0; w < 4; w++) {
            const card = document.createElement('div');
            card.className = 'weapon-card';

            let weaponOptions = '<option value="">— Select —</option>';
            WEAPONS.forEach(wp => { weaponOptions += `<option value="${wp.name}">${wp.name}</option>`; });

            card.innerHTML =
                `<div class="weapon-title">Weapon ${w+1} — ${positions[w]}</div>` +
                `<div class="field-group"><label class="field-label" style="min-width:70px">Weapon</label><select class="field-select" id="weapon-${w}-name" data-save="weapon_${w}_name">${weaponOptions}</select></div>` +
                `<div class="weapon-detail"><span class="detail-label">Proficient?</span><label class="toggle-label"><input type="checkbox" id="weapon-${w}-prof" data-save="weapon_${w}_prof"><span class="toggle-mark">✓</span> Prof</label></div>` +
                `<div class="weapon-detail"><span class="detail-label">Finesse?</span><label class="toggle-label"><input type="checkbox" id="weapon-${w}-finesse" data-save="weapon_${w}_finesse"><span class="toggle-mark">✓</span> Fin</label></div>` +
                `<div class="weapon-detail"><span class="detail-label">Attack Bonus</span><span class="detail-value" id="weapon-${w}-atkbonus">-4</span></div>` +
                `<div class="weapon-detail"><span class="detail-label">Damage</span><span class="detail-value" id="weapon-${w}-damage">1d6+-4</span></div>` +
                `<div class="weapon-detail"><span class="detail-label">Traits</span><span class="detail-value" id="weapon-${w}-traits" style="font-size:0.8em">—</span></div>`;
            container.appendChild(card);
        }
    }


    // =========================================================================
    //  BUILD SPELL / MANEUVER TIERS
    // =========================================================================

    function buildSpellTiers() {
        const container = $('spell-tiers');
        SPELL_TIERS.forEach(tier => {
            const div = document.createElement('div');
            div.className = 'spell-tier';
            let slotsHtml = '';
            for (let s = 0; s < tier.slots; s++) {
                slotsHtml += `<div class="spell-slot"><input class="field-input" type="text" placeholder="Spell name..." id="spell-${tier.key}-${s}" data-save="spell_${tier.key}_${s}"></div>`;
            }
            div.innerHTML =
                `<div class="spell-tier-header"><span>${tier.label}</span><span class="spell-tier-cost">${tier.cost}</span></div>` +
                slotsHtml;
            container.appendChild(div);
        });
    }

    function buildManeuverTiers() {
        const container = $('maneuver-tiers');
        MANEUVER_TIERS.forEach(tier => {
            const div = document.createElement('div');
            div.className = 'spell-tier';
            let slotsHtml = '';
            for (let s = 0; s < tier.slots; s++) {
                slotsHtml += `<div class="spell-slot"><input class="field-input" type="text" placeholder="Maneuver name..." id="maneuver-${tier.key}-${s}" data-save="maneuver_${tier.key}_${s}"></div>`;
            }
            div.innerHTML =
                `<div class="spell-tier-header"><span>${tier.label}</span><span class="spell-tier-cost stamina-cost">${tier.cost}</span></div>` +
                slotsHtml;
            container.appendChild(div);
        });
    }


    // =========================================================================
    //  BUILD EQUIPMENT SLOTS
    // =========================================================================

    function buildEquipmentSlots() {
        // Rings
        const ringsContainer = $('rings-list');
        for (let i = 1; i <= 10; i++) {
            const div = document.createElement('div');
            div.className = 'equip-slot';
            div.innerHTML = `<span class="slot-label">Ring ${i}</span><input class="field-input" type="text" placeholder="Ring name..." id="ring-${i}" data-save="ring_${i}">`;
            ringsContainer.appendChild(div);
        }

        // Body slots
        const bodyContainer = $('body-equip-list');
        BODY_SLOTS.forEach((slot, i) => {
            const div = document.createElement('div');
            div.className = 'equip-slot';
            div.innerHTML = `<span class="slot-label">${slot}</span><input class="field-input" type="text" placeholder="${slot}..." id="bodyslot-${i}" data-save="bodyslot_${i}">`;
            bodyContainer.appendChild(div);
        });
    }


    // =========================================================================
    //  BUILD CELL MODIFIERS
    // =========================================================================

    function buildModifiers() {
        const grid = $('modifiers-grid');
        CELL_MODIFIERS.forEach((mod, i) => {
            const div = document.createElement('div');
            div.className = 'modifier-item';
            div.innerHTML = `<span class="mod-label">${mod}</span><input class="field-input" type="number" value="0" id="cellmod-${i}" data-save="cellmod_${i}">`;
            grid.appendChild(div);
        });
    }


    // =========================================================================
    //  FORMULA ENGINE — RECALCULATE ALL
    // =========================================================================

    function getStatMod(statKey) {
        const total = getStatTotal(statKey);
        return total - 4; // From the Excel: modifier = ability statistic - 4
    }

    function getStatTotal(statKey) {
        const fields = ['base','primary','secondary','leveling','permanent','temporary','drain'];
        let sum = 0;
        fields.forEach(f => {
            const el = $(`stat-${statKey}-${f}`);
            if (el) {
                const v = f === 'drain' ? -Math.abs(parseFloat(el.value) || 0) : (parseFloat(el.value) || 0);
                sum += v;
            }
        });
        return sum;
    }

    function getCellMod(index) {
        const el = $(`cellmod-${index}`);
        return el ? (parseFloat(el.value) || 0) : 0;
    }

    function recalcAll() {
        // --- Total Level ---
        const lvl1 = numVal('char-class1-level');
        const lvl2 = numVal('char-class2-level');
        const totalLevel = lvl1 + (($('char-class2').value && $('char-class2').value !== 'None') ? lvl2 : 0);
        $('char-total-level').value = totalLevel;

        // --- Stat totals & mods ---
        const mods = {};
        STATS.forEach(s => {
            const total = getStatTotal(s.key);
            const mod = total - 4;
            $(`stat-${s.key}-total`).textContent = total;
            $(`stat-${s.key}-mod`).textContent = mod >= 0 ? `+${mod}` : mod;
            mods[s.key] = mod;
        });

        // --- Skills ---
        SKILLS.forEach((sk, i) => {
            const statBonus = mods[sk.stat];
            const level = numVal(`skill-${i}-level`);
            const modifier = level + statBonus;
            $(`skill-${i}-statbonus`).textContent = statBonus >= 0 ? `+${statBonus}` : statBonus;
            $(`skill-${i}-mod`).textContent = modifier >= 0 ? `+${modifier}` : modifier;
        });

        // --- Tools (use Intelligence mod by default) ---
        for (let i = 0; i < 10; i++) {
            const statBonus = mods.intelligence;
            const level = numVal(`tool-${i}-level`);
            const modifier = level + statBonus;
            $(`tool-${i}-statbonus`).textContent = statBonus >= 0 ? `+${statBonus}` : statBonus;
            $(`tool-${i}-mod`).textContent = modifier >= 0 ? `+${modifier}` : modifier;
        }

        // --- Health ---
        const class1Name = $('char-class1').value;
        const class1Obj = CLASSES.find(c => c.name === class1Name);
        const hpPerLevel = class1Obj ? class1Obj.hp : 0;
        const hpMax = (hpPerLevel * totalLevel) + mods.fortitude + getCellMod(0);
        $('combat-hp-max').textContent = hpMax;
        // Update bar
        const hpCur = numVal('combat-hp-current');
        const hpPct = hpMax > 0 ? Math.max(0, Math.min(100, (hpCur / hpMax) * 100)) : 0;
        $('hp-bar').style.width = hpPct + '%';

        // --- Mana ---
        let manaMax = 0;
        if (class1Name && MANA_TABLE[class1Name]) {
            const lvlIdx = Math.max(0, Math.min(24, lvl1 - 1));
            manaMax += MANA_TABLE[class1Name][lvlIdx] || 0;
        }
        const class2Name = $('char-class2').value;
        if (class2Name && class2Name !== 'None' && MANA_TABLE[class2Name]) {
            const lvlIdx = Math.max(0, Math.min(24, lvl2 - 1));
            manaMax += MANA_TABLE[class2Name][lvlIdx] || 0;
        }
        $('combat-mana-max').textContent = manaMax;
        $('spell-mana-avail').value = manaMax;
        const manaCur = numVal('combat-mana-current');
        const manaPct = manaMax > 0 ? Math.max(0, Math.min(100, (manaCur / manaMax) * 100)) : 0;
        $('mana-bar').style.width = manaPct + '%';

        // --- Stamina (use total level for stamina, warrior-style scaling) ---
        let staminaMax = totalLevel * 5; // Base stamina scaling
        $('combat-stamina-max').textContent = staminaMax;
        $('maneuver-stamina-avail').value = staminaMax;
        const staCur = numVal('combat-stamina-current');
        const staPct = staminaMax > 0 ? Math.max(0, Math.min(100, (staCur / staminaMax) * 100)) : 0;
        $('stamina-bar').style.width = staPct + '%';

        // --- Armor & Shield ---
        const armorName = $('combat-armor').value;
        const armorObj = ARMORS.find(a => a.name === armorName);
        const armorAC = armorObj ? armorObj.ac : 0;
        const armorPenalty = armorObj ? armorObj.penalty : 0;
        const armorMaxFinesse = armorObj ? armorObj.maxFinesse : 30;
        const penaltyReduction = getCellMod(22);
        const finesseMaxBonus = getCellMod(23);
        const effectivePenalty = Math.max(0, armorPenalty - penaltyReduction);
        const effectiveFinesse = Math.min(mods.finesse, armorMaxFinesse + finesseMaxBonus);
        $('armor-ac-value').value = armorAC;
        $('armor-penalty').value = effectivePenalty;
        $('armor-finesse').value = effectiveFinesse >= 0 ? effectiveFinesse : effectiveFinesse;

        const shieldName = $('combat-shield').value;
        const shieldObj = SHIELDS.find(s => s.name === shieldName);
        const shieldAC = shieldObj ? shieldObj.acBonus : 0;
        $('shield-ac-value').value = shieldAC;

        // --- Total AC ---
        const acBonus = getCellMod(5);
        const totalAC = armorAC + shieldAC + Math.max(0, effectiveFinesse) + acBonus;
        $('combat-ac').value = totalAC;

        // --- Critical/Decisive Chance ---
        $('combat-crit').value = getCellMod(3);

        // --- Initiative ---
        const initBonus = getCellMod(1);
        $('combat-initiative').value = mods.wits + initBonus;

        // --- Resistances ---
        $('combat-resist-mind').value = mods.wits;
        $('combat-resist-body').value = mods.fortitude;
        $('combat-evasion').value = mods.finesse;

        // --- Spell DCs & Attack Modifiers ---
        // Cell Modifier indices (from CELL_MODIFIERS array):
        // 7: Spell 1 DC Bonus, 9: Spell Atk 1, 11: Spell 2 DC, 13: Spell Atk 2
        // 15: Martial 1 DC, 17: Martial Atk 1, 19: Martial 2 DC, 21: Martial Atk 2
        $('spell-dc1').value = 10 + mods.intelligence + getCellMod(7);
        $('spell-atk1').value = mods.intelligence + getCellMod(9);
        $('spell-dc2').value = 10 + mods.memory + getCellMod(11);
        $('spell-atk2').value = mods.memory + getCellMod(13);

        $('maneuver-dc1').value = 10 + mods.strength + getCellMod(15);
        $('maneuver-atk1').value = mods.strength + getCellMod(17);
        $('maneuver-dc2').value = 10 + mods.finesse + getCellMod(19);
        $('maneuver-atk2').value = mods.finesse + getCellMod(21);

        // --- Weapons ---
        // Cell Modifier indices for weapons:
        // W1: atk mod=6, atk dmg=8 | W2: atk mod=10, atk dmg=12
        // W3: atk mod=14, atk dmg=16 | W4: atk mod=18, atk dmg=20
        for (let w2 = 0; w2 < 4; w2++) {
            const wpnName2 = $(`weapon-${w2}-name`).value;
            const wpnObj2 = WEAPONS.find(wp => wp.name === wpnName2);
            const isProf2 = $(`weapon-${w2}-prof`)?.checked || false;
            const isFin2 = $(`weapon-${w2}-finesse`)?.checked || false;

            const atkStat2 = isFin2 ? mods.finesse : mods.strength;
            const dmgStat2 = isFin2 ? mods.finesse : mods.strength;
            const profBonus2 = isProf2 ? totalLevel : 0;

            const atkIdx = 6 + w2 * 4;
            const dmgIdx = 8 + w2 * 4;
            const atkModBonus2 = getCellMod(atkIdx);
            const dmgModBonus2 = getCellMod(dmgIdx);

            const atkBonus2 = atkStat2 + profBonus2 + atkModBonus2;
            $(`weapon-${w2}-atkbonus`).textContent = atkBonus2 >= 0 ? `+${atkBonus2}` : atkBonus2;

            if (wpnObj2) {
                const dmgTotal2 = dmgStat2 + dmgModBonus2;
                const dmgSign2 = dmgTotal2 >= 0 ? '+' : '';
                $(`weapon-${w2}-damage`).textContent = `${wpnObj2.die}${dmgSign2}${dmgTotal2}`;
                $(`weapon-${w2}-traits`).textContent = wpnObj2.traits;
            } else {
                $(`weapon-${w2}-damage`).textContent = '—';
                $(`weapon-${w2}-traits`).textContent = '—';
            }
        }

        // --- Race Info ---
        const raceName = $('char-race').value;
        const raceObj = RACES.find(r => r.name === raceName);
        const racePanel = $('panel-race-info');
        if (raceObj) {
            racePanel.style.display = 'block';
            $('race-info-content').innerHTML =
                `<div style="margin-bottom:8px"><strong style="color:var(--accent-gold)">Stat Bonuses:</strong> ${raceObj.bonuses}</div>` +
                `<div style="margin-bottom:8px"><strong style="color:var(--accent-gold)">Speed:</strong> ${raceObj.speed}</div>` +
                `<div style="margin-bottom:8px"><strong style="color:var(--accent-gold)">Alignment:</strong> ${raceObj.alignment}</div>` +
                `<div style="margin-bottom:8px"><strong style="color:var(--accent-gold)">Resistances:</strong> ${raceObj.resist}</div>` +
                `<div style="margin-bottom:8px"><strong style="color:var(--accent-gold)">Languages:</strong> ${raceObj.languages}</div>` +
                `<div><strong style="color:var(--accent-gold)">Racial Ability:</strong> ${raceObj.ability}</div>`;
        } else {
            racePanel.style.display = 'none';
        }
    }


    // =========================================================================
    //  SAVE / LOAD (localStorage)
    // =========================================================================

    const STORAGE_KEY = 'sparks_character_sheet';

    function gatherData() {
        const data = {};
        document.querySelectorAll('[data-save]').forEach(el => {
            const key = el.dataset.save;
            if (el.type === 'checkbox') {
                data[key] = el.checked;
            } else {
                data[key] = el.value;
            }
        });
        return data;
    }

    function applyData(data) {
        document.querySelectorAll('[data-save]').forEach(el => {
            const key = el.dataset.save;
            if (data[key] !== undefined) {
                if (el.type === 'checkbox') {
                    el.checked = data[key];
                } else {
                    el.value = data[key];
                }
            }
        });
    }

    window.saveSheet = function () {
        const data = gatherData();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        recalcAll();
        showToast('⚔ Character saved!');
    };

    function loadSheet() {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
            try {
                const data = JSON.parse(raw);
                applyData(data);
                recalcAll();
            } catch (e) { /* ignore parse errors */ }
        }
    }

    window.exportSheet = function () {
        const data = gatherData();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const name = $('char-name').value || 'character';
        a.download = `${name.replace(/\s+/g, '_')}_sheet.json`;
        a.click();
        URL.revokeObjectURL(url);
        showToast('📥 Character exported!');
    };

    window.importSheet = function (event) {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function (e) {
            try {
                const data = JSON.parse(e.target.result);
                applyData(data);
                recalcAll();
                showToast('📤 Character imported!');
            } catch (err) {
                showToast('⚠ Invalid file');
            }
        };
        reader.readAsText(file);
        event.target.value = ''; // reset file input
    };

    window.clearSheet = function () {
        if (!confirm('Are you sure you want to clear the entire sheet? This cannot be undone.')) return;
        localStorage.removeItem(STORAGE_KEY);
        document.querySelectorAll('[data-save]').forEach(el => {
            if (el.type === 'checkbox') {
                el.checked = false;
            } else if (el.tagName === 'SELECT') {
                el.selectedIndex = 0;
            } else if (el.type === 'number') {
                el.value = 0;
            } else {
                el.value = '';
            }
        });
        recalcAll();
        showToast('🗑 Sheet cleared');
    };


    // =========================================================================
    //  AUTO-SAVE ON CHANGE
    // =========================================================================

    function setupAutoSave() {
        document.addEventListener('input', (e) => {
            if (e.target.matches('[data-save], [data-stat]')) {
                recalcAll();
                // Debounced auto-save
                clearTimeout(window._autoSaveTimer);
                window._autoSaveTimer = setTimeout(() => {
                    const data = gatherData();
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
                }, 1000);
            }
        });
        document.addEventListener('change', (e) => {
            if (e.target.matches('[data-save], [data-stat]')) {
                recalcAll();
                const data = gatherData();
                localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
            }
        });
    }


    // =========================================================================
    //  INITIALIZE
    // =========================================================================

    function init() {
        populateDropdowns();
        buildStatTable();
        buildSkillsList();
        buildToolsList();
        buildWeaponCards();
        buildSpellTiers();
        buildManeuverTiers();
        buildEquipmentSlots();
        buildModifiers();
        loadSheet();
        setupAutoSave();
        recalcAll();
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
