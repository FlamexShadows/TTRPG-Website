/* Sparks of Dynasty character sheet
   Rules: Basic Rules (revised Nov 3, 2026), class pages, and the Sparks (New) Google Sheet.
   Needs character-sheet-data.js loaded first (window.SPARKS_DATA). */
(function () {
  'use strict';
  const D = window.SPARKS_DATA;
  const CFG = Object.assign({ siteLinks: true, canPrint: true, canDownload: true }, window.SPARKS_CONFIG || {});
  const STORE_KEY = 'sparks-sheet-v2';
  const OLD_KEY = 'sparks_character_sheet';
  const STAT_KEYS = D.stats.map(s => s.key);
  const STAT = Object.fromEntries(D.stats.map(s => [s.key, s]));
  const CLASS_NAMES = Object.keys(D.classes);
  const RACE = Object.fromEntries(D.races.map(r => [r.name, r]));
  const WEAPON = Object.fromEntries(D.weapons.map(w => [w.name, w]));
  const ARMOR = Object.fromEntries(D.armor.map(a => [a.name, a]));
  const SHIELD = Object.fromEntries(D.shields.map(s => [s.name, s]));
  const SIZE = Object.fromEntries(D.sizes.map(s => [s.name, s]));
  const SKILL = Object.fromEntries(D.skills.map(s => [s.name, s]));
  const COND = Object.fromEntries(D.conditions.map(c => [c.name, c]));
  const SPELL_BY_NAME = {};
  D.spells.forEach(s => { SPELL_BY_NAME[s[0].toLowerCase()] = s; });
  const MAN_BY_NAME = {};
  D.maneuvers.forEach(m => { MAN_BY_NAME[m[0].toLowerCase()] = m; });
  const FEAT_BY_NAME = {};
  D.feats.forEach(f => { FEAT_BY_NAME[f[0].toLowerCase()] = f; });
  const ALL_DMG = [].concat(D.damageTypes.physical, D.damageTypes.magical, D.damageTypes.alignment);
  const SAVE_STAT = { mind: 'wits', body: 'fort', evasion: 'fin' };
  // ---- magic items and shop purchases
  const STAT_WORD = { strength: 'str', finesse: 'fin', fortitude: 'fort', charisma: 'cha', wits: 'wits', intelligence: 'int', memory: 'mem' };
  const SLOT_ALIAS = { Belt: 'Waist', Hand: 'Hands', Rings: 'Ring' };
  const KIND_LABEL = { weapon: 'Weapon', armor: 'Armor', shield: 'Shield', magic: 'Magic item', consumable: 'Consumable', material: 'Material', tool: 'Tool', gear: 'Gear', companion: 'Companion', boon: 'Blessing', service: 'Service' };
  const BONUS_KEYS = [
    ['ac', 'Armor Class'], ['acMin', 'Armor Class becomes at least'], ['pa', 'Physical Armor'], ['ma', 'Magical Armor'], ['ta', 'True Armor'],
    ['health', 'Health'], ['mana', 'Mana'], ['stamina', 'Stamina'], ['save_evasion', 'Evasion'], ['save_body', 'Resistance (Body)'],
    ['save_mind', 'Resistance (Mind)'], ['init', 'Initiative'], ['crit', 'Critical Chance'], ['speed', 'Speed'], ['spellDC', 'Spell DC'],
    ['manDC', 'Maneuver DC'], ['carry', 'Carrying capacity (kg)'],
    ['spellAtk', 'Spell attack'], ['manAtk', 'Maneuver attack'], ['atkAll', 'Weapon attack'], ['dmgAll', 'Weapon damage'],
    ['atkMelee', 'Melee attack'], ['atkRanged', 'Ranged attack'], ['dmgMelee', 'Melee damage'], ['dmgRanged', 'Ranged damage'],
    ['speed_fly', 'Fly speed'], ['speed_swim', 'Swim speed'], ['speed_climb', 'Climb speed'], ['speed_burrow', 'Burrow speed'],
    ['skillRanks', 'Skill ranks'], ['feats', 'Feats'], ['finMax', 'Armor Finesse max'], ['armorPen', 'Armor penalty reduction'],
    ['chosen_atk', 'Chosen weapon attack'], ['chosen_dmg', 'Chosen weapon damage'], ['chosen_crit', 'Chosen weapon Critical Chance'],
    ['chosen_deadly', 'Chosen weapon Deadly levels'], ['chosen_ench', 'Chosen weapon Enchanted levels'],
    ['w_deadly', 'Deadly levels on every weapon'], ['w_ench', 'Enchanted levels on every weapon'],
  ].concat(D.stats.map(st => ['stat_' + st.key, st.name + ' score']), D.stats.map(st => ['statMin_' + st.key, st.name + ' becomes at least']),
    D.skills.map(sk => ['skill_' + sk.name, sk.name + ' checks']),
    [].concat(D.damageTypes.physical, D.damageTypes.magical, D.damageTypes.alignment, ['True']).map(t => ['res_' + t, 'Resistance to ' + t]));
  const BONUS_LABEL = Object.fromEntries(BONUS_KEYS);
  BONUS_LABEL.chosen_dec = 'Chosen weapon decisive dice';
  const normSlot = sl => SLOT_ALIAS[sl] || sl || 'Misc';
  // Read an item's effect text and turn the fixed phrasings into bonuses. The player can edit the result.
  function detectBonuses(desc) {
    const t = String(desc || ''), out = [];
    let m;
    const re1 = /(strength|finesse|fortitude|charisma|wits|intelligence|memory) score is increased by (\d+)/gi;
    while ((m = re1.exec(t))) out.push({ key: 'stat_' + STAT_WORD[m[1].toLowerCase()], value: +m[2] });
    const re2 = /(strength|finesse|fortitude|charisma|wits|intelligence|memory) is set to (\d+)/gi;
    while ((m = re2.exec(t))) out.push({ key: 'statMin_' + STAT_WORD[m[1].toLowerCase()], value: +m[2] });
    if ((m = t.match(/additional (\d+) to your magic(?:al)? armor/i))) out.push({ key: 'ma', value: +m[1] });
    if ((m = t.match(/additional (\d+) to your physical armor/i))) out.push({ key: 'pa', value: +m[1] });
    if ((m = t.match(/DC of all spells \w+ increa[sc]ed by (\d+)/i))) out.push({ key: 'spellDC', value: +m[1] });
    if ((m = t.match(/DC of all (?:combat )?man[a-z]*vers \w+ increa[sc]ed by (\d+)/i))) out.push({ key: 'manDC', value: +m[1] });
    if ((m = t.match(/speed increases by (\d+)/i))) out.push({ key: 'speed', value: +m[1] });
    ['health', 'mana', 'stamina'].forEach(r => { const mm = t.match(new RegExp(r + ' maximum is increased by (\\d+)', 'i')); if (mm) out.push({ key: r, value: +mm[1] }); });
    if ((m = t.match(/\bAC is set to (\d+)/i))) out.push({ key: 'acMin', value: +m[1] });
    const re3 = /\+\s?(\d+)\s*(?:bonus\s*)?to\s*([A-Za-z][A-Za-z ()]*?)\s+(?:checks|saves)/gi;
    while ((m = re3.exec(t))) {
      const what = m[2].trim().toLowerCase();
      if (/resist[ae]nce \((physical|body)\)/.test(what)) out.push({ key: 'save_body', value: +m[1] });
      else if (/resist[ae]nce \(mind\)/.test(what)) out.push({ key: 'save_mind', value: +m[1] });
      else if (what === 'evasion') out.push({ key: 'save_evasion', value: +m[1] });
      else { const sk = D.skills.find(x => x.name.toLowerCase() === what); if (sk) out.push({ key: 'skill_' + sk.name, value: +m[1] }); }
    }
    return out;
  }
  function equippedItems(c) {
    const out = [];
    D.itemSlots.forEach(sl => { const e = c.items[sl]; if (e && e.name) out.push(Object.assign({ path: 'items.' + sl, label: sl }, e)); });
    (c.rings || []).forEach((e, i) => { if (e && e.name) out.push(Object.assign({ path: 'rings.' + i, label: 'Ring ' + (i + 1) }, e)); });
    (c.misc || []).forEach((e, i) => { if (e && e.name) out.push(Object.assign({ path: 'misc.' + i, label: 'Attuned ' + (i + 1) }, e)); });
    return out;
  }
  // ---- effects: one format shared by magic items, class features, and Other features.
  // Each effect is one line: "<target> <+, - or => <amount> [when <situation>]". The full guide is ITEM-EFFECTS.md.
  //   Mana +5 · Fortitude = 30 · Resist {Fire|Cold} +10 · AC +5 when wielding your chosen weapon · Fly = walk speed
  const SHOP_FX = {};
  ((window.SPARKS_SHOPS && window.SPARKS_SHOPS.shops) || []).forEach(sh => (sh.items || []).forEach(it => {
    if (it.effects && it.effects.length) SHOP_FX[String(it.name).toLowerCase()] = it.effects;
  }));
  // ---- magic weapons and armor. The magical bonus (+1 to +10) adds to attack and damage on a weapon, or to AC on armor
  // and shields. The bonus is also the budget for magic traits: each trait spends part of it. Traits: D.magicTraits.
  // Stored on the character as { base, bonus, name, traits: [{ name, level, pick }] } (weapons[i].magic, armorMagic, shieldMagic).
  // The magic works only while base matches the weapon, armor, or shield picked.
  const MTRAIT = {};
  (D.magicTraits || []).forEach(t => { MTRAIT[t.for + '|' + t.name] = t; });
  const MAGIC_PRICE = {};
  let MAGIC_SHOP = 'Magic item forge';
  ((window.SPARKS_SHOPS && window.SPARKS_SHOPS.shops) || []).forEach(sh => (sh.items || []).forEach(it => {
    const m = String(it.name).match(/^Magic Item \+(\d+)$/i);
    if (m && it.gp != null) { MAGIC_PRICE[+m[1]] = it.gp; MAGIC_SHOP = sh.name || MAGIC_SHOP; }
  }));
  const ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
  const roman = v => ROMAN[v] || String(v);
  const ENCH_RES = 5;   // resistance ignored per level of Enchanted
  const NOUN_TRAITS = new Set(['Accuracy', 'Prowess', 'Harmony', 'Gravity', 'Tempo', 'Wild Magic', 'Timewarp', 'Mist', 'Elemental Resistance', 'Displacement', 'Aegis']);
  const magicPrice = b => (MAGIC_PRICE[b] != null ? MAGIC_PRICE[b] : 0);
  function magicOf(mg, kind) {
    if (!mg || !(n(mg.bonus) > 0)) return null;
    const bonus = clamp(n(mg.bonus), 1, 10);
    const list = (mg.traits || []).map(x => {
      const t = x && MTRAIT[kind + '|' + x.name];
      if (!t) return null;
      return { t, level: t.perLevel ? clamp(n(x.level) || 1, 1, t.maxLevel || 10) : 1, pick: String(x.pick || '').trim() };
    }).filter(Boolean);
    return { bonus, list, spent: list.reduce((a, x) => a + x.t.cost * x.level, 0), name: String(mg.name || '').trim() };
  }
  // Magic weapons, armor, and shields count as Miscellaneous items: each one needs an attunement slot to work.
  // magic.attuned is true unless the player unticks it. Only gear on the sheet counts (the weapon, armor, or shield it was made for).
  function attunedGear(c) {
    const out = [];
    (c.weapons || []).forEach((w, i) => {
      const mg = w.magic;
      if (mg && n(mg.bonus) > 0 && mg.base === w.item && mg.attuned !== false && weaponData(w)) out.push({ path: `weapons.${i}.magic`, where: 'Weapon', label: magicTitle(magicOf(mg, 'weapon'), weaponData(w).name) });
    });
    [['armor', 'armorMagic', 'Armor', ARMOR], ['shield', 'shieldMagic', 'Shield', SHIELD]].forEach(([slot, key, where, TABLE]) => {
      const mg = c[key];
      if (mg && n(mg.bonus) > 0 && mg.base === c[slot] && TABLE[c[slot]] && mg.attuned !== false) out.push({ path: key, where, label: magicTitle(magicOf(mg, 'armor'), c[slot]) });
    });
    return out;
  }
  // slots in the Attunement box, and how many are taken by Miscellaneous items plus attuned magic gear
  function attuneUse(c, exceptPath) {
    const misc = (c.misc || []).filter(r => r && r.name).length;
    const gear = attunedGear(c).filter(g => g.path !== exceptPath).length;
    return { slots: (c.misc || []).length, misc, gear, used: misc + gear };
  }
  const traitLabel = x => x.t.name + (x.t.perLevel && x.level > 1 ? ' ' + roman(x.level) : '');
  // "+1 Arming Sword of Accuracy", "+7 Vorpal Unholy Arming Sword"
  function magicTitle(mg, baseName) {
    if (!mg) return baseName;
    if (mg.name) return mg.name;
    const pre = mg.list.filter(x => !NOUN_TRAITS.has(x.t.name)).map(traitLabel);
    const post = mg.list.filter(x => NOUN_TRAITS.has(x.t.name)).map(traitLabel);
    return `+${mg.bonus} ${pre.concat(baseName).join(' ')}${post.length ? ' of ' + post.join(' and ') : ''}`;
  }
  const fillNote = (s, mg, x) => String(s || '').replace(/\{bonus\}/g, mg ? mg.bonus : 'the magical bonus')
    .replace(/\{half\}/g, mg ? Math.floor(mg.bonus / 2) : 'half the magical bonus').replace(/\{pick\}/g, (x && x.pick) || 'the chosen creature type');
  // the trait's effect lines with its pick filled in: "Resist {Fire|Cold} +10" becomes "Resist Fire +10"
  const traitFxLines = x => fxLines(x.t.fx).map(ln => {
    const m = ln.match(/\{([^}]*)\}/);
    return m && x.pick && m[1].split('|').map(o => o.trim()).includes(x.pick) ? ln.replace(m[0], x.pick) : ln;
  });
  // what one trait does, in short lines, for the forge and the trait popups
  function traitSummary(t, x, mg) {
    const lv = x ? x.level : 1, out = [];
    if (t.atk) out.push(`Attack +${t.atk * lv}`);
    if (t.ench) out.push(`Enchanted +${t.ench * lv}: ignores ${t.ench * lv * ENCH_RES} more resistance`);
    (t.extra || []).forEach(e => out.push(`+${e.dice} ${e.type} damage on a hit`));
    (t.vs || []).forEach(e => out.push(`+${e.dice}${e.type ? ' ' + e.type : ''} damage against ${fillNote(e.vs, mg, x)}`));
    if (t.ignore) out.push(t.ignore);
    fxLines(t.fx).forEach(l => {
      const m = l.match(/\{([^}]*)\}/), opts = m ? m[1].split('|').map(o => o.trim()) : [];
      out.push(!m ? l : x && opts.includes(x.pick) ? l.replace(m[0], x.pick) : l.replace(m[0], opts.join(' or ')));
    });
    if (t.note) out.push(fillNote(t.note, mg, x));
    return out;
  }
  const DMG_TYPES = [].concat(D.damageTypes.physical, D.damageTypes.magical, D.damageTypes.alignment);
  const FX_NAMES = (() => {
    const m = {};
    const put = (keys, ...names) => names.forEach(nm => { m[nm.toLowerCase()] = [].concat(keys); });
    D.stats.forEach(st => put('stat_' + st.key, st.name, st.key));
    put(D.stats.map(st => 'stat_' + st.key), 'All Stats', 'All Statistics');
    put('ac', 'AC', 'Armor Class');
    put('health', 'Health', 'Max Health', 'Maximum Health', 'Hit Points');
    put('mana', 'Mana', 'Max Mana', 'Maximum Mana');
    put('stamina', 'Stamina', 'Max Stamina', 'Maximum Stamina');
    put('pa', 'Physical Armor'); put('ma', 'Magical Armor', 'Magic Armor'); put('ta', 'True Armor');
    put('save_evasion', 'Evasion');
    put('save_body', 'Resistance (Body)', 'Body Save', 'Resistance (Physical)');
    put('save_mind', 'Resistance (Mind)', 'Mind Save');
    put(['save_evasion', 'save_body', 'save_mind'], 'All Saves', 'Saves');
    put('init', 'Initiative'); put('crit', 'Critical Chance', 'Crit Chance');
    put('speed', 'Speed', 'Walk Speed', 'Movement Speed');
    ['fly', 'swim', 'climb', 'burrow'].forEach(t => put('speed_' + t, t + ' Speed', t));
    put('spellDC', 'Spell DC', 'Spell Save DC'); put('manDC', 'Maneuver DC', 'Maneuver Save DC');
    put('spellAtk', 'Spell Attack'); put('manAtk', 'Maneuver Attack');
    put('atkAll', 'Attack', 'Attack Rolls', 'Weapon Attack'); put('dmgAll', 'Damage', 'Weapon Damage');
    put('atkMelee', 'Melee Attack'); put('atkRanged', 'Ranged Attack');
    put('dmgMelee', 'Melee Damage'); put('dmgRanged', 'Ranged Damage');
    put('skillRanks', 'Skill Ranks'); put('feats', 'Feats'); put('carry', 'Carrying Capacity', 'Carry');
    put('finMax', 'Armor Finesse Max'); put('armorPen', 'Armor Penalty Reduction');
    // weapon targets. "Chosen Weapon ..." lines apply to the weapon ticked as Chosen weapon on the Combat tab.
    put('chosen_atk', 'Chosen Weapon Attack'); put('chosen_dmg', 'Chosen Weapon Damage');
    put('chosen_crit', 'Chosen Weapon Critical Chance', 'Chosen Weapon Crit Chance');
    put('chosen_deadly', 'Chosen Weapon Deadly'); put('chosen_ench', 'Chosen Weapon Enchanted');
    put('chosen_dec', 'Chosen Weapon Decisive Dice');
    put('w_deadly', 'All Weapons Deadly', 'Weapon Deadly'); put('w_ench', 'All Weapons Enchanted', 'Weapon Enchanted');
    put(D.skills.map(sk => 'skill_' + sk.name), 'All Skills');
    put(D.skills.filter(sk => /^Knowledge/.test(sk.name)).map(sk => 'skill_' + sk.name), 'All Knowledge', 'All Knowledge Skills', 'Knowledge');
    put(['skill_Intimidate (Cha)', 'skill_Intimidate (Str)'].filter(k => SKILL[k.slice(6)]), 'Intimidate');
    put(['skill_Traverse (Fin)', 'skill_Traverse (Str)'].filter(k => SKILL[k.slice(6)]), 'Traverse');
    D.skills.forEach(sk => put('skill_' + sk.name, sk.name));
    if (SKILL['Animal Handling']) put('skill_Animal Handling', 'Animal Handle');
    if (SKILL.Sneak) put('skill_Sneak', 'Stealth');
    DMG_TYPES.concat(['True']).forEach(t => put('res_' + t, 'Resist ' + t, t + ' Resistance'));
    put(D.damageTypes.physical.map(t => 'res_' + t), 'Resist Physical', 'Physical Resistance');
    put(D.damageTypes.magical.map(t => 'res_' + t), 'Resist Magical', 'Magical Resistance');
    put(DMG_TYPES.map(t => 'res_' + t), 'Resist All', 'Resist All Damage');
    return m;
  })();
  const FX_KEY_LABEL = k => BONUS_LABEL[k] || (k.startsWith('res_') ? 'Resist ' + k.slice(4) : k);
  // Amounts: numbers, level, class level, half level, a stat modifier or score, Physical/Magical Armor, walk speed,
  // + - * / ( ), and floor(), min(), max(). The result always rounds down.
  const STAT_ALIAS = { strength: 'str', str: 'str', finesse: 'fin', fin: 'fin', fortitude: 'fort', fort: 'fort', intelligence: 'int', int: 'int',
    wits: 'wits', charisma: 'cha', cha: 'cha', memory: 'mem', mem: 'mem' };
  function compileFx(src) {
    let t = ' ' + String(src).toLowerCase().replace(/[−–]/g, '-') + ' ';
    t = t.replace(/half (?:your |their |its )?class level/g, ' (cl/2) ').replace(/half (?:your |their |its )?level/g, ' (lv/2) ')
      .replace(/(?:your |their |its )?class level/g, ' cl ').replace(/(?:your |their |its )?(?:character )?level/g, ' lv ')
      .replace(/(?:your |their |its )?(strength|finesse|fortitude|intelligence|wits|charisma|memory) score/g, (a, w) => ` sc_${STAT_ALIAS[w]} `)
      .replace(/(?:your |their |its )?(strength|finesse|fortitude|intelligence|wits|charisma|memory)(?: modifier)?/g, (a, w) => ` md_${STAT_ALIAS[w]} `)
      .replace(/(?:your |their |its )?(?:maximum )?physical armor/g, ' pa ').replace(/(?:your |their |its )?(?:maximum )?magic(?:al)? armor/g, ' ma ')
      .replace(/(?:your |their |its )?walk(?:ing)? speed/g, ' walk ');
    const toks = t.match(/\d+(?:\.\d+)?|[a-z_]+|[-+*/(),]/g) || [];
    if (t.replace(/\d+(?:\.\d+)?|[a-z_]+|[-+*/(),]|\s/g, '')) throw new Error('has characters it cannot read');
    let i = 0;
    const VARS = { lv: x => x.lv, cl: x => x.cl, pa: x => x.pa, ma: x => x.ma, walk: x => x.walk };
    STAT_KEYS.forEach(k => { VARS['md_' + k] = x => x.mod(k); VARS['sc_' + k] = x => x.score(k); VARS[k] = x => x.mod(k); });
    const FN = { floor: Math.floor, min: Math.min, max: Math.max, ceil: Math.ceil };
    const peek = () => toks[i], take = () => toks[i++];
    function expr() { let f = term(); while (peek() === '+' || peek() === '-') { const op = take(), a = f, b = term(); f = op === '+' ? x => a(x) + b(x) : x => a(x) - b(x); } return f; }
    function term() { let f = unary(); while (peek() === '*' || peek() === '/') { const op = take(), a = f, b = unary(); f = op === '*' ? x => a(x) * b(x) : x => (b(x) ? a(x) / b(x) : 0); } return f; }
    function unary() { if (peek() === '-') { take(); const a = unary(); return x => -a(x); } if (peek() === '+') { take(); return unary(); } return atom(); }
    function atom() {
      const tk = take();
      if (tk == null) throw new Error('ends too early');
      if (/^\d/.test(tk)) { const v = parseFloat(tk); return () => v; }
      if (tk === '(') { const f = expr(); if (take() !== ')') throw new Error('is missing a )'); return f; }
      if (FN[tk]) {
        if (take() !== '(') throw new Error(`needs ( after ${tk}`);
        const args = [expr()]; while (peek() === ',') { take(); args.push(expr()); }
        if (take() !== ')') throw new Error('is missing a )');
        return x => FN[tk](...args.map(a => a(x)));
      }
      if (VARS[tk]) return VARS[tk];
      throw new Error(`does not know "${tk}"`);
    }
    const f = expr();
    if (i < toks.length) throw new Error(`does not know "${toks[i]}"`);
    return x => Math.floor(f(x) + 1e-9);
  }
  const FX_CACHE = {};
  function parseFx(line) {
    const raw = String(line || '').trim();
    if (FX_CACHE[raw]) return FX_CACHE[raw];
    let t = raw, when = '', r, m;
    const isNote = /^note\b/i.test(t);
    if (!isNote && (m = t.match(/^(.*?)\s+(?:when|while)\s+(.+)$/i))) { t = m[1].trim(); when = m[2].trim(); }
    if (isNote) r = { info: raw.replace(/^note\b[:\s]*/i, '') };
    else if ((m = t.match(/^(immune|immunity|vulnerable|vulnerability)(?:\s+to)?\s+(.+)$/i))) r = { list: /^imm/i.test(m[1]) ? 'immune' : 'vuln', what: m[2].trim() };
    else if (!(m = t.match(/^(.+?)\s+([+\-=−])\s*(.+)$/))) r = { err: 'needs a target, then +, - or =, then an amount' };
    else {
      const tgt = m[1].trim(), op = m[2] === '−' ? '-' : m[2];
      r = { tgt, op };
      const ch = tgt.match(/^(.*)\{([^}]+)\}(.*)$/);
      if (ch) {
        r.choice = ch[2].split('|').map(o => o.trim()).filter(Boolean).map(o => ({ label: o, keys: FX_NAMES[(ch[1] + o + ch[3]).replace(/\s+/g, ' ').trim().toLowerCase()] }));
        const bad = r.choice.find(o => !o.keys);
        if (bad) r = { err: `does not know the choice "${bad.label}"` };
      } else if (/^any stat$/i.test(tgt)) r.choice = D.stats.map(st => ({ label: st.name, keys: ['stat_' + st.key] }));
      else if (!(r.keys = FX_NAMES[tgt.replace(/\s+/g, ' ').toLowerCase()])) r = { err: `does not know the target "${tgt}"` };
      if (!r.err) { try { r.amount = m[3].trim(); r.expr = compileFx(r.amount); } catch (e) { r = { err: `amount "${m[3].trim()}" ${e.message}` }; } }
    }
    r.raw = raw; r.when = when;
    return (FX_CACHE[raw] = r);
  }
  const fxId = (...parts) => parts.join('|').replace(/[^A-Za-z0-9|]+/g, '_');
  const fxLines = v => (Array.isArray(v) ? v : String(v || '').split('\n')).map(x => String(x).trim()).filter(Boolean);
  function itemFx(e) { return SHOP_FX[String((e && e.name) || '').toLowerCase()] || null; }
  // Situations the sheet checks by itself. They show as Active or Inactive instead of a checkbox.
  const AUTO_WHEN = [
    [/^wielding (?:your |their |the )?chosen weapon$/i, c => c.weapons.some(w => w.chosen && w.inHand !== false && weaponData(w))],
    [/^wearing (?:light armor or no armor|no armor or light armor)$/i, c => !ARMOR[c.armor] || ARMOR[c.armor].type === 'Light'],
    [/^wearing no armor$/i, c => !ARMOR[c.armor]],
    [/^wearing (light|medium|heavy) armor$/i, (c, m) => !!ARMOR[c.armor] && ARMOR[c.armor].type.toLowerCase() === m[1].toLowerCase()],
    [/^wearing (?:any )?armor$/i, c => !!ARMOR[c.armor]],
    [/^wielding a shield$/i, c => !!SHIELD[c.shield]],
    [/^not wielding a shield$/i, c => !SHIELD[c.shield]],
  ];
  // Situations that name weapons. The effect goes on those weapons only (attack, damage, or Critical Chance lines).
  const WEAPON_WHEN = [
    [/^attacking unarmed$/i, () => wc => wc.data.name === 'Unarmed Strike' || !!wc.data.natural],
    [/^attacking with (?:your |the |a |an )?chosen weapon$/i, () => wc => wc.chosen],
    [/^attacking with (?:a |an )?(melee|ranged) weapon$/i, m => wc => (m[1].toLowerCase() === 'ranged') === wc.ranged],
    [/^attacking with (?:your |the |a |an )?(.+)$/i, m => wc => [wc.title, wc.data.name, wc.src && wc.src.notes].some(t => String(t || '').toLowerCase().includes(m[1].toLowerCase()))],
  ];
  const WEAPON_KEYS = new Set(['atkAll', 'dmgAll', 'atkMelee', 'atkRanged', 'dmgMelee', 'dmgRanged', 'crit']);
  // Every effect that applies to this character right now, with where it came from.
  function collectFx(c, d) {
    const out = [];
    const add = (line, id, label, src, cl, extra) => out.push(Object.assign({ p: parseFx(line), id, label, src, cl }, extra || {}));
    equippedItems(c).forEach(e => {
      fxLines(itemFx(e)).forEach((ln, i) => add(ln, fxId('item', e.path, e.name, i), e.name, 'Item', d.level, { path: e.path }));
      fxLines(e.fx).forEach((ln, i) => add(ln, fxId('itemfx', e.path, i), e.name, 'Item', d.level, { path: e.path, custom: true }));
    });
    d.cls.forEach(kc => {
      const list = kc.cls.features.map(f => [f, kc.name]).concat(kc.sub && kc.cls.subclasses[kc.sub] ? kc.cls.subclasses[kc.sub].map(f => [f, kc.sub]) : []);
      list.forEach(([f, src]) => { if (f.level <= kc.level) fxLines(f.effects).forEach((ln, i) => add(ln, fxId('cls', kc.name, src, f.name, f.level, i), f.name, `${src} ${f.level}`, kc.level)); });
    });
    (c.features || []).forEach((f, j) => fxLines(f.fx == null ? itemFx(f) : f.fx).forEach((ln, i) => add(ln, fxId('feat', j, i), f.name || 'Other feature', 'Feature', d.level)));
    // magic weapon traits work while the weapon is in hand. Magic armor and shield traits work while worn.
    c.weapons.forEach((w, i) => {
      const mg = w.inHand !== false && w.magic && w.magic.base === w.item && w.magic.attuned !== false ? magicOf(w.magic, 'weapon') : null;
      if (!mg) return;
      const nm = magicTitle(mg, (weaponData(w) || {}).name || 'Weapon');
      mg.list.forEach(x => traitFxLines(x).forEach((ln, j) => add(ln, fxId('mw', i, x.t.name, j), nm, 'Magic weapon', d.level, { path: 'weapons.' + i })));
    });
    [['armor', 'armorMagic', ARMOR, 'Magic armor'], ['shield', 'shieldMagic', SHIELD, 'Magic shield']].forEach(([slot, key, TABLE, src]) => {
      const mg = TABLE[c[slot]] && c[key] && c[key].base === c[slot] && c[key].attuned !== false ? magicOf(c[key], 'armor') : null;
      if (!mg) return;
      const nm = magicTitle(mg, c[slot]);
      mg.list.forEach(x => traitFxLines(x).forEach((ln, j) => add(ln, fxId('mg', slot, x.t.name, j), nm, src, d.level, { path: key })));
    });
    const picks = c.fxPick || {}, ons = c.fxOn || {};
    out.forEach(x => {
      x.pick = x.p.choice ? (picks[x.id] || '') : null;
      const wh = x.p.when;
      if (!wh) { x.on = true; return; }
      const a = AUTO_WHEN.find(([re]) => re.test(wh));
      if (a) { x.auto = true; x.on = !!a[1](c, wh.match(a[0])); return; }
      const ws = (x.p.keys || []).length && x.p.keys.every(k => WEAPON_KEYS.has(k)) && WEAPON_WHEN.find(([re]) => re.test(wh));
      if (ws) { x.auto = true; x.on = true; x.scope = ws[1](wh.match(ws[0])); return; }
      x.on = !!ons[x.id];
    });
    return out;
  }
  const SAVE_NAME = { mind: 'Resistance (Mind)', body: 'Resistance (Body)', evasion: 'Evasion' };
  const FRACTION = { Good: [1, 1], Average: [1, 2], Poor: [1, 3] };

  // ------------------------------------------------------------------ helpers
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  const n = v => { const x = parseInt(v, 10); return isNaN(x) ? 0 : x; };
  const sign = v => (v >= 0 ? '+' : '−') + Math.abs(v);
  const uid = () => 'c' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  const clone = o => JSON.parse(JSON.stringify(o));
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  function getPath(obj, path) {
    return path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj);
  }
  function setPath(obj, path, val) {
    const keys = path.split('.');
    let o = obj;
    for (let i = 0; i < keys.length - 1; i++) {
      if (o[keys[i]] == null) o[keys[i]] = /^\d+$/.test(keys[i + 1]) ? [] : {};
      o = o[keys[i]];
    }
    o[keys[keys.length - 1]] = val;
  }
  function link(name, href) {
    if (CFG.siteLinks && href && /^[a-z0-9-]+\.html$/i.test(href)) return `<a href="${esc(href)}" target="_blank" rel="noopener">${esc(name)}</a>`;
    return esc(name);
  }
  function modOf(score) { return Math.max(-4, Math.floor((score - 8) / 2)); }
  function alignAxis(al) {
    const s = String(al || '').toLowerCase();
    if (s.includes('good')) return 'Good';
    if (s.includes('evil')) return 'Evil';
    return 'Neutral';
  }
  function traitText(t) {
    const tt = D.traits;
    if (tt[t]) return [t, tt[t]];
    let base = t.replace(/\s*\(\d+\)\s*$/, '').trim();
    if (tt[base]) return [base, tt[base]];
    base = base.replace(/\s+(I|II|III|IV|V)$/, '').trim();
    const key = Object.keys(tt).find(k => k.toLowerCase() === base.toLowerCase());
    return key ? [key, tt[key]] : [t, ''];
  }
  function rangeText(w) {
    const tr = w.traits || [];
    const rg = tr.map(t => t.match(/^Ranged(?: \(Finesse\))? \((\d+)\)/i)).find(Boolean);
    if (rg) return `${rg[1]} m`;
    if (typeof w.range === 'string' && !/^\d+$/.test(w.range)) return w.range;
    const parts = ['Melee'];
    const reach = tr.find(t => /^Reach/i.test(t));
    if (reach) parts.push(reach);
    const th = tr.map(t => t.match(/^Thrown \((\d+)\)/i)).find(Boolean);
    if (th) parts.push(`thrown ${th[1]} m`);
    return parts.join(', ');
  }
  function hasTrait(w, name) {
    return (w.traits || []).some(t => traitText(t)[0].toLowerCase() === name.toLowerCase());
  }

  // ------------------------------------------------------------------ character model
  function blankChar() {
    const stats = {};
    STAT_KEYS.forEach(k => { stats[k] = { base: 8, lvl: 0, perm: 0, temp: 0, drain: 0 }; });
    return {
      v: 2, id: uid(), example: false,
      name: '', player: '', race: '', prevRace: '', raceChoice: {}, raceResist: '', adaptations: ['', ''],
      size: '', classes: [{ name: '', level: 1, sub: '' }, { name: '', level: 0, sub: '' }],
      xp: 0, alignment: '', deity: '', gold: 0,
      stats,
      cur: { hp: null, pa: null, ma: null, ta: null, mana: null, stamina: null },
      dying: { fails: 0, rounds: 0, dead: false }, hunt: false, conditions: [],
      armor: '', shield: '', defensiveWielded: 0,
      weapons: [newWeapon('Unarmed Strike'), newWeapon('')],
      skills: {}, tools: [], languages: '',
      spells: [], maneuvers: [],
      items: {}, rings: [{}, {}], misc: [{}, {}, {}],
      inventory: [],
      feats: [], features: [], prof: '',
      resist: [], immune: '', vuln: '',
      notes: { appearance: '', backstory: '', allies: '', notes: '' }, art: '',
      bonus: {}, purchases: [], fxPick: {}, fxOn: {}, armorMagic: null, shieldMagic: null,
      rules: defaultRules(),
      updated: Date.now(),
    };
  }
  function defaultRules() {
    return { armorMult: 5, unarmored: 'ten', initStat: 'wits', survivalStat: 'wits', critBase: 'score',
      raceStats: true, weaponStat: 'best', manAtkLevel: false };
  }
  function newWeapon(item) {
    return { item: item || '', name: '', die: '', traits: '', range: '', type: '', prof: true, stat: 'auto', atk: 0, dmg: 0, notes: '', inHand: true, chosen: false, magic: null };
  }
  function exampleChar() {
    const c = blankChar();
    Object.assign(c, {
      example: true, name: 'Brannoc Ashvale', player: 'Example', race: 'Orc', alignment: 'Chaotic Neutral',
      deity: 'Marissa', xp: 2600, gold: 120,
      classes: [{ name: 'Warrior', level: 5, sub: 'Twin Blades' }, { name: '', level: 0, sub: '' }],
      armor: 'Chainmail', shield: '', languages: 'Universal, Orcish',
    });
    Object.assign(c.stats.str, { base: 12, lvl: 2 });
    Object.assign(c.stats.fin, { base: 11, lvl: 1 });
    Object.assign(c.stats.fort, { base: 12, lvl: 2 });
    Object.assign(c.stats.wits, { base: 10, lvl: 1 });
    Object.assign(c.stats.cha, { base: 8 });
    Object.assign(c.stats.int, { base: 9 });
    Object.assign(c.stats.mem, { base: 10 });
    c.weapons = [Object.assign(newWeapon('War Axe'), { notes: 'Grandfather\'s axe' }), newWeapon('Throwing Axe'), newWeapon('Unarmed Strike')];
    c.skills = { 'Overpower': 2, 'Endurance': 2, 'Intimidate (Str)': 1, 'Survival': 1 };
    c.tools = [{ name: 'Blacksmith Set', rank: 1 }];
    c.maneuvers = ['Impale', 'Overwhelm'].map(nm => MAN_BY_NAME[nm.toLowerCase()]).filter(Boolean)
      .map(m => ({ name: m[0], tier: m[1], href: m[2], notes: '' }));
    c.inventory = [
      { name: 'Bedroll', qty: 1, kg: 3, where: 'Pack', notes: '' },
      { name: 'Rations (day)', qty: 5, kg: 0.5, where: 'Pack', notes: '' },
      { name: 'Hemp rope, 15 m', qty: 1, kg: 4, where: 'Pack', notes: '' },
      { name: 'Healing potion', qty: 2, kg: 0.3, where: 'Carried', notes: 'Belt pouch' },
    ];
    c.items = { Waist: { name: 'Belt of the Ox', power: 'Faint', notes: '+5 kg carrying capacity' } };
    c.bonus = { carry: 5 };
    const ft = FEAT_BY_NAME.endurance;
    c.feats = ft ? [{ name: ft[0], href: ft[1], notes: '' }] : [];
    c.notes.backstory = 'Raised in the war camps east of Wolren. Left after the Ashvale clan broke its oath.';
    return c;
  }

  // ------------------------------------------------------------------ storage
  let roster = { active: null, order: [], chars: {} };
  let storageOk = true;
  function loadRoster() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) {
        const r = JSON.parse(raw);
        if (r && r.chars && r.order) { roster = r; Object.values(roster.chars).forEach(upgradeChar); }
      } else {
        const old = localStorage.getItem(OLD_KEY);
        if (old) {
          const c = migrateOld(JSON.parse(old));
          roster.chars[c.id] = c; roster.order.push(c.id); roster.active = c.id;
        }
      }
    } catch (e) { storageOk = false; }
    if (!roster.order.length) {
      const c = exampleChar();
      roster.chars[c.id] = c; roster.order = [c.id]; roster.active = c.id;
    }
    if (!roster.chars[roster.active]) roster.active = roster.order[0];
  }
  let saveTimer = null;
  function saveSoon() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(saveNow, 350);
  }
  function saveNow() {
    clearTimeout(saveTimer);
    char().updated = Date.now();
    try { localStorage.setItem(STORE_KEY, JSON.stringify(roster)); storageOk = true; }
    catch (e) { storageOk = false; }
    const st = $('#cs-save-state');
    if (st) {
      st.textContent = storageOk ? 'Saved in this browser' : 'This browser blocks saving. Use Export to keep your character.';
      st.classList.toggle('bad', !storageOk);
    }
  }
  function upgradeChar(c) {
    const b = blankChar();
    Object.keys(b).forEach(k => { if (c[k] === undefined) c[k] = clone(b[k]); });
    c.rules = Object.assign(defaultRules(), c.rules || {});
    STAT_KEYS.forEach(k => { c.stats[k] = Object.assign({ base: 8, lvl: 0, perm: 0, temp: 0, drain: 0 }, c.stats[k] || {}); });
    while (c.classes.length < 2) c.classes.push({ name: '', level: 0, sub: '' });
    c.cur = Object.assign(b.cur, c.cur || {});
    (c.weapons || []).forEach(w => { if (w.inHand === undefined) w.inHand = true; if (w.chosen === undefined) w.chosen = false; if (w.magic === undefined) w.magic = null; });
    [].concat((c.weapons || []).map(w => w.magic), [c.armorMagic, c.shieldMagic]).forEach(mg => { if (mg && mg.attuned === undefined) mg.attuned = true; });
    // features bought before shop effects existed (church blessings) pick up their effect lines once
    (c.features || []).forEach(f => { if (f && f.fx == null) { const fx = itemFx(f); if (fx) f.fx = fx.join('\n'); } });
    return c;
  }
  function migrateOld(o) {
    const c = blankChar();
    c.name = o.charName || 'Imported character';
    c.race = RACE[o.charRace] ? o.charRace : '';
    c.alignment = o.charAlignment || '';
    c.xp = n(o.charXP); c.gold = n(o.charGold);
    c.classes = [
      { name: D.classes[o.charClass1] ? o.charClass1 : '', level: n(o.charClass1Level) || 1, sub: o.charSubclass1 || '' },
      { name: D.classes[o.charClass2] ? o.charClass2 : '', level: D.classes[o.charClass2] ? n(o.charClass2Level) : 0, sub: o.charSubclass2 || '' },
    ];
    if (o.featuresText) c.features.push({ name: 'Features (old sheet)', text: o.featuresText, uses: 0, max: 0 });
    if (o.charNotes) c.notes.notes = o.charNotes;
    return c;
  }
  const char = () => roster.chars[roster.active];

  // ------------------------------------------------------------------ rules engine
  function levelFromXp(xp) {
    let lv = 1;
    D.levels.forEach(r => { if (xp >= r.xp) lv = r.level; });
    return lv;
  }
  function activeClasses(c) {
    return c.classes.map((k, i) => ({ i, name: k.name, level: clamp(n(k.level), 0, 25), sub: k.sub, cls: D.classes[k.name] }))
      .filter(k => k.cls && k.level > 0);
  }
  function raceInfo(c) {
    const r = RACE[c.race];
    if (!r) return { r: null, statSrc: null, speedSrc: null };
    if (r.previousRace) {
      const p = RACE[c.prevRace];
      return { r, statSrc: p && !p.previousRace ? p : null, speedSrc: p && !p.previousRace ? p : null };
    }
    return { r, statSrc: r, speedSrc: r };
  }
  function adaptations(c) {
    const r = RACE[c.race];
    if (!r || !r.auto.adaptations) return [];
    return (c.adaptations || []).map(a => r.auto.adaptations.find(x => x.name === a)).filter(Boolean);
  }

  function compute(c) {
    const d = { warnings: [] };
    const itemB = {}, minB = {};
    const addB = (map, key, label, v) => (map[key] = map[key] || []).push([label, v]);
    equippedItems(c).forEach(e => {
      const fromData = !!itemFx(e);
      (e.bonuses || []).forEach(b => {
        if (!b || !b.key || !n(b.value)) return;
        if (fromData && !b.manual) return;   // the item's effects in shops-data.js replace bonuses read from its text
        if (b.key.startsWith('statMin_')) addB(minB, 'stat_' + b.key.slice(8), e.name, n(b.value));
        else if (b.key === 'acMin') addB(minB, 'ac', e.name, n(b.value));
        else addB(itemB, b.key, e.name, n(b.value));
      });
    });
    d.itemB = itemB;
    const val = v => (typeof v === 'function' ? v() : v);
    const BP = k => { const o = []; if (n(c.bonus[k])) o.push(['Bonus', n(c.bonus[k])]); (itemB[k] || []).forEach(x => { const v = val(x[1]); if (v) o.push([x[0], v]); }); return o; };
    const B = k => BP(k).reduce((a, x) => a + x[1], 0);
    const atLeast = (key, parts, total) => { (minB[key] || []).forEach(([nm, v]) => { const x = val(v); if (total < x) { parts.push([`${nm} sets it to ${x}`, x - total]); total = x; } }); return total; };
    const sum = ps => ps.reduce((a, p) => a + p[1], 0);
    const R = c.rules;
    d.level = levelFromXp(n(c.xp));
    const nextRow = D.levels.find(r => r.level === d.level + 1);
    d.xpNext = nextRow ? nextRow.xp : null;
    d.xpPrev = D.levels[d.level - 1].xp;
    d.cls = activeClasses(c);
    const classSum = d.cls.reduce((a, k) => a + k.level, 0);
    if (d.cls.length && classSum !== d.level) {
      d.warnings.push(classSum < d.level
        ? `Your XP gives level ${d.level}, but your class levels add up to ${classSum}. Raise a class level.`
        : `Your class levels add up to ${classSum}, but your XP only reaches level ${d.level}.`);
    }
    if (!d.cls.length) d.warnings.push('Pick a class to fill in Health, saves, and class bonuses.');
    const L = d.level;
    // effects from items, class features, and Other features
    const fxCtx = cl => ({ lv: L, cl, mod: k => (d.stat && d.stat[k] ? d.stat[k].mod : 0), score: k => (d.stat && d.stat[k] ? d.stat[k].score : 0),
      pa: d.pa ? d.pa.total : 0, ma: d.ma ? d.ma.total : 0, walk: d.walk || 0 });
    d.fx = collectFx(c, d);
    d.fxImmune = []; d.fxVuln = []; d.fxInfo = []; d.wScoped = [];
    d.fx.forEach(x => {
      const p = x.p, label = `${x.label}${x.src === 'Item' || x.src === 'Feature' ? '' : ` (${x.src})`}`;
      x.status = p.err ? 'error' : !x.on ? 'off' : (p.choice && !x.pick) ? 'choose' : 'on';
      if (x.status !== 'on') return;
      if (p.info != null) { d.fxInfo.push([label, p.info]); return; }
      if (p.list) { (p.list === 'immune' ? d.fxImmune : d.fxVuln).push(p.what); return; }
      const opt = p.choice ? p.choice.find(o => o.label === x.pick) : null;
      if (p.choice && !opt) { x.status = 'choose'; return; }
      const keys = opt ? opt.keys : p.keys;
      const f = p.op === '-' ? () => -p.expr(fxCtx(x.cl)) : () => p.expr(fxCtx(x.cl));
      if (x.scope && p.op !== '=') keys.forEach(k => d.wScoped.push({ test: x.scope, key: k, label, f }));
      else keys.forEach(k => addB(p.op === '=' ? minB : itemB, k, label, f));
      x.keys = keys;
    });
    d.usesChosen = d.fx.some(x => x.status !== 'error' && ((x.p.keys || []).some(k => k.startsWith('chosen_')) || /chosen weapon/i.test(`${x.p.when || ''} ${x.p.info || ''}`)));
    const { r: race, statSrc, speedSrc } = raceInfo(c);
    d.race = race;
    const auto = race ? race.auto : {};
    const adapt = adaptations(c);
    const sizeName = c.size || (race ? race.size : 'Medium');
    d.size = SIZE[sizeName] || SIZE.Medium;
    d.align = alignAxis(c.alignment);
    const cursed = c.conditions.includes('Cursed');

    // stats
    d.stat = {};
    STAT_KEYS.forEach(k => {
      const s = c.stats[k];
      const parts = [['Base', n(s.base)]];
      if (R.raceStats && statSrc) {
        let rv = 0;
        statSrc.fixed.forEach(f => { if (f.stat === k) rv += f.value; });
        statSrc.choices.forEach((ch, i) => { if (c.raceChoice['c' + i] === k) rv += ch.value; });
        if (rv) parts.push([`Race (${statSrc.name})`, rv]);
      }
      if (k === 'str' && d.size.str) parts.push([`Size (${d.size.name})`, d.size.str]);
      d.cls.forEach(kc => {
        if (kc.cls.primary === k) parts.push([`${kc.name} ${kc.level} primary`, kc.cls.primaryBonus[kc.level - 1]]);
        if (kc.cls.secondary === k) parts.push([`${kc.name} ${kc.level} secondary`, kc.cls.secondaryBonus[kc.level - 1]]);
      });
      if (n(s.lvl)) parts.push(['Leveling points', n(s.lvl)]);
      if (n(s.perm)) parts.push(['Permanent', n(s.perm)]);
      if (n(s.temp)) parts.push(['Temporary', n(s.temp)]);
      if (n(s.drain)) parts.push(['Drain', -n(s.drain)]);
      parts.push(...BP('stat_' + k));
      const score = atLeast('stat_' + k, parts, sum(parts));
      d.stat[k] = { total: score, score, mod: modOf(score), parts,
        classBonus: parts.filter(p => / (primary|secondary)$/.test(p[0])).reduce((a, p) => a + p[1], 0),
        raceBonus: parts.filter(p => /^(Race|Size)/.test(p[0])).reduce((a, p) => a + p[1], 0) };
    });
    const M = k => d.stat[k].mod;
    const S = k => d.stat[k].score;
    const lvRow = D.levels[L - 1];
    d.points = { avail: lvRow.points, spent: STAT_KEYS.reduce((a, k) => a + n(c.stats[k].lvl), 0) };
    if (d.points.spent > d.points.avail) d.warnings.push(`You spent ${d.points.spent} leveling points. Level ${L} allows ${d.points.avail}.`);

    // magic armor and shields: the magical bonus adds to AC and to every save
    d.armorMagicStored = ARMOR[c.armor] && c.armorMagic && n(c.armorMagic.bonus) > 0 && c.armorMagic.base === c.armor ? magicOf(c.armorMagic, 'armor') : null;
    d.shieldMagicStored = SHIELD[c.shield] && c.shieldMagic && n(c.shieldMagic.bonus) > 0 && c.shieldMagic.base === c.shield ? magicOf(c.shieldMagic, 'armor') : null;
    d.armorMagic = d.armorMagicStored && c.armorMagic.attuned !== false ? d.armorMagicStored : null;
    d.shieldMagic = d.shieldMagicStored && c.shieldMagic.attuned !== false ? d.shieldMagicStored : null;
    // saves
    d.save = {};
    Object.keys(SAVE_STAT).forEach(sv => {
      const parts = [[`${STAT[SAVE_STAT[sv]].name} modifier`, M(SAVE_STAT[sv])]];
      d.cls.forEach(kc => {
        const grade = kc.cls.saves[sv] || 'Poor';
        const [a, b] = FRACTION[grade];
        const val = Math.ceil((kc.level * a) / b - 1e-9);
        parts.push([`${kc.name} ${kc.level} (${grade})`, val]);
      });
      if (auto.save && auto.save[sv]) parts.push([race.name, auto.save[sv]]);
      if (sv === 'body' && c.hunt && auto.hunt) parts.push(['The Hunt', L]);
      if (d.armorMagic) parts.push([`${c.armor}: magic +${d.armorMagic.bonus}`, d.armorMagic.bonus]);
      if (d.shieldMagic) parts.push([`${c.shield}: magic +${d.shieldMagic.bonus}`, d.shieldMagic.bonus]);
      parts.push(...BP('save_' + sv));
      d.save[sv] = { total: atLeast('save_' + sv, parts, sum(parts)), parts };
    });

    // health and resources
    let parts = [];
    d.cls.forEach(kc => {
      const avg = kc.cls.hitDie / 2 + 1;
      parts.push([`${kc.name} ${kc.level} × ${avg} (d${kc.cls.hitDie} average)`, kc.level * avg]);
    });
    parts.push(['Fortitude modifier', M('fort')]);
    parts.push(...BP('health'));
    d.hp = { total: Math.max(1, atLeast('health', parts, sum(parts))), parts };

    const resource = type => {
      const ps = [];
      d.cls.forEach(kc => { if (kc.cls.resource === type) ps.push([`${kc.name} ${kc.level}`, kc.cls.resourceTable[kc.level - 1]]); });
      if (type === 'mana') ps.push(['Charisma modifier', M('cha')]);
      else ps.push(['Fortitude modifier', M('fort')]);
      ps.push(...BP(type));
      return { total: Math.max(0, atLeast(type, ps, sum(ps))), parts: ps };
    };
    d.mana = resource('mana');
    d.stamina = resource('stamina');

    const armorPool = (stat, label, key) => {
      const ps = [[`${R.armorMult} × ${label} modifier (min 0)`, Math.max(0, R.armorMult * M(stat))]];
      if (auto.armorPerLevel) ps.push([`${race.name}: ${auto.armorPerLevel} × level`, auto.armorPerLevel * L]);
      ps.push(...BP(key));
      return { total: Math.max(0, atLeast(key, ps, sum(ps))), parts: ps };
    };
    d.pa = armorPool('fort', 'Fortitude', 'pa');
    d.ma = armorPool('int', 'Intelligence', 'ma');
    { const ps = BP('ta'); const tot = Math.max(0, atLeast('ta', ps, sum(ps))); d.ta = { total: tot, parts: ps.length ? ps : [['From features or items', 0]] }; }

    // armor class
    const arm = ARMOR[c.armor];
    const sh = SHIELD[c.shield];
    parts = [];
    if (arm) {
      parts.push([`${arm.name} (${arm.type})`, arm.ac]);
      const cap = arm.maxFin == null ? Infinity : arm.maxFin + B('finMax');
      const fin = Math.min(M('fin'), cap);
      parts.push([cap === Infinity ? 'Finesse modifier' : `Finesse modifier (max ${cap})`, fin]);
    } else if (R.unarmored === 'ten') {
      parts.push(['No armor', 10]); parts.push(['Finesse modifier', M('fin')]);
    } else {
      parts.push(['Finesse modifier (no armor)', M('fin')]);
    }
    if (sh) parts.push([sh.name, sh.ac]);
    if (d.armorMagic) parts.push([`${arm.name}: magic +${d.armorMagic.bonus}`, d.armorMagic.bonus]);
    if (d.shieldMagic) parts.push([`${sh.name}: magic +${d.shieldMagic.bonus}`, d.shieldMagic.bonus]);
    if (auto.ac) parts.push([race.name, auto.ac]);
    adapt.forEach(a => { if (a.ac) parts.push([a.name, a.ac]); });
    if (n(c.defensiveWielded)) parts.push(['Defensive weapons wielded', n(c.defensiveWielded)]);
    parts.push(...BP('ac'));
    d.ac = { total: atLeast('ac', parts, sum(parts)), parts };
    parts = [];
    if (arm && arm.penalty) parts.push([arm.name, arm.penalty]);
    if (sh && sh.penalty) parts.push([sh.name, sh.penalty]);
    if (B('armorPen')) parts.push(['Penalty reduction', -B('armorPen')]);
    d.pen = { total: Math.max(0, parts.reduce((a, p) => a + p[1], 0)), parts };

    // crit, initiative, speed, carry
    parts = [[R.critBase === 'score' ? 'Wits score' : 'Wits base score', Math.max(0, R.critBase === 'score' ? S('wits') : n(c.stats.wits.base))]];
    if (auto.crit) parts.push([race.name, auto.crit]);
    parts.push(...BP('crit'));
    d.crit = { total: atLeast('crit', parts, sum(parts)), parts };
    parts = [[`${STAT[R.initStat].name} modifier`, M(R.initStat)]];
    parts.push(...BP('init'));
    d.init = { total: atLeast('init', parts, sum(parts)), parts };

    const sp = Object.assign({}, speedSrc ? speedSrc.speed : { walk: 5 });
    adapt.forEach(a => { if (a.speed) Object.keys(a.speed).forEach(k => { sp[k] = Math.max(sp[k] || 0, a.speed[k]); }); });
    parts = [[speedSrc ? `${speedSrc.name} walk speed` : 'Walk speed', sp.walk || 0]];
    if (c.hunt && auto.hunt) parts.push(['The Hunt', 2]);
    parts.push(...BP('speed'));
    const walk = atLeast('speed', parts, sum(parts));
    d.walk = walk;
    const moves = {};
    Object.keys(sp).concat(['fly', 'swim', 'climb', 'burrow']).forEach(k => {
      if (k === 'walk' || moves[k]) return;
      const ps = sp[k] ? [[`${speedSrc ? speedSrc.name + ' ' : ''}${k} speed`, sp[k]]] : [];
      ps.push(...BP('speed_' + k));
      const tot = atLeast('speed_' + k, ps, sum(ps));
      if (tot > 0) moves[k] = { total: tot, parts: ps };
    });
    d.speed = { total: walk, parts, moves,
      text: [`${walk} Walk`].concat(Object.keys(moves).map(k => `${moves[k].total} ${k[0].toUpperCase() + k.slice(1)}`)).join(' · ') };

    // skills
    d.skill = {};
    D.skills.forEach(sk => {
      let stat = sk.stat;
      if (sk.name === 'Survival') stat = R.survivalStat;
      const rank = n(c.skills[sk.name]);
      const ps = [[`${STAT[stat].name} modifier`, M(stat)]];
      if (rank) ps.push(['Rank', rank]);
      if (sk.armorPenalty && d.pen.total) ps.push(['Armor penalty', -d.pen.total]);
      if (auto.skillHalfLevel && auto.skillHalfLevel.includes(sk.name)) ps.push([`${race.name}: ½ level`, Math.floor(L / 2)]);
      adapt.forEach(a => { if (a.skill && a.skill[sk.name]) ps.push([a.name, a.skill[sk.name]]); });
      ps.push(...BP('skill_' + sk.name));
      if (cursed) ps.push(['Cursed', -1]);
      d.skill[sk.name] = { total: atLeast('skill_' + sk.name, ps, sum(ps)), parts: ps, stat, rank };
    });
    d.tool = (c.tools || []).map(t => {
      const ps = [['Intelligence modifier', M('int')], ['Rank', n(t.rank)]];
      if (/lockpick/i.test(t.name || '') && d.pen.total) ps.push(['Armor penalty', -d.pen.total]);
      if (cursed) ps.push(['Cursed', -1]);
      return { total: ps.reduce((a, p) => a + p[1], 0), parts: ps };
    });
    parts = [];
    d.cls.forEach(kc => parts.push([`${kc.name} ${kc.level}`, kc.cls.skillRanks[kc.level - 1]]));
    if (M('mem') > 0) parts.push(['Memory modifier', M('mem')]);
    if (auto.skillRanksPerLevel) parts.push([`${race.name}: level`, L]);
    if (auto.skillRanksHalfLevel) parts.push([`${race.name}: ½ level`, Math.floor(L / 2)]);
    parts.push(...BP('skillRanks'));
    const spent = Object.values(c.skills).reduce((a, v) => a + n(v), 0) + (c.tools || []).reduce((a, t) => a + n(t.rank), 0);
    d.ranks = { total: parts.reduce((a, p) => a + p[1], 0), parts, spent };
    if (spent > d.ranks.total) d.warnings.push(`You placed ${spent} skill ranks. You have ${d.ranks.total}.`);

    // slots and tiers
    d.slots = { spell: 0, maneuver: 0, mem: Math.max(0, M('mem')) };
    d.cls.forEach(kc => { d.slots[kc.cls.slotType] += kc.cls.slots[kc.level - 1]; });
    d.known = { spell: c.spells.length, maneuver: c.maneuvers.length };
    const over = Math.max(0, d.known.spell - d.slots.spell) + Math.max(0, d.known.maneuver - d.slots.maneuver);
    if (over > d.slots.mem) d.warnings.push(`You know ${over - d.slots.mem} more spells or maneuvers than your slots allow.`);
    d.tierOpen = t => t.level <= L;

    // casting
    d.cast = d.cls.map(kc => {
      const isSpell = kc.cls.resource === 'mana';
      const st = kc.cls.primary;
      const atB = B(`atk${kc.i}`);
      const dcParts = [['Base', 10], [`${STAT[st].name} modifier`, M(st)], ...BP(`dc${kc.i}`), ...BP(isSpell ? 'spellDC' : 'manDC')];
      const atParts = [[`${STAT[st].name} modifier`, M(st)]];
      if (isSpell || R.manAtkLevel) atParts.push(['Level', L]);
      if (cursed) atParts.push(['Cursed', -1]);
      if (atB) atParts.push(['Bonus', atB]);
      atParts.push(...BP(isSpell ? 'spellAtk' : 'manAtk'));
      return { i: kc.i, name: kc.name, isSpell, stat: st,
        dc: { total: dcParts.reduce((a, p) => a + p[1], 0), parts: dcParts },
        atk: { total: atParts.reduce((a, p) => a + p[1], 0), parts: atParts } };
    });

    // weapons
    d._BP = BP; d._atLeast = atLeast;
    d.weapon = c.weapons.map(w => weaponCalc(c, d, w, cursed, auto, race));
    const overMg = d.weapon.filter(wc => wc && wc.stored && wc.stored.spent > wc.stored.bonus).map(wc => wc.title)
      .concat([[d.armorMagic, c.armor], [d.shieldMagic, c.shield]].filter(([mg]) => mg && mg.spent > mg.bonus).map(([mg, nm]) => magicTitle(mg, nm)));
    d.attune = attuneUse(c);
    if (d.attune.used > d.attune.slots) d.warnings.push(`You are attuned to ${d.attune.used} items but have ${d.attune.slots} attunement slots. Unattune one or add a slot on the Gear tab.`);
    if (overMg.length) d.warnings.push(`${overMg.join(', ')}: the traits cost more than the magical bonus. Open Enchant on the Combat tab to fix it.`);
    if (d.usesChosen && !c.weapons.some(w => w.chosen && weaponData(w))) d.warnings.push('A class feature works with your chosen weapon. Tick Chosen weapon on one weapon on the Combat tab.');

    // carrying
    let used = 0;
    c.inventory.forEach(it => { if (it.where !== 'Stored') used += (parseFloat(it.kg) || 0) * (n(it.qty) || 0); });
    if (sh && sh.weight) used += sh.weight;
    parts = [['Strength score × 5 kg', S('str') * 5]];
    parts.push(...BP('carry'));
    d.carry = { total: atLeast('carry', parts, sum(parts)), parts, used: Math.round(used * 10) / 10 };

    // feats
    let feats = D.featsByLevel[L - 1];
    const fp = [[`Level ${L}`, feats]];
    d.cls.forEach(kc => kc.cls.features.forEach(f => { if (/extra feat/i.test(f.name) && f.level <= kc.level) { fp.push([`${kc.name}: ${f.name}`, 1]); feats++; } }));
    if (B('feats')) { fp.push(['Bonus', B('feats')]); feats += B('feats'); }
    d.feats = { total: feats, parts: fp };

    // resistances
    d.resist = {};
    if (race) {
      race.resist.forEach(x => { d.resist[x.type] = (d.resist[x.type] || 0) + x.value; });
      if (race.resistChoice && c.raceResist) d.resist[c.raceResist] = (d.resist[c.raceResist] || 0) + race.resistChoice.value;
    }
    (c.resist || []).forEach(x => { if (x.type) d.resist[x.type] = (d.resist[x.type] || 0) + n(x.value); });
    d.resistParts = {};
    Object.keys(itemB).forEach(key => {
      if (!key.startsWith('res_')) return;
      const t = key.slice(4), ps = BP(key);
      if (!ps.length) return;
      d.resist[t] = (d.resist[t] || 0) + sum(ps);
      d.resistParts[t] = ps;
    });
    Object.keys(minB).forEach(key => {
      if (!key.startsWith('res_')) return;
      const t = key.slice(4);
      minB[key].forEach(([nm, v]) => { const x = val(v); if ((d.resist[t] || 0) < x) d.resist[t] = x; });
    });
    const listOf = s2 => String(s2 || '').split(',').map(x => x.trim().toLowerCase()).filter(Boolean);
    d.immune = listOf(c.immune).concat(d.fxImmune.map(x => x.toLowerCase()).filter(x => !listOf(c.immune).includes(x)));
    d.vuln = listOf(c.vuln).concat(d.fxVuln.map(x => x.toLowerCase()).filter(x => !listOf(c.vuln).includes(x)));
    // what each effect adds, for the item chips, the feature list, and the Active effects table
    const ctxEnd = fxCtx;
    d.fxList = d.fx.map(x => {
      const p = x.p;
      let value = null, text = p.raw;
      if (x.status === 'on' && p.expr) {
        value = p.expr(ctxEnd(x.cl)) * (p.op === '-' ? -1 : 1);
        const tgt = !p.choice ? p.tgt : /\{/.test(p.tgt) ? p.tgt.replace(/\{[^}]*\}/, x.pick) : x.pick;
        text = p.op === '=' ? `${tgt} at least ${value}` : `${tgt} ${sign(value)}`;
      } else if (x.status === 'on' && p.list) text = `${p.list === 'immune' ? 'Immune to' : 'Vulnerable to'} ${p.what}`;
      else if (x.status === 'on' && p.info != null) text = p.info;
      else if (x.status === 'error') text = `${p.raw}: ${p.err}`;
      else if (x.status === 'choose') text = p.raw.replace(/\{[^}]*\}/g, '(choose)');
      return { id: x.id, label: x.label, src: x.src, path: x.path, text, value, status: x.status, when: p.when, choice: p.choice, pick: x.pick, raw: p.raw, custom: !!x.custom, auto: !!x.auto, scoped: !!x.scope };
    });
    const nErr = d.fxList.filter(x => x.status === 'error').length;
    if (nErr) d.warnings.push(`${nErr} effect${nErr > 1 ? 's' : ''} could not be read. See Active effects on the Bonuses & Rules tab.`);
    const nPick = d.fxList.filter(x => x.status === 'choose');
    if (nPick.length) d.warnings.push(`Choose an option for ${nPick.map(x => x.label).filter((v, i, a) => a.indexOf(v) === i).join(', ')}.`);
    return d;
  }

  function weaponData(w) {
    if (w.item === '__custom') {
      return { name: w.name || 'Custom weapon', die: w.die || '1d4',
        traits: String(w.traits || '').split(',').map(s => s.trim()).filter(Boolean),
        range: w.range || 1, type: w.type || 'Slashing', price: null, custom: true };
    }
    const base = WEAPON[w.item];
    if (!base) return null;
    return Object.assign({}, base, { type: w.type || base.type, name: w.name || base.name });
  }
  // Deadly I, Deadly (2), or plain Deadly: the level of a weapon trait
  function traitLevel(data, name) {
    let lv = 0;
    (data.traits || []).forEach(t => {
      const m = String(t).trim().match(new RegExp(`^${name}(?:\\s+([IVX]+|\\d+))?(?:\\s*\\((\\d+)\\))?$`, 'i'));
      if (m) lv += m[1] ? (/^\d+$/.test(m[1]) ? +m[1] : Math.max(1, ROMAN.indexOf(m[1].toUpperCase()))) : m[2] ? +m[2] : 1;
    });
    return lv;
  }
  function weaponCalc(c, d, w, cursed, auto, race) {
    const data = weaponData(w);
    if (!data) return null;
    let stat = w.stat;
    if (stat === 'auto') {
      if (c.rules.weaponStat === 'traits') stat = (hasTrait(data, 'Light') || hasTrait(data, 'Ranged (Finesse)')) ? 'fin' : 'str';
      else stat = d.stat.fin.mod > d.stat.str.mod ? 'fin' : 'str';
    }
    const BPx = k => (d._BP ? d._BP(k) : []);
    const tot = ps => ps.reduce((a, p) => a + p[1], 0);
    const stored = w.magic && w.magic.base === w.item ? magicOf(w.magic, 'weapon') : null;
    const mg = stored && w.magic.attuned !== false ? stored : null;
    const chosen = !!w.chosen;
    const isRanged = (data.traits || []).some(t => /^Ranged/i.test(t));
    const title = magicTitle(stored, data.name);
    const self = { data, title, chosen, ranged: isRanged, src: w };
    const scoped = k => (d.wScoped || []).filter(x => x.key === k && x.test(self)).map(x => [x.label, x.f()]).filter(p => p[1]);
    const lbl = x => x.t.name + (x.t.perLevel ? ' ' + roman(x.level) : '');
    const simple = hasTrait(data, 'Simple') || data.name === 'Unarmed Strike' || data.natural;
    const atk = [[`${STAT[stat].name} modifier`, d.stat[stat].mod]];
    if (w.prof || simple) atk.push([simple && !w.prof ? 'Level (simple weapon)' : 'Level (proficient)', d.level]);
    if (c.hunt && auto.hunt) atk.push(['The Hunt', d.level]);
    if (cursed) atk.push(['Cursed', -1]);
    if (n(w.atk)) atk.push(['Bonus', n(w.atk)]);
    if (mg) { atk.push([`Magic +${mg.bonus}`, mg.bonus]); mg.list.forEach(x => { if (x.t.atk) atk.push([lbl(x), x.t.atk * x.level]); }); }
    atk.push(...BPx('atkAll'), ...BPx(isRanged ? 'atkRanged' : 'atkMelee'), ...scoped('atkAll'), ...scoped(isRanged ? 'atkRanged' : 'atkMelee'));
    if (chosen) atk.push(...BPx('chosen_atk'));
    const dmg = [[`${STAT[stat].name} modifier`, d.stat[stat].mod]];
    if (auto.damageHalfLevel) dmg.push([`${race.name}: ½ level`, Math.floor(d.level / 2)]);
    if (n(w.dmg)) dmg.push(['Bonus', n(w.dmg)]);
    if (mg) dmg.push([`Magic +${mg.bonus}`, mg.bonus]);
    dmg.push(...BPx('dmgAll'), ...BPx(isRanged ? 'dmgRanged' : 'dmgMelee'), ...scoped('dmgAll'), ...scoped(isRanged ? 'dmgRanged' : 'dmgMelee'));
    if (chosen) dmg.push(...BPx('chosen_dmg'));
    // Deadly widens the decisive range (natural 20) by 1 per level. Enchanted ignores 5 resistance per level.
    const deadly = [];
    const baseDeadly = traitLevel(data, 'Deadly');
    if (baseDeadly) deadly.push([`Deadly ${roman(baseDeadly)} (weapon)`, baseDeadly]);
    deadly.push(...BPx('w_deadly'));
    if (chosen) deadly.push(...BPx('chosen_deadly'));
    const ench = [];
    const baseEnch = traitLevel(data, 'Enchanted');
    if (baseEnch) ench.push([`Enchanted ${roman(baseEnch)} (weapon)`, baseEnch]);
    if (mg) mg.list.forEach(x => { if (x.t.ench) ench.push([lbl(x), x.t.ench * x.level]); });
    ench.push(...BPx('w_ench'));
    if (chosen) ench.push(...BPx('chosen_ench'));
    const crit = [['Critical Chance', d.crit.total], ...scoped('crit')];
    if (chosen) crit.push(...BPx('chosen_crit'));
    let critTot = tot(crit);
    if (chosen && d._atLeast) critTot = d._atLeast('chosen_crit', crit, critTot);
    const dec = [['Decisive Strike', 3]];
    if (chosen) dec.push(...BPx('chosen_dec'));
    let decTot = tot(dec);
    if (chosen && d._atLeast) decTot = d._atLeast('chosen_dec', dec, decTot);
    // magic trait dice are never multiplied on critical or decisive strikes
    const extra = [], vs = [], ignore = [];
    if (mg) mg.list.forEach(x => {
      (x.t.extra || []).forEach(e => extra.push({ dice: e.dice, type: e.type, src: x.t.name }));
      (x.t.vs || []).forEach(e => vs.push({ dice: e.dice, type: e.type || '', vs: fillNote(e.vs, mg, x), src: x.t.name }));
      if (x.t.ignore && !ignore.includes(x.t.ignore)) ignore.push(x.t.ignore);
    });
    const deadlyTot = tot(deadly), enchTot = Math.max(0, tot(ench));
    return { data, title, stat, chosen, magic: mg, stored, attuned: !!mg, inHand: w.inHand !== false,
      atk: { total: tot(atk), parts: atk }, dmg: { total: tot(dmg), parts: dmg }, needsSkilled: hasTrait(data, 'Skilled'), ranged: isRanged,
      deadly: { total: deadlyTot, parts: deadly.length ? deadly : [['No Deadly levels', 0]] },
      ench: { total: enchTot, parts: ench.length ? ench : [['No Enchanted levels', 0]] },
      critW: { total: critTot, parts: crit }, decisive: { total: decTot, parts: dec },
      decFrom: Math.max(2, 20 - Math.max(0, deadlyTot)), extra, vs, ignore,
      wrongBase: !!(w.magic && n(w.magic.bonus) > 0 && w.magic.base !== w.item) };
  }

  // ------------------------------------------------------------------ dice
  let rollMode = 'normal';
  const rolls = [];
  const rnd = sides => 1 + Math.floor(Math.random() * sides);
  function parseDice(expr) {
    const m = String(expr || '').replace(/\s+/g, '').match(/^(\d*)d(\d+)$/i);
    if (m) return { count: n(m[1]) || 1, sides: n(m[2]) };
    return { count: 0, sides: 0, flat: n(expr) };
  }
  function rollDice(expr, mult) {
    const p = parseDice(expr);
    const count = p.count * (mult || 1);
    const dice = [];
    for (let i = 0; i < count; i++) dice.push(rnd(p.sides));
    return { dice, sum: dice.reduce((a, b) => a + b, 0) + (p.flat || 0), flat: p.flat || 0, count, sides: p.sides };
  }
  function d20() {
    const a = rnd(20);
    if (rollMode === 'normal') return { nat: a, txt: `d20 ${a}` };
    const b = rnd(20);
    const nat = rollMode === 'adv' ? Math.max(a, b) : Math.min(a, b);
    return { nat, txt: `${rollMode === 'adv' ? 'ADV' : 'DIS'} ${a}, ${b}` };
  }
  function logRoll(title, total, detail, cls) {
    rolls.unshift({ title, total, detail, cls: cls || '', t: new Date() });
    if (rolls.length > 30) rolls.pop();
    renderRolls();
    toast(`<b>${esc(title)}</b> <span class="cs-toast-num">${esc(total)}</span><small>${detail}</small>`, cls);
  }
  function rollCheck(title, mod) {
    const r = d20();
    const tot = r.nat + mod;
    const cls = r.nat === 20 ? 'nat20' : r.nat === 1 ? 'nat1' : '';
    logRoll(title, tot, `${esc(r.txt)} ${sign(mod)}${r.nat === 20 ? ' · natural 20' : r.nat === 1 ? ' · natural 1' : ''}`, cls);
  }
  // magic dice, Enchanted, and ignore lines added under an attack or damage roll
  function magicDamageHtml(w) {
    let h = '';
    w.extra.forEach(e => { const r = rollDice(e.dice, 1); h += `<br>+ <b>${r.sum}</b> ${esc(e.type)} (${esc(e.dice)}: ${r.dice.join(' + ')}, ${esc(e.src)})`; });
    w.vs.forEach(e => { const r = rollDice(e.dice, 1); h += `<br>+ <b>${r.sum}</b>${e.type ? ' ' + esc(e.type) : ''} against ${esc(e.vs)} (${esc(e.dice)}: ${r.dice.join(' + ')})`; });
    if (w.ench.total) h += `<br>Enchanted ${roman(w.ench.total)}: ignores ${w.ench.total * ENCH_RES} resistance.`;
    w.ignore.forEach(t => { h += `<br>${esc(t)}.`; });
    return h;
  }
  function rollAttack(idx) {
    const c = char(), d = compute(c);
    const w = d.weapon[idx];
    if (!w) return;
    const r = d20();
    const tot = r.nat + w.atk.total;
    const critRoll = rnd(100);
    const crit = w.critW.total, from = w.decFrom, dx = w.decisive.total, sure = crit >= 100;
    const conf = ok => (sure ? 'automatic' : `d100 ${critRoll} ${ok ? '≤' : '>'} ${crit}`);
    let mult = 1, tag;
    if (r.nat >= from) {
      const dec = critRoll <= crit;
      mult = dec ? dx : 2;
      tag = `Natural ${r.nat}${from < 20 ? ` (decisive range ${from}–20)` : ''}: ${dec ? `Decisive Strike ×${dx} (${conf(true)}). Target is Crippled.` : `Critical Strike (${conf(false)} for Decisive).`}`;
    } else if (critRoll <= crit) {
      mult = 2; tag = `If it hits: Critical Strike (${conf(true)}).`;
    } else tag = `If it hits: normal hit (${conf(false)}).`;
    const dm = rollDice(w.data.die, mult);
    const dmgTot = dm.sum + w.dmg.total;
    const ranged = w.ranged ? ' Ranged attacks in melee take −5.' : '';
    logRoll(`${w.title} attack`, tot,
      `${esc(r.txt)} ${sign(w.atk.total)}<br>${esc(tag)}<br>Damage <b>${dmgTot}</b> ${esc(w.data.type)} (${mult > 1 ? `${esc(w.data.die)} ×${mult}: ` : ''}${dm.dice.join(' + ') || dm.flat} ${sign(w.dmg.total)})${esc(ranged)}${magicDamageHtml(w)}`,
      r.nat >= from ? 'nat20' : r.nat === 1 ? 'nat1' : '');
  }
  function rollDamage(idx, mult) {
    const c = char(), d = compute(c);
    const w = d.weapon[idx];
    if (!w) return;
    const m = mult === 3 ? w.decisive.total : mult;
    const dm = rollDice(w.data.die, m);
    logRoll(`${w.title} damage${mult === 2 ? ' (critical)' : mult === 3 ? ' (decisive)' : ''}`, dm.sum + w.dmg.total,
      `${esc(w.data.die)}${m > 1 ? ' ×' + m : ''}: ${dm.dice.join(' + ') || dm.flat} ${sign(w.dmg.total)} · ${esc(w.data.type)}${magicDamageHtml(w)}`);
  }

  // ------------------------------------------------------------------ resources and damage
  function curOf(key, d) {
    const c = char();
    const max = d[key].total;
    let v = c.cur[key];
    if (v == null || v === '') v = max;
    return key === 'hp' ? Math.min(n(v), max) : clamp(n(v), 0, max);
  }
  function setCur(key, val, d) {
    const max = d[key].total;
    char().cur[key] = key === 'hp' ? Math.min(val, max) : clamp(val, 0, max);
  }
  function applyDamage(amount, type, isTrue) {
    const c = char(), d = compute(c);
    let dmg = Math.max(0, n(amount));
    const steps = [`${dmg} ${type}${isTrue ? ' (true)' : ''}`];
    const t = type.toLowerCase();
    if (d.immune.includes(t)) { steps.push('immune → 0'); dmg = 0; }
    if (dmg && d.vuln.includes(t)) { dmg *= 2; steps.push(`vulnerable → ${dmg}`); }
    const res = d.resist[type] || 0;
    if (dmg && res) { dmg = Math.max(0, dmg - res); steps.push(`resistance ${res} → ${dmg}`); }
    const order = [];
    const physical = D.damageTypes.physical.includes(type);
    const alignHit = (type === 'Holy' && d.align === 'Evil') || (type === 'Unholy' && d.align === 'Good') || (type === 'Magic' && d.align === 'Neutral');
    if (isTrue || alignHit) order.push('ta');
    else { order.push(physical ? 'pa' : 'ma'); order.push('ta'); }
    if (alignHit && !isTrue) steps.push(`${d.align} target: bypasses armor`);
    const label = { pa: 'Physical Armor', ma: 'Magical Armor', ta: 'True Armor' };
    order.forEach(k => {
      if (!dmg) return;
      const have = curOf(k, d);
      const take = Math.min(have, dmg);
      if (take) { setCur(k, have - take, d); dmg -= take; steps.push(`${label[k]} absorbs ${take}`); }
    });
    if (dmg) {
      const hp = curOf('hp', d);
      setCur('hp', hp - dmg, d);
      steps.push(`Health −${dmg}`);
      if (c.conditions.includes('Dying')) { c.dying.fails = Math.min(3, n(c.dying.fails) + 1); steps.push('failed death save marked'); }
      else if (hp - dmg <= 0) { toggleCondition('Dying', true); steps.push('Dying'); }
    }
    checkDeath(c, compute(c));
    logRoll('Damage taken', `−${n(amount)}`, esc(steps.join(' · ')), 'dmg');
    update();
  }
  function heal(amount) {
    const c = char(), d = compute(c);
    const hp = curOf('hp', d);
    setCur('hp', hp + Math.max(0, n(amount)), d);
    if (curOf('hp', d) > 0 && c.conditions.includes('Dying')) {
      toggleCondition('Dying', false); c.dying = { fails: 0, rounds: 0, dead: false };
    }
    logRoll('Healed', `+${n(amount)}`, `Health ${curOf('hp', d)} / ${d.hp.total}`, 'heal');
    update();
  }
  function checkDeath(c, d) {
    const hp = curOf('hp', d);
    const limit = d.stat.fort.score;
    const maxRounds = c.race === 'Deadspawn' ? 5 + d.level : 5;
    c.dying.dead = c.conditions.includes('Dying') && (n(c.dying.fails) >= 3 || -hp > limit || n(c.dying.rounds) >= maxRounds);
  }
  function deathSave() {
    const c = char(), d = compute(c);
    const target = d.stat.fort.mod + d.level;
    const r = rnd(100);
    const ok = r <= target;
    if (!ok) c.dying.fails = Math.min(3, n(c.dying.fails) + 1);
    c.dying.rounds = n(c.dying.rounds) + 1;
    checkDeath(c, d);
    logRoll('Death save', r, `d100 ${r} vs ${target} (Fortitude modifier + level): ${ok ? 'success' : 'failure'}`, ok ? 'heal' : 'dmg');
    update();
  }
  function rest(kind) {
    const c = char(), d = compute(c);
    if (kind === 'full') {
      ['hp', 'pa', 'ma', 'ta', 'mana', 'stamina'].forEach(k => { c.cur[k] = null; });
      c.dying = { fails: 0, rounds: 0, dead: false };
      toggleCondition('Dying', false);
      c.features.forEach(f => { if (f.reset !== 'none') f.uses = 0; });
      c.hunt = false;
      logRoll('Full rest', '24 h', 'Health, Mana, Stamina, and armor restored. Per-rest uses refreshed.', 'heal');
    } else {
      setCur('mana', curOf('mana', d) + d.level, d);
      setCur('stamina', curOf('stamina', d) + d.level, d);
      setCur('pa', curOf('pa', d) + d.stat.fort.score, d);
      setCur('ma', curOf('ma', d) + d.stat.int.score, d);
      c.features.forEach(f => { if (f.reset === 'partial') f.uses = 0; });
      if (c.conditions.includes('Exhausted') && RACE[c.race] && RACE[c.race].auto.hunt) toggleCondition('Exhausted', false);
      logRoll('Partial rest', '8 h', `Mana and Stamina +${d.level}, Physical Armor +${d.stat.fort.score}, Magical Armor +${d.stat.int.score}.`, 'heal');
    }
    update(true);
  }
  function spend(key, cost, what) {
    const c = char(), d = compute(c);
    const have = curOf(key, d);
    const label = key === 'mana' ? 'Mana' : 'Stamina';
    if (have < cost) { toast(`Not enough ${label} for ${esc(what)}: ${have} of ${cost}.`, 'dmg'); return; }
    setCur(key, have - cost, d);
    logRoll(what, `−${cost}`, `${label} ${have - cost} / ${d[key].total}`);
    update();
  }
  function toggleCondition(name, on) {
    const c = char();
    const has = c.conditions.includes(name);
    if (on === undefined) on = !has;
    if (on && !has) c.conditions.push(name);
    if (!on && has) c.conditions = c.conditions.filter(x => x !== name);
  }

  // ------------------------------------------------------------------ equip and use
  function addToInventory(c, entry) {
    const same = c.inventory.find(x => x.name === entry.name && (x.shop || '') === (entry.shop || '') && (x.kind || '') === (entry.kind || ''));
    if (same) same.qty = n(same.qty) + n(entry.qty || 1);
    else c.inventory.push(Object.assign({ qty: 1, kg: 0, where: 'Pack', notes: '' }, entry));
  }
  function takeOne(c, i) {
    const it = c.inventory[i];
    it.qty = n(it.qty) - 1;
    if (it.qty <= 0) c.inventory.splice(i, 1);
  }
  function shortText(t) { const s = String(t || '').replace(/\s+/g, ' ').trim(); return s.length > 90 ? s.slice(0, 87).replace(/\s\S*$/, '') + '…' : s; }
  function equip(i) {
    const c = char(), it = c.inventory[i];
    if (!it) return;
    if (it.kind === 'weapon' || it.kind === 'armor' || it.kind === 'shield') {
      const nm = it.name;
      if (it.kind === 'weapon') {
        const blank = c.weapons.findIndex(w => !w.item && !w.name);
        if (blank >= 0) c.weapons[blank] = newWeapon(nm); else c.weapons.push(newWeapon(nm));
      } else {
        const key = it.kind === 'armor' ? 'armor' : 'shield';
        if (c[key]) addToInventory(c, { name: c[key], qty: 1, kg: 0, where: 'Pack', notes: '', kind: it.kind, shop: 'General Smithing', desc: '' });
        c[key] = nm;
      }
      takeOne(c, i);
      fillInputs(); renderWeapons(compute(c)); renderInventory(); update(true);
      toast(`${esc(nm)} equipped on the Combat tab.`);
      return;
    }
    const sl = normSlot(it.slot);
    let path;
    if (sl === 'Ring') { let k = c.rings.findIndex(r => !r || !r.name); if (k < 0) { c.rings.push({}); k = c.rings.length - 1; toast('Every ring slot was full, so the sheet added one. Check with your GM.'); } path = 'rings.' + k; }
    else if (D.itemSlots.includes(sl)) path = 'items.' + sl;
    else { let k = c.misc.findIndex(r => !r || !r.name); if (k < 0 || attuneUse(c).used >= c.misc.length) { c.misc.push({}); k = c.misc.length - 1; toast('Every attunement slot was full, so the sheet added one. Check with your GM.'); } path = 'misc.' + k; }
    const old = getPath(c, path);
    if (old && old.name) unequipTo(c, path);
    const data = itemFx(it);
    const bonuses = data ? [] : detectBonuses(it.desc);
    setPath(c, path, { name: it.name, power: it.power || '', notes: shortText(it.desc), desc: it.desc || '', shop: it.shop || '', slot: sl, bonuses, fx: it.fx || '' });
    takeOne(c, i);
    const shown = data ? data.filter(l => !/^\s*note\s*:/i.test(l)).map(l => l.replace(/\{[^}]*\}/g, '(your choice)')) : [];
    const extra = data && data.some(l => /\{|\s(when|while)\s/i.test(l)) ? '. Set its choices and switches under the item' : '';
    const what = data ? (shown.length ? `its effects: ${shown.join(', ')}` : 'its notes') + extra : bonuses.length ? bonuses.map(b => `${BONUS_LABEL[b.key] || b.key} ${sign(b.value)}`).join(', ') : 'no automatic bonus. Add one with Bonuses if it needs it';
    logRoll(`Equipped ${it.name}`, sl, esc(`Slot: ${path.startsWith('misc') ? 'attunement' : sl}. Applied ${what}.`), 'heal');
    renderItems(); renderInventory(); update(true);
  }
  function unequipTo(c, path) {
    const e = getPath(c, path);
    if (!e || !e.name) return;
    addToInventory(c, { name: e.name, qty: 1, kg: 0, where: 'Carried', notes: '', desc: e.desc || e.notes || '', power: e.power || '', slot: e.slot || (path.startsWith('rings') ? 'Ring' : path.startsWith('misc') ? 'Misc' : path.split('.')[1]), kind: 'magic', shop: e.shop || '', fx: e.fx || '' });
    setPath(c, path, {});
    openEditors.delete(path);
  }
  function useItem(i) {
    const c = char(), it = c.inventory[i];
    if (!it) return;
    const d = compute(c), t = String(it.desc || '');
    const notes = [];
    let total = '✓';
    const heal = t.match(/regain\s+(\d*d\d+)(?:\s*\+\s*(\d+))?\s+(Health|Mana|Stamina)/i);
    if (heal) {
      const r = rollDice(heal[1]); const amt = r.sum + n(heal[2]);
      const key = { health: 'hp', mana: 'mana', stamina: 'stamina' }[heal[3].toLowerCase()];
      setCur(key, curOf(key, d) + amt, d);
      if (key === 'hp' && curOf('hp', d) > 0 && c.conditions.includes('Dying')) { toggleCondition('Dying', false); c.dying = { fails: 0, rounds: 0, dead: false }; }
      total = '+' + amt;
      notes.push(`${heal[1]}${heal[2] ? '+' + heal[2] : ''}: ${r.dice.join(' + ')}${heal[2] ? ' + ' + heal[2] : ''} = ${amt} ${heal[3]}`);
    }
    const dur = t.match(/for\s+(\d*d\d+|\d+)\s+(hours?|minutes?|rounds?)/i);
    let durTxt = '';
    if (dur) { const dv = /d/.test(dur[1]) ? rollDice(dur[1]).sum : n(dur[1]); durTxt = `${dv} ${dur[2]}${dv === 1 ? '' : (/s$/.test(dur[2]) ? '' : 's')}`.replace(/(hour|minute|round)ss$/, '$1s'); }
    const reStat = /\+\s?(\d+)\s*(?:bonus\s*)?to\s*(?:its\s*|your\s*|their\s*)?(strength|finesse|fortitude|charisma|wits|intelligence|memory)/gi;
    let m;
    while ((m = reStat.exec(t))) {
      const k = STAT_WORD[m[2].toLowerCase()];
      c.stats[k].temp = n(c.stats[k].temp) + n(m[1]);
      notes.push(`+${m[1]} ${STAT[k].name} added to Temporary${durTxt ? ` for ${durTxt}` : ''}. Clear it when the effect ends`);
      total = '+' + m[1];
    }
    if (/removes? the poisoned condition/i.test(t) && c.conditions.includes('Poisoned')) { toggleCondition('Poisoned', false); notes.push('Poisoned removed'); }
    if (/immune to the fearful and hopeless/i.test(t)) { toggleCondition('Fearful', false); toggleCondition('Hopeless', false); notes.push('Fearful and Hopeless ended'); }
    if (!notes.length) notes.push(shortText(t) || 'Used');
    takeOne(c, i);
    logRoll(`Used ${it.name}`, total, esc(notes.join('. ') + '.'), 'heal');
    renderInventory(); update(true);
  }

  // ------------------------------------------------------------------ UI: shell
  const TABS = [
    ['character', 'Character'], ['combat', 'Combat'], ['skills', 'Skills'], ['magic', 'Spells & Maneuvers'],
    ['gear', 'Gear'], ['features', 'Features'], ['notes', 'Notes'], ['bonuses', 'Bonuses & Rules'],
  ];
  let tab = 'character';
  try { tab = localStorage.getItem('sparks-sheet-tab') || 'character'; } catch (e) { /* storage blocked */ }
  if (!TABS.some(t => t[0] === tab)) tab = 'character';

  function opt(value, label, sel) {
    return `<option value="${esc(value)}"${String(value) === String(sel) ? ' selected' : ''}>${esc(label == null ? value : label)}</option>`;
  }
  function numIn(path, attrs) {
    return `<input type="number" inputmode="numeric" class="cs-num" data-bind="${path}" data-type="num" ${attrs || ''}>`;
  }
  function out(key, cls) { return `<span class="${cls || ''}" data-out="${key}"></span>`; }
  function brk(key, label, cls) {
    return `<button type="button" class="cs-val ${cls || ''}" data-break="${key}" aria-label="${esc(label)}: show the math">${out(key + '.total')}</button>`;
  }

  function shell() {
    return `
<div class="cs-wrap${CFG.standalone ? ' cs-standalone' : ''}">
  <div class="cs-toolbar" role="toolbar" aria-label="Character file">
    <label class="cs-roster"><span class="cs-lbl">Character</span>
      <select id="cs-roster" aria-label="Switch character"></select></label>
    <div class="cs-tools">
      <button type="button" class="cs-btn cs-btn-red" data-act="new">Create character</button>
      <button type="button" class="cs-btn" data-act="new-blank">Blank sheet</button>
      <button type="button" class="cs-btn" data-act="dup">Duplicate</button>
      <button type="button" class="cs-btn" data-act="export">Export</button>
      <button type="button" class="cs-btn" data-act="import">Import</button>
      ${CFG.canPrint ? '<button type="button" class="cs-btn" data-act="print">Print</button>' : ''}
      <button type="button" class="cs-btn cs-btn-quiet" data-act="delete">Delete</button>
      <input type="file" id="cs-import-file" accept=".json,application/json" hidden>
    </div>
    <span id="cs-save-state" class="cs-save-state" aria-live="polite"></span>
  </div>
  <div id="cs-example" class="cs-example" hidden>
    <span>This is an example character so you can see the sheet at work.</span>
    <button type="button" class="cs-btn cs-btn-red" data-act="start">Create my character</button>
  </div>
  <header class="cs-hero">
    <div class="cs-hero-id">
      <input id="cs-name" class="cs-name" data-bind="name" placeholder="Character name" aria-label="Character name" autocomplete="off">
      <div class="cs-subline" data-out="subline"></div>
      <div class="cs-xp"><div class="cs-xp-bar"><span data-out-style="xpPct"></span></div><span data-out="xpText"></span></div>
    </div>
    <div class="cs-seal" aria-label="Level"><span class="cs-seal-lbl">Level</span><span class="cs-seal-num" data-out="level"></span></div>
  </header>
  <div class="cs-vitals" id="cs-vitals"></div>
  <div class="cs-quick">
    <div class="cs-q"><span class="cs-lbl">Armor Class</span>${brk('ac', 'Armor Class', 'big')}</div>
    <div class="cs-q"><span class="cs-lbl">Initiative</span><button type="button" class="cs-val big" data-roll="init" aria-label="Roll initiative">${out('initSigned')}</button></div>
    <div class="cs-q"><span class="cs-lbl">Speed</span>${brk('speed', 'Speed', 'big')}<small data-out="speed.text"></small></div>
    <div class="cs-q"><span class="cs-lbl">Critical Chance</span>${brk('crit', 'Critical Chance', 'big')}<small>d100 at or under</small></div>
    ${['evasion', 'body', 'mind'].map(sv => `<div class="cs-q"><span class="cs-lbl">${SAVE_NAME[sv]}</span><button type="button" class="cs-val big" data-roll="save:${sv}" aria-label="Roll ${SAVE_NAME[sv]}">${out('saveSigned.' + sv)}</button><button type="button" class="cs-why" data-break="save.${sv}" aria-label="Show the math">math</button></div>`).join('')}
  </div>
  <div class="cs-chips" id="cs-cond-chips" aria-label="Active conditions"></div>
  <div class="cs-warn" id="cs-warn" role="status"></div>
  <nav class="cs-tabs" role="tablist" aria-label="Sheet sections">
    ${TABS.map(([id, label]) => `<button type="button" role="tab" class="cs-tab" id="cs-tab-${id}" data-tab="${id}" aria-controls="cs-panel-${id}">${label}</button>`).join('')}
  </nav>
  ${TABS.map(([id]) => `<section class="cs-panel" role="tabpanel" id="cs-panel-${id}" aria-labelledby="cs-tab-${id}" hidden>${PANELS[id]()}</section>`).join('')}
</div>
<button type="button" class="cs-dice-fab" id="cs-dice-fab" aria-expanded="false" aria-controls="cs-rolls">Rolls <span id="cs-roll-count"></span></button>
<aside class="cs-rolls" id="cs-rolls" hidden aria-label="Roll log">
  <div class="cs-rolls-head">
    <div class="cs-seg" role="radiogroup" aria-label="Roll mode">
      <button type="button" data-mode="dis" role="radio">Disadvantage</button><button type="button" data-mode="normal" role="radio">Normal</button><button type="button" data-mode="adv" role="radio">Advantage</button>
    </div>
    <div class="cs-quickdice">${['d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd100'].map(x => `<button type="button" class="cs-btn cs-btn-sm" data-die="${x}">${x}</button>`).join('')}</div>
  </div>
  <ol id="cs-roll-list" class="cs-roll-list"></ol>
</aside>
<div class="cs-toasts" id="cs-toasts" aria-live="polite"></div>
<div class="cs-pop" id="cs-pop" role="dialog" hidden></div>
<div class="cs-modal-back" id="cs-modal" hidden><div class="cs-modal" role="dialog" aria-modal="true" aria-labelledby="cs-modal-title"></div></div>`;
  }

  const PANELS = {
    character() {
      return `
<div class="cs-grid2">
  <div class="cs-box">
    <h3 class="cs-h">Identity</h3>
    <div class="cs-form">
      <label><span class="cs-lbl">Player</span><input data-bind="player" id="f-player" autocomplete="off"></label>
      <label><span class="cs-lbl">Race</span><select data-bind="race" id="f-race" data-rerender="race">${opt('', 'Choose a race')}${D.races.map(r => opt(r.name)).join('')}</select></label>
      <div id="cs-race-choices" class="cs-form-sub"></div>
      <label><span class="cs-lbl">Size</span><select data-bind="size" id="f-size"><option value="">Race size</option>${D.sizes.map(s => opt(s.name, `${s.name}${s.str ? ` (+${s.str} Strength)` : ''}`)).join('')}</select></label>
      <label><span class="cs-lbl">Alignment</span><select data-bind="alignment" id="f-align">${opt('', 'Choose')}${D.alignments.map(a => opt(a)).join('')}</select></label>
      <label><span class="cs-lbl">Deity</span><input data-bind="deity" id="f-deity" autocomplete="off"></label>
      <label><span class="cs-lbl">Experience</span>${numIn('xp', 'id="f-xp" min="0" step="50"')}</label>
      <label><span class="cs-lbl">Gold</span>${numIn('gold', 'id="f-gold" min="0"')}</label>
    </div>
  </div>
  <div class="cs-box">
    <h3 class="cs-h">Classes</h3>
    ${[0, 1].map(i => `
    <div class="cs-classrow">
      <label><span class="cs-lbl">Class ${i + 1}</span><select data-bind="classes.${i}.name" id="f-class${i}" data-rerender="class">${opt('', i ? 'None' : 'Choose a class')}${CLASS_NAMES.map(cn => opt(cn)).join('')}</select></label>
      <label class="cs-narrow"><span class="cs-lbl">Level</span>${numIn(`classes.${i}.level`, `id="f-clvl${i}" min="0" max="25" data-rerender="class"`)}</label>
      <label><span class="cs-lbl">Subclass</span><select data-bind="classes.${i}.sub" id="f-sub${i}" data-rerender="class"></select></label>
    </div>`).join('')}
    <div id="cs-class-facts" class="cs-facts"></div>
  </div>
</div>
<div class="cs-box">
  <div class="cs-h-row"><h3 class="cs-h">Statistics</h3><span class="cs-meter" data-out="pointsText"></span></div>
  <div class="cs-scroll"><table class="cs-table cs-stats">
    <thead><tr><th scope="col">Statistic</th><th scope="col">Base</th><th scope="col">Race and size</th><th scope="col">Class</th><th scope="col">Leveling</th><th scope="col">Permanent</th><th scope="col">Temporary</th><th scope="col">Drain</th><th scope="col">Score</th><th scope="col">Modifier</th></tr></thead>
    <tbody>${D.stats.map(s => `<tr>
      <th scope="row">${s.name}</th>
      <td data-label="Base" class="o3">${numIn(`stats.${s.key}.base`, `id="st-${s.key}-base" aria-label="${s.name} base"`)}</td>
      <td data-label="Race" class="cs-auto o8">${out(`statRace.${s.key}`)}</td>
      <td data-label="Class" class="cs-auto o9">${out(`statClass.${s.key}`)}</td>
      <td data-label="Leveling" class="o4">${numIn(`stats.${s.key}.lvl`, `id="st-${s.key}-lvl" min="0" aria-label="${s.name} leveling points"`)}</td>
      <td data-label="Permanent" class="o5">${numIn(`stats.${s.key}.perm`, `id="st-${s.key}-perm" aria-label="${s.name} permanent bonus"`)}</td>
      <td data-label="Temporary" class="o6">${numIn(`stats.${s.key}.temp`, `id="st-${s.key}-temp" aria-label="${s.name} temporary bonus"`)}</td>
      <td data-label="Drain" class="o7">${numIn(`stats.${s.key}.drain`, `id="st-${s.key}-drain" min="0" aria-label="${s.name} drain"`)}</td>
      <td data-label="Score" class="o1">${brk(`stat.${s.key}`, s.name + ' score', 'score')}</td>
      <td data-label="Modifier" class="o2"><span class="cs-mod" data-out="statMod.${s.key}"></span></td>
    </tr>`).join('')}</tbody>
  </table></div>
  <p class="cs-note">Modifier = (score − 8) ÷ 2, rounded down. Class bonuses come from each class chart at your class level. Leveling points are a running total from the Leveling table.</p>
</div>
<div class="cs-grid3">
  <div class="cs-box"><h3 class="cs-h">Health</h3><div class="cs-bigstat">${brk('hp', 'Health')}</div><p class="cs-note">Hit die average × class level, plus Fortitude modifier.</p></div>
  <div class="cs-box"><h3 class="cs-h">Mana</h3><div class="cs-bigstat">${brk('mana', 'Mana')}</div><p class="cs-note">Class Mana plus Charisma modifier.</p></div>
  <div class="cs-box"><h3 class="cs-h">Stamina</h3><div class="cs-bigstat">${brk('stamina', 'Stamina')}</div><p class="cs-note">Class Stamina plus Fortitude modifier.</p></div>
  <div class="cs-box"><h3 class="cs-h">Physical Armor</h3><div class="cs-bigstat">${brk('pa', 'Physical Armor')}</div><p class="cs-note" data-out="paNote"></p></div>
  <div class="cs-box"><h3 class="cs-h">Magical Armor</h3><div class="cs-bigstat">${brk('ma', 'Magical Armor')}</div><p class="cs-note" data-out="maNote"></p></div>
  <div class="cs-box"><h3 class="cs-h">Carrying Capacity</h3><div class="cs-bigstat">${brk('carry', 'Carrying capacity')}<small>kg</small></div><p class="cs-note" data-out="carryNote"></p></div>
</div>`;
    },
    combat() {
      return `
<div class="cs-grid2">
  <div class="cs-box">
    <h3 class="cs-h">Take damage or heal</h3>
    <div class="cs-form cs-form-inline">
      <label class="cs-narrow"><span class="cs-lbl">Amount</span><input type="number" inputmode="numeric" class="cs-num" id="dmg-amt" min="0" value="5"></label>
      <label><span class="cs-lbl">Damage type</span><select id="dmg-type">
        <optgroup label="Physical">${D.damageTypes.physical.map(t => opt(t)).join('')}</optgroup>
        <optgroup label="Magical">${D.damageTypes.magical.map(t => opt(t)).join('')}</optgroup>
        <optgroup label="Alignment">${D.damageTypes.alignment.map(t => opt(t)).join('')}</optgroup>
      </select></label>
      <label class="cs-check"><input type="checkbox" id="dmg-true"> True damage</label>
    </div>
    <div class="cs-btnrow cs-btngrid">
      <button type="button" class="cs-btn cs-btn-red" data-act="damage">Take damage</button>
      <button type="button" class="cs-btn" data-act="heal">Heal</button>
      <button type="button" class="cs-btn" data-act="partial">Partial rest (8 h)</button>
      <button type="button" class="cs-btn" data-act="full">Full rest (24 h)</button>
    </div>
    <p class="cs-note">Order: immunity, vulnerability (×2), resistance, then armor. Physical types hit Physical Armor. Elemental and psychic types hit Magical Armor. True damage skips to True Armor. Holy hits Evil targets, Unholy hits Good, and Magic hits Neutral straight past armor.</p>
    <div class="cs-dying" id="cs-dying"></div>
  </div>
  <div class="cs-box">
    <h3 class="cs-h">Armor and shield</h3>
    <div class="cs-form">
      <label class="cs-span"><span class="cs-lbl">Armor</span><select data-bind="armor" id="f-armor" data-rerender="armor">${opt('', 'No armor')}${['Light', 'Medium', 'Heavy'].map(t => `<optgroup label="${t}">${D.armor.filter(a => a.type === t).map(a => opt(a.name, `${a.name} (AC ${a.ac}${a.maxFin != null && a.maxFin < 25 ? `, Finesse max ${a.maxFin}` : ''}${a.penalty ? `, penalty ${a.penalty}` : ''})`)).join('')}</optgroup>`).join('')}</select></label>
      <label><span class="cs-lbl">Shield</span><select data-bind="shield" id="f-shield" data-rerender="armor">${opt('', 'No shield')}${D.shields.map(s => opt(s.name, `${s.name} (+${s.ac} AC${s.penalty ? `, penalty ${s.penalty}` : ''})`)).join('')}</select></label>
      <label><span class="cs-lbl">Defensive weapons wielded</span>${numIn('defensiveWielded', 'id="f-defw" min="0" max="2"')}</label>
    </div>
    <div id="cs-armor-magic" class="cs-armor-magic"></div>
    <dl class="cs-dl">
      <div><dt>Armor Class</dt><dd>${brk('ac', 'Armor Class')}</dd></div>
      <div><dt>Armor penalty</dt><dd>${brk('pen', 'Armor penalty')}</dd></div>
    </dl>
    <p class="cs-note">The armor penalty comes off Balance, Heavy Object Interaction, Overpower, Sleight of Hand, Sneak, both Traverse skills, and the Lockpicking Kit.</p>
  </div>
</div>
<div class="cs-box">
  <div class="cs-h-row"><h3 class="cs-h">Weapons</h3><span class="cs-btnrow"><button type="button" class="cs-btn cs-btn-sm" data-forge="new">Forge a magic weapon</button><button type="button" class="cs-btn cs-btn-sm" data-act="add-weapon">Add weapon</button></span></div>
  <div id="cs-weapons" class="cs-weapons"></div>
</div>
<div class="cs-box">
  <div class="cs-h-row"><h3 class="cs-h">Conditions</h3><button type="button" class="cs-btn cs-btn-sm" data-act="clear-cond">Clear all</button></div>
  <div id="cs-conditions" class="cs-condgrid"></div>
</div>`;
    },
    skills() {
      return `
<div class="cs-box">
  <div class="cs-h-row"><h3 class="cs-h">Skills</h3><span class="cs-meter">${brk('ranks', 'Skill ranks')}<span data-out="ranksText"></span></span></div>
  <div class="cs-scroll"><table class="cs-table cs-skills">
    <thead><tr><th scope="col">Skill</th><th scope="col">Stat</th><th scope="col">Rank</th><th scope="col">Total</th><th scope="col"><span class="cs-sr">Roll</span></th></tr></thead>
    <tbody>${D.skills.map(sk => `<tr>
      <th scope="row"><button type="button" class="cs-linkbtn" data-info="skill:${esc(sk.name)}">${esc(sk.name)}</button>${sk.armorPenalty ? '<span class="cs-tag" title="Armor penalty applies">armor</span>' : ''}</th>
      <td class="cs-auto" data-out="skillStat.${esc(sk.name)}"></td>
      <td>${numIn(`skills.${sk.name}`, `id="sk-${sk.name.replace(/\W+/g, '-')}" min="0" aria-label="${esc(sk.name)} rank"`)}</td>
      <td><button type="button" class="cs-val" data-break="skill.${esc(sk.name)}" aria-label="${esc(sk.name)}: show the math">${out(`skillSigned.${esc(sk.name)}`)}</button></td>
      <td><button type="button" class="cs-btn cs-btn-sm cs-roll" data-roll="skill:${esc(sk.name)}" aria-label="Roll ${esc(sk.name)}">d20</button></td>
    </tr>`).join('')}</tbody>
  </table></div>
</div>
<div class="cs-grid2">
  <div class="cs-box">
    <div class="cs-h-row"><h3 class="cs-h">Tools</h3><button type="button" class="cs-btn cs-btn-sm" data-act="add-tool">Add tool</button></div>
    <div id="cs-tools"></div>
    <p class="cs-note">Tool checks add your Intelligence modifier and rank.</p>
  </div>
  <div class="cs-box">
    <h3 class="cs-h">Languages and proficiencies</h3>
    <label class="cs-stack"><span class="cs-lbl">Languages</span><textarea data-bind="languages" id="f-lang" rows="2"></textarea></label>
    <p class="cs-note" data-out="raceLang"></p>
    <label class="cs-stack"><span class="cs-lbl">Proficiencies</span><textarea data-bind="prof" id="f-prof" rows="3" placeholder="Weapons, armor, shields, tools"></textarea></label>
    <div class="cs-note" data-out-html="classProf"></div>
  </div>
</div>`;
    },
    magic() {
      return `
<div id="cs-casting" class="cs-casting"></div>
<div class="cs-box">
  <div class="cs-h-row"><h3 class="cs-h">Known spells</h3><span class="cs-meter" data-out="spellSlots"></span></div>
  <div class="cs-adder">
    <input id="add-spell" list="dl-spells" placeholder="Search 366 spells by name or school" autocomplete="off" aria-label="Spell to add">
    <select id="add-spell-tier" aria-label="Spell tier">${D.spellTiers.map(t => opt(t.name)).join('')}</select>
    <button type="button" class="cs-btn" data-act="add-spell">Add spell</button>
    <datalist id="dl-spells">${D.spells.map(s => `<option value="${esc(s[0])}">${esc(s[1])} · ${esc(s[2])}</option>`).join('')}</datalist>
  </div>
  <div id="cs-spells" class="cs-tiers"></div>
</div>
<div class="cs-box">
  <div class="cs-h-row"><h3 class="cs-h">Martial maneuvers</h3><span class="cs-meter" data-out="manSlots"></span></div>
  <div class="cs-adder">
    <input id="add-man" list="dl-man" placeholder="Search 96 maneuvers" autocomplete="off" aria-label="Maneuver to add">
    <select id="add-man-tier" aria-label="Maneuver tier">${D.maneuverTiers.map(t => opt(t.name)).join('')}</select>
    <button type="button" class="cs-btn" data-act="add-man">Add maneuver</button>
    <datalist id="dl-man">${D.maneuvers.map(m => `<option value="${esc(m[0])}">${esc(m[1])}</option>`).join('')}</datalist>
  </div>
  <div id="cs-mans" class="cs-tiers"></div>
  <p class="cs-note">Each Memory modifier point adds one spell or maneuver of your choice. Upcasting spends the higher tier's Mana. Maneuvers progress instead of upcasting, and a progressed maneuver keeps its slot.</p>
</div>`;
    },
    gear() {
      return `
<div class="cs-grid2">
  <div class="cs-box">
    <h3 class="cs-h">Magic items</h3>
    <div id="cs-items"></div>
  </div>
  <div class="cs-box">
    <div class="cs-h-row"><h3 class="cs-h">Rings</h3><button type="button" class="cs-btn cs-btn-sm" data-act="add-ring">Add ring slot</button></div>
    <div id="cs-rings"></div>
    <p class="cs-note">You wear 2 rings. Rituals in Lemara's church add more.</p>
    <div class="cs-h-row"><h3 class="cs-h">Attunement</h3><button type="button" class="cs-btn cs-btn-sm" data-act="add-misc">Add slot</button></div>
    <div id="cs-misc"></div>
    <p class="cs-note">Miscellaneous items need attunement, and magic weapons, armor, and shields count as Miscellaneous items. You start with 3 slots. Attuning takes 10 minutes.</p>
  </div>
</div>
<div class="cs-box">
  <div class="cs-h-row"><h3 class="cs-h">Inventory</h3><span class="cs-meter" data-out="carryText"></span>
    <span class="cs-btnrow">${CFG.siteLinks ? '<a class="cs-btn cs-btn-red cs-btn-sm" href="shops.html">Go shopping</a>' : ''}<button type="button" class="cs-btn cs-btn-sm" data-act="add-item">Add item</button></span></div>
  <div class="cs-purse"><span class="cs-lbl">Gold</span><span class="cs-gold" data-out="goldText"></span><span class="cs-note">Edit gold on the Character tab. Shop purchases take it from here.</span></div>
  <div class="cs-carry"><span data-out-style="carryPct"></span></div>
  <div id="cs-inventory"></div>
  <p class="cs-note">Stored items do not count toward carried weight. An equipped shield does. Equip puts a magic item in its slot and applies the bonuses its text names. Use spends one and rolls what it restores.</p>
</div>
<div class="cs-box">
  <div class="cs-h-row"><h3 class="cs-h">Purchase history</h3><button type="button" class="cs-btn cs-btn-sm cs-btn-quiet" data-act="clear-history">Clear history</button></div>
  <div id="cs-purchases"></div>
</div>`;
    },
    features() {
      return `
<div class="cs-grid2">
  <div class="cs-box"><h3 class="cs-h">Racial abilities</h3><div id="cs-race-feats"></div></div>
  <div class="cs-box">
    <h3 class="cs-h">Defenses</h3>
    <div id="cs-race-res" class="cs-note"></div>
    <div class="cs-h-row"><span class="cs-lbl">Resistances</span><button type="button" class="cs-btn cs-btn-sm" data-act="add-res">Add resistance</button></div>
    <div id="cs-res"></div>
    <label class="cs-stack"><span class="cs-lbl">Immunities (comma separated)</span><input data-bind="immune" id="f-immune" placeholder="Poison, Fearful"></label>
    <label class="cs-stack"><span class="cs-lbl">Vulnerabilities (comma separated)</span><input data-bind="vuln" id="f-vuln" placeholder="Fire"></label>
  </div>
</div>
<div class="cs-box">
  <div class="cs-h-row"><h3 class="cs-h">Class features</h3><label class="cs-check"><input type="checkbox" id="f-upcoming"> Show upcoming</label></div>
  <div id="cs-class-feats"></div>
</div>
<div class="cs-grid2">
  <div class="cs-box">
    <div class="cs-h-row"><h3 class="cs-h">Feats</h3><span class="cs-meter" data-out="featsText"></span></div>
    <div class="cs-adder">
      <input id="add-feat" list="dl-feats" placeholder="Search feats" autocomplete="off" aria-label="Feat to add">
      <button type="button" class="cs-btn" data-act="add-feat">Add feat</button>
      <datalist id="dl-feats">${D.feats.map(f => `<option value="${esc(f[0])}"></option>`).join('')}</datalist>
    </div>
    <div id="cs-feats"></div>
  </div>
  <div class="cs-box">
    <div class="cs-h-row"><h3 class="cs-h">Other features</h3><button type="button" class="cs-btn cs-btn-sm" data-act="add-feature">Add feature</button></div>
    <div id="cs-features"></div>
    <p class="cs-note">Give a feature a use limit and the rest buttons refresh it.</p>
  </div>
</div>`;
    },
    notes() {
      return `
<div class="cs-grid2">
  <div class="cs-box">
    <h3 class="cs-h">Reference art</h3>
    <div class="cs-art" id="cs-art"></div>
    <div class="cs-btnrow">
      <label class="cs-btn" for="f-art">Choose image</label>
      <input type="file" id="f-art" accept="image/*" hidden>
      <button type="button" class="cs-btn cs-btn-quiet" data-act="clear-art">Remove</button>
    </div>
    <p class="cs-note">The sheet shrinks the image to 600 px so it fits in browser storage.</p>
  </div>
  <div class="cs-box">
    <label class="cs-stack"><span class="cs-lbl">Appearance</span><textarea data-bind="notes.appearance" id="f-appear" rows="4"></textarea></label>
    <label class="cs-stack"><span class="cs-lbl">Allies and contacts</span><textarea data-bind="notes.allies" id="f-allies" rows="4"></textarea></label>
  </div>
</div>
<div class="cs-box">
  <label class="cs-stack"><span class="cs-lbl">Backstory</span><textarea data-bind="notes.backstory" id="f-back" rows="7"></textarea></label>
  <label class="cs-stack"><span class="cs-lbl">Session notes</span><textarea data-bind="notes.notes" id="f-notes" rows="9"></textarea></label>
</div>`;
    },
    bonuses() {
      const G = [
        ['Resources', [['health', 'Health'], ['pa', 'Physical Armor'], ['ma', 'Magical Armor'], ['ta', 'True Armor'], ['mana', 'Mana'], ['stamina', 'Stamina']]],
        ['Defense', [['ac', 'Armor Class'], ['finMax', 'Armor Finesse max'], ['armorPen', 'Armor penalty reduction'], ['save_evasion', 'Evasion'], ['save_body', 'Resistance (Body)'], ['save_mind', 'Resistance (Mind)']]],
        ['Other', [['init', 'Initiative'], ['crit', 'Critical Chance'], ['speed', 'Speed'], ['skillRanks', 'Skill ranks'], ['feats', 'Feats'], ['carry', 'Carrying capacity (kg)']]],
        ['Spells and maneuvers', [['dc0', 'Class 1 DC'], ['atk0', 'Class 1 attack'], ['dc1', 'Class 2 DC'], ['atk1', 'Class 2 attack']]],
      ];
      const rule = (key, label, opts, note) => `<div class="cs-rule"><label><span class="cs-lbl">${label}</span><select data-bind="rules.${key}" id="r-${key}" data-type="${typeof opts[0][0] === 'number' ? 'num' : ''}">${opts.map(o => opt(o[0], o[1])).join('')}</select></label><p class="cs-note">${note}</p></div>`;
      return `
<div class="cs-box">
  <h3 class="cs-h">Active effects</h3>
  <p class="cs-note">Bonuses the sheet applies by itself, from equipped magic items, class features, and Other features. Tap a number anywhere on the sheet to see where it comes from.</p>
  <div id="cs-fxlist"></div>
  <details class="cs-fxhelp"><summary>How to write an effect</summary>
    <p>One effect per line: a target, then <b>+</b>, <b>-</b> or <b>=</b>, then an amount. <b>=</b> means "at least": the value rises to that number if it is lower.</p>
    <ul>
      <li><code>Mana +5</code> · <code>Fortitude = 30</code> · <code>AC +2</code> · <code>Speed +1</code> · <code>Health +40</code></li>
      <li><code>Resist Fire +10</code> · <code>Resist All +10</code> · <code>Immune Cold</code> · <code>Vulnerable Fire</code></li>
      <li><code>Persuasion + level</code> · <code>Resistance (Mind) + Charisma modifier</code> · <code>Magical Armor = Physical Armor / 2</code> · <code>Fly = walk speed</code></li>
      <li>A choice: <code>Resist {Air|Cold|Fire} +10</code> or <code>Any Stat +10</code>. The sheet shows a menu.</li>
      <li>A situation: <code>AC +5 when wielding your chosen weapon</code>. The sheet shows a switch, off until you turn it on.</li>
      <li>Something the sheet cannot track: <code>Note: 30 meters of Dark Sight</code>.</li>
    </ul>
    <p>Targets: any stat, skill, or save, All Stats, All Skills, All Knowledge, All Saves, AC, Health, Mana, Stamina, Physical/Magical/True Armor, Speed, Fly/Swim/Climb/Burrow Speed, Initiative, Critical Chance, Attack, Damage, Melee or Ranged Attack and Damage, Spell Attack, Spell DC, Maneuver Attack, Maneuver DC, Skill Ranks, Feats, Carrying Capacity, Resist (any damage type, Physical, Magical, or All).</p>
    <p>Amounts can use level, class level, half level, any stat modifier or score, Physical Armor, Magical Armor, walk speed, + - * / and floor( ). Results round down.</p>
  </details>
</div>
<div class="cs-box">
  <h3 class="cs-h">Bonuses</h3>
  <p class="cs-note">These match the Cell Modifiers block on the Google Sheet. Weapon bonuses live on each weapon card.</p>
  ${G.map(([g, list]) => `<div class="cs-bonusgroup"><h4 class="cs-h4">${g}</h4><div class="cs-bonusgrid">${list.map(([k, l]) => `<label><span class="cs-lbl">${l}</span>${numIn('bonus.' + k, `id="b-${k}"`)}</label>`).join('')}</div></div>`).join('')}
</div>
<div class="cs-box">
  <h3 class="cs-h">Rules</h3>
  <p class="cs-note">The sheet follows the Basic Rules (revised November 3, 2026). Where the Google Sheet used a different formula, you can switch to it here. Each setting applies to this character only.</p>
  <div class="cs-rules">
    ${rule('armorMult', 'Physical and Magical Armor', [[5, '5 × modifier (Basic Rules)'], [10, '10 × modifier (Google Sheet)']], 'The Google Sheet multiplied the Fortitude and Intelligence modifiers by 10.')}
    ${rule('unarmored', 'Armor Class with no armor', [['ten', '10 + Finesse modifier (Basic Rules)'], ['fin', 'Finesse modifier only (Google Sheet)']], 'With the Basic Rules version, Robes (AC 5), Lamellar (8), and Shadowcloak (8) give less AC than wearing nothing.')}
    ${rule('initStat', 'Initiative', [['wits', 'd20 + Wits modifier (Basic Rules)'], ['fin', 'd20 + Finesse modifier (Google Sheet)']], 'Initiative rolls use this stat.')}
    ${rule('survivalStat', 'Survival skill', [['wits', 'Wits (Basic Rules)'], ['fin', 'Finesse (Google Sheet)']], 'The skills table lists Survival under Wits.')}
    ${rule('critBase', 'Critical Chance', [['score', 'Wits score (Basic Rules)'], ['base', 'Wits base only (Google Sheet)']], 'The Google Sheet read the Base column, so class and leveling bonuses did not raise it.')}
    ${rule('weaponStat', 'Weapon attack stat', [['best', 'Higher of Strength or Finesse (Basic Rules)'], ['traits', 'Finesse for Light and Ranged (Finesse), else Strength']], 'Sheet Formulas says the higher stat. The Light trait says Finesse replaces Strength. Each weapon card can also pick a stat.')}
    ${rule('raceStats', 'Racial stat bonuses', [[true, 'Add automatically'], [false, 'I include them in Base']], 'The Google Sheet had no race column, so players typed racial bonuses into Base.')}
    ${rule('manAtkLevel', 'Maneuver attack', [[false, 'Stat modifier only (Google Sheet)'], [true, 'Stat modifier + level']], 'The Basic Rules do not say. Spell attacks add level on both versions.')}
  </div>
</div>`;
    },
  };

  // ------------------------------------------------------------------ dynamic renders
  function renderRoster() {
    const sel = $('#cs-roster');
    sel.innerHTML = roster.order.map(id => {
      const c = roster.chars[id];
      const k = activeClasses(c).map(x => `${x.name} ${x.level}`).join(' / ');
      return opt(id, `${c.name || 'Unnamed character'}${k ? ' · ' + k : ''}`, roster.active);
    }).join('');
  }
  function renderRaceChoices() {
    const c = char();
    const r = RACE[c.race];
    const box = $('#cs-race-choices');
    if (!r) { box.innerHTML = ''; return; }
    let h = '';
    if (r.previousRace) {
      h += `<label><span class="cs-lbl">Previous race</span><select data-bind="prevRace" id="f-prevrace" data-rerender="race">${opt('', 'Choose')}${D.races.filter(x => !x.previousRace).map(x => opt(x.name)).join('')}</select></label>`;
    }
    const src = raceInfo(c).statSrc;
    if (src) src.choices.forEach((ch, i) => {
      h += `<label><span class="cs-lbl">${src.name}: +${ch.value} to</span><select data-bind="raceChoice.c${i}" id="f-rc${i}">${opt('', 'Choose a stat')}${ch.options.map(k => opt(k, STAT[k].name)).join('')}</select></label>`;
    });
    if (r.resistChoice) {
      h += `<label><span class="cs-lbl">Resistance ${r.resistChoice.value} to</span><select data-bind="raceResist" id="f-rres">${opt('', 'Choose')}${r.resistChoice.options.map(t => opt(t)).join('')}</select></label>`;
    }
    if (r.auto.adaptations) [0, 1].forEach(i => {
      h += `<label><span class="cs-lbl">Adaptation ${i + 1}</span><select data-bind="adaptations.${i}" id="f-adapt${i}" data-rerender="race">${opt('', 'Choose')}${r.auto.adaptations.map(a => opt(a.name, `${a.name}: ${a.text}`)).join('')}</select></label>`;
    });
    if (r.auto.hunt) h += `<label class="cs-check"><input type="checkbox" data-bind="hunt" id="f-hunt" data-type="bool" data-rerender="hunt"> The Hunt is active</label>`;
    h += `<p class="cs-note">${esc(r.statsText)} · ${esc(r.size)} · ${esc(r.speedText)} · ${esc(r.type)}</p>`;
    box.innerHTML = h;
    fillInputs(box);
  }
  function renderClassFacts() {
    const c = char();
    const box = $('#cs-class-facts');
    const ks = activeClasses(c);
    box.innerHTML = ks.map(k => {
      const cl = k.cls;
      return `<p><b>${link(k.name, cl.page)}</b>: d${cl.hitDie} hit die (${cl.hitDie / 2 + 1} Health per level) · ${cl.resource === 'mana' ? 'Mana' : 'Stamina'} ${cl.resourceTable[k.level - 1]} · ${cl.slots[k.level - 1]} ${cl.slotType} slots · primary ${STAT[cl.primary].name}, secondary ${STAT[cl.secondary].name} · saves: Evasion ${cl.saves.evasion}, Body ${cl.saves.body}, Mind ${cl.saves.mind}</p>`;
    }).join('') || '<p>Choose a class to see its hit die, Mana or Stamina, slots, and saves.</p>';
  }
  function renderClassSelects() {
    renderClassFacts();
    const c = char();
    [0, 1].forEach(i => {
      const cls = D.classes[c.classes[i].name];
      const sel = $(`#f-sub${i}`);
      const subs = cls ? Object.keys(cls.subclasses) : [];
      sel.innerHTML = opt('', cls ? 'Choose a subclass' : '—') + subs.map(s => opt(s)).join('');
      sel.disabled = !cls;
      sel.value = c.classes[i].sub || '';
    });
  }
  function renderWeapons(d) {
    const c = char();
    const traitsOpts = D.damageTypes.physical.concat(D.damageTypes.magical, D.damageTypes.alignment);
    $('#cs-weapons').innerHTML = c.weapons.map((w, i) => {
      const wc = d.weapon[i];
      const data = wc && wc.data;
      const custom = w.item === '__custom';
      return `<article class="cs-weapon">
        <div class="cs-weapon-top">
          <select data-bind="weapons.${i}.item" id="w${i}-item" data-rerender="weapons" aria-label="Weapon ${i + 1}">${opt('', 'Choose a weapon')}${D.weapons.map(x => opt(x.name, `${x.name} · ${x.die}`)).join('')}${opt('__custom', 'Custom weapon…')}</select>
          ${data ? `<button type="button" class="cs-btn cs-btn-sm cs-forge-btn" data-forge="w:${i}">${wc.stored ? 'Magic' : 'Enchant'}</button>` : ''}
          <button type="button" class="cs-x" data-del="weapons.${i}" aria-label="Remove weapon">×</button>
        </div>
        ${data && (wc.stored || wc.chosen) ? `<p class="cs-wtitle">${esc(wc.title)}${wc.chosen ? '<span class="cs-tag cs-tag-chosen">Chosen weapon</span>' : ''}${wc.stored && !wc.attuned ? '<span class="cs-tag cs-tag-off">Not attuned</span>' : ''}</p>` : ''}
        ${data && wc.stored && !wc.attuned ? '<p class="cs-note">The magic is off until you attune this weapon. Each magic weapon, armor, or shield takes an attunement slot.</p>' : ''}
        ${data && wc.wrongBase ? `<p class="cs-note">This weapon's +${esc(w.magic.bonus)} enchantment belongs to ${esc((WEAPON[w.magic.base] || {}).name || 'another weapon')}. Pick it again to use the magic.</p>` : ''}
        ${custom ? `<div class="cs-form cs-form-inline">
          <label><span class="cs-lbl">Name</span><input data-bind="weapons.${i}.name" id="w${i}-name"></label>
          <label class="cs-narrow"><span class="cs-lbl">Damage die</span><input data-bind="weapons.${i}.die" id="w${i}-die" placeholder="1d8" data-rerender="weapons"></label>
          <label class="cs-narrow"><span class="cs-lbl">Range (m)</span><input data-bind="weapons.${i}.range" id="w${i}-range"></label>
          <label><span class="cs-lbl">Traits</span><input data-bind="weapons.${i}.traits" id="w${i}-traits" placeholder="Light, Deadly I" data-rerender="weapons"></label>
        </div>` : ''}
        ${data ? `
        <div class="cs-weapon-stats">
          <div><span class="cs-lbl">Attack</span><button type="button" class="cs-val big" data-break="weapon.${i}.atk" aria-label="Attack bonus: show the math">${sign(wc.atk.total)}</button></div>
          <div><span class="cs-lbl">Damage</span><button type="button" class="cs-val big" data-break="weapon.${i}.dmg" aria-label="Damage: show the math">${esc(data.die)} ${sign(wc.dmg.total)}</button></div>
          <div><span class="cs-lbl">Type</span><select data-bind="weapons.${i}.type" id="w${i}-type" data-rerender="weapons" aria-label="Damage type">${opt('', data.custom ? 'Slashing' : (WEAPON[w.item] || {}).type)}${traitsOpts.map(t => opt(t)).join('')}</select></div>
          <div><span class="cs-lbl">Range</span><span class="cs-plain">${esc(rangeText(data))}</span></div>
          ${wc.deadly.total || wc.critW.total !== d.crit.total || wc.decisive.total !== 3 ? `<div><span class="cs-lbl">Decisive range</span><button type="button" class="cs-val" data-break="weapon.${i}.deadly" aria-label="Decisive range: show the math">${wc.decFrom}–20</button></div>
          <div><span class="cs-lbl">Critical Chance</span><button type="button" class="cs-val" data-break="weapon.${i}.critW" aria-label="Critical Chance: show the math">${wc.critW.total >= 100 ? 'Always' : wc.critW.total}</button></div>` : ''}
          ${wc.ench.total ? `<div><span class="cs-lbl">Enchanted</span><button type="button" class="cs-val" data-break="weapon.${i}.ench" aria-label="Enchanted: show the math">${roman(wc.ench.total)} · ignores ${wc.ench.total * ENCH_RES}</button></div>` : ''}
        </div>
        <div class="cs-traits">${(data.traits || []).map(t => `<button type="button" class="cs-chip" data-info="trait:${esc(t)}">${esc(t)}</button>`).join('') || (wc.stored ? '' : '<span class="cs-note">No traits</span>')}${wc.stored ? magicChips(wc.stored, 'weapon', `weapons.${i}.magic`, !wc.attuned) : ''}</div>
        ${wc.extra.length || wc.vs.length || wc.ignore.length ? `<ul class="cs-wmagic">${wc.extra.map(e => `<li>+${esc(e.dice)} ${esc(e.type)} damage <small>${esc(e.src)}</small></li>`).join('')}${wc.vs.map(e => `<li>+${esc(e.dice)}${e.type ? ' ' + esc(e.type) : ''} damage against ${esc(e.vs)} <small>${esc(e.src)}</small></li>`).join('')}${wc.ignore.map(t => `<li>${esc(t)}</li>`).join('')}</ul>` : ''}
        ${(() => { const fl = (d.fxList || []).filter(x => x.path === `weapons.${i}`); return fl.length ? `<div class="cs-fxrow">${fl.map(fxChip).join('')}</div>` : ''; })()}
        <div class="cs-form cs-form-inline">
          <label class="cs-check"><input type="checkbox" data-bind="weapons.${i}.prof" id="w${i}-prof" data-type="bool" data-rerender="weapons"> Proficient</label>
          <label class="cs-check"><input type="checkbox" data-bind="weapons.${i}.inHand" id="w${i}-hand" data-rerender="weaponfx"> In hand</label>
          ${wc.stored ? `<label class="cs-check"><input type="checkbox" data-bind="weapons.${i}.magic.attuned" id="w${i}-attuned" data-rerender="attune"> Attuned</label>` : ''}
          ${d.usesChosen || w.chosen ? `<label class="cs-check"><input type="checkbox" data-bind="weapons.${i}.chosen" id="w${i}-chosen" data-rerender="weaponfx"> Chosen weapon</label>` : ''}
          <label><span class="cs-lbl">Stat</span><select data-bind="weapons.${i}.stat" id="w${i}-stat" data-rerender="weapons">${opt('auto', `Auto (${STAT[wc.stat].name})`)}${opt('str', 'Strength')}${opt('fin', 'Finesse')}</select></label>
          <label class="cs-narrow"><span class="cs-lbl">Attack bonus</span>${numIn(`weapons.${i}.atk`, `id="w${i}-atkb" data-rerender="weapons"`)}</label>
          <label class="cs-narrow"><span class="cs-lbl">Damage bonus</span>${numIn(`weapons.${i}.dmg`, `id="w${i}-dmgb" data-rerender="weapons"`)}</label>
        </div>
        ${wc.needsSkilled && !w.prof ? '<p class="cs-note cs-bad">Skilled weapon: you need skilled weapon proficiency.</p>' : ''}
        <div class="cs-btnrow cs-atkrow">
          <button type="button" class="cs-btn cs-btn-red" data-attack="${i}">Attack</button>
          <button type="button" class="cs-btn cs-btn-sm" data-damage="${i}:1">Damage</button>
          <button type="button" class="cs-btn cs-btn-sm" data-damage="${i}:2">Crit ×2</button>
          <button type="button" class="cs-btn cs-btn-sm" data-damage="${i}:3">Decisive ×${wc.decisive.total}</button>
        </div>
        <input class="cs-inline-note" data-bind="weapons.${i}.notes" id="w${i}-notes" placeholder="Notes" aria-label="Weapon notes">` : ''}
      </article>`;
    }).join('') || '<p class="cs-note">No weapons yet.</p>';
    fillInputs($('#cs-weapons'));
  }
  function rowList(sel, key, fields, empty) {
    const c = char();
    const arr = getPath(c, key) || [];
    $(sel).innerHTML = arr.length ? `<div class="cs-rows">${arr.map((it, i) => `<div class="cs-row">${fields(it, i)}<button type="button" class="cs-x" data-del="${key}.${i}" aria-label="Remove">×</button></div>`).join('')}</div>` : `<p class="cs-note">${empty}</p>`;
    fillInputs($(sel));
  }
  function renderTools(d) {
    rowList('#cs-tools', 'tools', (t, i) => `
      <select data-bind="tools.${i}.name" id="t${i}-name" aria-label="Tool">${opt('', 'Choose a tool')}${D.tools.map(x => opt(x)).join('')}</select>
      <label class="cs-narrow"><span class="cs-lbl">Rank</span>${numIn(`tools.${i}.rank`, `id="t${i}-rank" min="0"`)}</label>
      <button type="button" class="cs-val" data-break="tool.${i}" aria-label="Tool total: show the math">${d.tool[i] ? sign(d.tool[i].total) : '+0'}</button>
      <button type="button" class="cs-btn cs-btn-sm" data-roll="tool:${i}" aria-label="Roll tool check">d20</button>`, 'No tools yet.');
  }
  function renderTierList(sel, key, tiers, d, resource) {
    const c = char();
    const list = c[key];
    $(sel).innerHTML = tiers.map(t => {
      const open = d.tierOpen(t);
      const items = list.map((s, i) => [s, i]).filter(([s]) => s.tier === t.name);
      return `<div class="cs-tier${open ? '' : ' locked'}">
        <div class="cs-tier-head"><span class="cs-tier-name">${t.name}</span><span class="cs-tier-cost">${t.cost} ${resource}</span>${open ? '' : `<span class="cs-tag">Unlocks at level ${t.level}</span>`}</div>
        ${items.length ? `<ul class="cs-tier-list">${items.map(([s, i]) => `<li>
          <span class="cs-spell-name">${link(s.name, s.href)}${s.school ? `<small>${esc(s.school)}</small>` : ''}</span>
          <input class="cs-inline-note" data-bind="${key}.${i}.notes" id="${key}${i}-notes" placeholder="Notes" aria-label="Notes for ${esc(s.name)}">
          ${key === 'spells' ? `<select data-cast-tier="${i}" aria-label="Cast at tier">${tiers.filter(x => d.tierOpen(x) && x.cost >= t.cost).map(x => opt(x.name, x.name === t.name ? `${x.name}` : `Upcast to ${x.name}`)).join('') || opt(t.name)}</select>` : ''}
          <button type="button" class="cs-btn cs-btn-sm" data-${key === 'spells' ? 'cast' : 'use'}="${i}">${key === 'spells' ? 'Cast' : 'Use'}</button>
          <button type="button" class="cs-x" data-del="${key}.${i}" aria-label="Remove ${esc(s.name)}">×</button></li>`).join('')}</ul>` : ''}
      </div>`;
    }).join('');
    fillInputs($(sel));
  }
  function renderCasting(d) {
    const box = $('#cs-casting');
    if (!d.cast.length) { box.innerHTML = '<div class="cs-box"><p class="cs-note">Pick a class to see your spell and maneuver DCs.</p></div>'; return; }
    box.innerHTML = d.cast.map(k => `<div class="cs-box cs-castcard">
      <h3 class="cs-h">${esc(k.name)} ${k.isSpell ? 'spellcasting' : 'maneuvers'}</h3>
      <dl class="cs-dl">
        <div><dt>${k.isSpell ? 'Spell DC' : 'Maneuver DC'}</dt><dd><button type="button" class="cs-val big" data-break="cast.${d.cast.indexOf(k)}.dc">${k.dc.total}</button></dd></div>
        <div><dt>${k.isSpell ? 'Spell attack' : 'Maneuver attack'}</dt><dd><button type="button" class="cs-val big" data-roll="cast:${d.cast.indexOf(k)}" aria-label="Roll attack">${sign(k.atk.total)}</button><button type="button" class="cs-why" data-break="cast.${d.cast.indexOf(k)}.atk">math</button></dd></div>
        <div><dt>Casting stat</dt><dd class="cs-plain">${STAT[k.stat].name}</dd></div>
        <div><dt>${k.isSpell ? 'Mana' : 'Stamina'}</dt><dd class="cs-plain">${curOf(k.isSpell ? 'mana' : 'stamina', d)} / ${d[k.isSpell ? 'mana' : 'stamina'].total}</dd></div>
      </dl></div>`).join('');
  }
  function magicChips(mg, kind, path, off) {
    return mg.list.map(x => `<button type="button" class="cs-chip cs-mchip${off ? ' cs-mchip-off' : ''}" data-info="mtrait:${esc(kind)}|${esc(x.t.name)}|${esc(path)}">${esc(traitLabel(x))}${x.pick ? ` (${esc(x.pick)})` : ''}</button>`).join('');
  }
  function renderArmorMagic(d) {
    const box = $('#cs-armor-magic');
    if (!box) return;
    const c = char();
    const row = (slot, key, TABLE, sm, mg) => {
      if (!TABLE[c[slot]]) return '';
      const stored = c[key];
      const wrong = stored && n(stored.bonus) > 0 && stored.base !== c[slot];
      const fl = (d.fxList || []).filter(x => x.path === key);
      return `<div class="cs-amagic${mg ? ' on' : ''}">
        <div class="cs-amagic-head"><span class="cs-amagic-name">${esc(magicTitle(sm, c[slot]))}${sm && !mg ? '<span class="cs-tag cs-tag-off">Not attuned</span>' : ''}</span>
          <button type="button" class="cs-btn cs-btn-sm" data-forge="${slot}">${sm ? 'Magic' : 'Enchant'}</button></div>
        ${sm ? `<div class="cs-traits"><span class="cs-chip cs-bchip ${mg ? 'on' : 'cs-fx-off'}">AC and saves +${sm.bonus}</span>${magicChips(sm, 'armor', key, !mg)}</div>
        <label class="cs-check"><input type="checkbox" data-bind="${key}.attuned" id="f-${key}-attuned" data-rerender="attune"> Attuned</label>` : ''}
        ${fl.length ? `<div class="cs-fxrow">${fl.map(fxChip).join('')}</div>` : ''}
        ${wrong ? `<p class="cs-note">Your +${esc(stored.bonus)} enchantment is on the ${esc(stored.base)}. Pick it again to use the magic.</p>` : ''}
      </div>`;
    };
    box.innerHTML = row('armor', 'armorMagic', ARMOR, d.armorMagicStored, d.armorMagic) + row('shield', 'shieldMagic', SHIELD, d.shieldMagicStored, d.shieldMagic);
    fillInputs(box);
  }
  // One effect as a chip, plus its choice menu or on/off switch.
  function fxChip(x) {
    const cls = { on: 'on', off: 'cs-fx-off', choose: 'cs-fx-choose', error: 'cs-fx-err' }[x.status] || '';
    const title = esc(x.raw + (x.when ? '' : ''));
    let h = `<span class="cs-chip cs-bchip ${cls}" title="${title}">${esc(x.status === 'off' || x.scoped ? x.raw.replace(/\s+(?:when|while)\s+.*$/i, '').replace(/\{[^}]*\}/g, '(choose)') : x.text)}</span>`;
    if (x.choice) h += `<select class="cs-fx-pick" data-bind="fxPick.${x.id}" data-rerender="fx" aria-label="Choose for ${esc(x.label)}">${opt('', 'Choose')}${x.choice.map(o => opt(o.label)).join('')}</select>`;
    if (x.when && x.scoped) h += `<span class="cs-fx-auto">On the matching weapon: ${esc(x.when)}</span>`;
    else if (x.when && x.auto) h += `<span class="cs-fx-auto ${x.status === 'off' ? '' : 'on'}">${x.status === 'off' ? 'Inactive' : 'Active'}: ${esc(x.when)}</span>`;
    else if (x.when) h += `<label class="cs-check cs-fx-when"><input type="checkbox" data-bind="fxOn.${x.id}" data-rerender="fx"> ${esc(x.when)}</label>`;
    return `<span class="cs-fx">${h}</span>`;
  }
  function renderItems() {
    const c = char();
    const fxd = compute(c);
    const slot = (path, label) => {
      const e = getPath(c, path) || {};
      const id = path.replace(/\./g, '-');
      const bon = e.bonuses || [];
      const fromData = !!itemFx(e);
      const fl = (fxd.fxList || []).filter(x => x.path === path);
      return `<div class="cs-slotwrap${e.name ? ' filled' : ''}"><div class="cs-slot"><span class="cs-lbl">${label}</span>
      <input data-bind="${path}.name" id="${id}-name" placeholder="Empty" aria-label="${label} item">
      <select data-bind="${path}.power" id="${id}-power" aria-label="${label} power">${opt('', 'Power')}${D.itemPowers.map(p => opt(p)).join('')}</select>
      <input data-bind="${path}.notes" id="${id}-notes" placeholder="Effect" aria-label="${label} effect"></div>
      ${e.name ? `<div class="cs-slot-tools">
        ${fl.map(fxChip).join('')}
        ${bon.filter(b => !fromData || b.manual).map(b => `<span class="cs-chip on cs-bchip">${esc(BONUS_LABEL[b.key] || b.key)} ${sign(n(b.value))}</span>`).join('')}
        ${e.desc ? `<button type="button" class="cs-why" data-info="slot:${path}">Effect</button>` : ''}
        <button type="button" class="cs-why" data-bedit="${path}" aria-expanded="false">Bonuses</button>
        <button type="button" class="cs-why" data-unequip="${path}">Unequip</button>
      </div>
      <div class="cs-bedit" id="${id}-bedit" hidden>
        ${bon.map((b, j) => `<div class="cs-brow"><select data-bind="${path}.bonuses.${j}.key" id="${id}-b${j}k" data-rerender="items" aria-label="Bonus to">${BONUS_KEYS.map(([k2, l2]) => opt(k2, l2)).join('')}</select>
          ${numIn(`${path}.bonuses.${j}.value`, `id="${id}-b${j}v" data-rerender="items" aria-label="Amount"`)}
          <button type="button" class="cs-x" data-del="${path}.bonuses.${j}" aria-label="Remove bonus">×</button>${fromData && !b.manual ? '<span class="cs-note">replaced by the item\'s effects</span>' : ''}</div>`).join('')}
        <button type="button" class="cs-btn cs-btn-sm" data-addbonus="${path}">Add bonus</button>
        <label class="cs-stack"><span class="cs-lbl">${fromData ? 'Extra effects' : 'Effects'}, one per line</span>
          <textarea data-bind="${path}.fx" id="${id}-fx" rows="2" data-rerender="items" placeholder="Mana +5&#10;Resist Fire +10" aria-label="${label} effects"></textarea></label>
        ${fromData ? `<p class="cs-note">This item's effects come from the shop list: ${esc(itemFx(e).join(' · '))}</p>` : ''}
      </div>` : ''}</div>`;
    };
    $('#cs-items').innerHTML = D.itemSlots.map(s => slot(`items.${s}`, s)).join('');
    $('#cs-rings').innerHTML = c.rings.map((r, i) => slot(`rings.${i}`, `Ring ${i + 1}`)).join('');
    const gear = attunedGear(c), au = attuneUse(c);
    let gi = 0;
    const gearSlot = (g, i) => `<div class="cs-slotwrap filled cs-gearslot${i < 0 ? ' over' : ''}"><div class="cs-slot"><span class="cs-lbl">${i < 0 ? 'No slot' : `Slot ${i + 1}`}</span>
      <span class="cs-gear-name">${esc(g.label)}</span><span class="cs-gear-where">${esc(g.where)}</span>
      <button type="button" class="cs-why" data-unattune="${esc(g.path)}">Unattune</button></div></div>`;
    $('#cs-misc').innerHTML = `<p class="cs-note cs-attune-count${au.used > au.slots ? ' cs-bad' : ''}">${au.used} of ${au.slots} slots used${au.gear ? `, ${au.gear} by magic weapons or armor` : ''}.${au.used > au.slots ? ' Unattune an item or add a slot.' : ''}</p>`
      + c.misc.map((r, i) => ((!r || !r.name) && gi < gear.length ? gearSlot(gear[gi++], i) : slot(`misc.${i}`, `Slot ${i + 1}`))).join('')
      + gear.slice(gi).map(g => gearSlot(g, -1)).join('');
    fillInputs($('#cs-items')); fillInputs($('#cs-rings')); fillInputs($('#cs-misc'));
    openEditors.forEach(path => { const box = document.getElementById(path.replace(/\./g, '-') + '-bedit'); if (box) { box.hidden = false; const b = $(`[data-bedit="${path}"]`); if (b) b.setAttribute('aria-expanded', 'true'); } });
  }
  const openEditors = new Set();
  function renderPurchases() {
    const c = char();
    const list = (c.purchases || []).slice(-25).reverse();
    $('#cs-purchases').innerHTML = list.length ? `<ul class="cs-hist">${list.map(p => `<li><span>${esc(new Date(p.t).toLocaleDateString())}</span><span>${p.qty > 1 ? esc(p.qty) + ' × ' : ''}${esc(p.name)} <small>${esc(p.shop || '')}</small></span><strong>${esc(Number(p.cost || 0).toLocaleString('en-US'))} GP</strong></li>`).join('')}</ul>`
      : `<p class="cs-note">Nothing bought yet.${CFG.siteLinks ? ' Open the <a href="shops.html">shops</a> and press Buy.' : ''}</p>`;
  }
  function renderInventory() {
    const c = char();
    const box = $('#cs-inventory');
    if (!c.inventory.length) { box.innerHTML = '<p class="cs-note">Your pack is empty.</p>'; return; }
    const toolNames = D.tools.map(t => t.toLowerCase());
    box.innerHTML = `<div class="cs-inv cs-inv-head" aria-hidden="true"><span>Item</span><span>Qty</span><span>kg each</span><span>Where</span><span>Notes</span><span></span><span></span></div>` +
      c.inventory.map((it, i) => {
        const acts = [];
        if (it.desc) acts.push(`<button type="button" class="cs-why" data-info="inv:${i}">Info</button>`);
        if (it.kind === 'magic' || it.kind === 'weapon' || it.kind === 'armor' || it.kind === 'shield') acts.push(`<button type="button" class="cs-btn cs-btn-sm cs-btn-red" data-equip="${i}">Equip</button>`);
        if (it.kind === 'consumable') acts.push(`<button type="button" class="cs-btn cs-btn-sm cs-btn-red" data-use="${i}">Use</button>`);
        if (toolNames.includes(String(it.name || '').toLowerCase()) && !(c.tools || []).some(t => String(t.name).toLowerCase() === String(it.name).toLowerCase())) acts.push(`<button type="button" class="cs-btn cs-btn-sm" data-totool="${i}">Add to Tools</button>`);
        const tag = it.kind ? `<span class="cs-tag cs-kind">${esc(KIND_LABEL[it.kind] || it.kind)}${it.slot ? ' · ' + esc(normSlot(it.slot)) : ''}</span>` : '';
        return `<div class="cs-inv">
      <div class="cs-inv-name"><input data-bind="inventory.${i}.name" id="inv${i}-name" placeholder="Item" aria-label="Item name">${tag}</div>
      ${numIn(`inventory.${i}.qty`, `id="inv${i}-qty" min="0" aria-label="Quantity"`)}
      <input type="number" inputmode="decimal" step="0.1" min="0" class="cs-num" data-bind="inventory.${i}.kg" data-type="float" id="inv${i}-kg" aria-label="Kilograms each">
      <select data-bind="inventory.${i}.where" id="inv${i}-where" aria-label="Where">${['Carried', 'Pack', 'Stored'].map(x => opt(x)).join('')}</select>
      <input data-bind="inventory.${i}.notes" id="inv${i}-notes" placeholder="Notes" aria-label="Item notes">
      <div class="cs-inv-acts">${acts.join('')}</div>
      <button type="button" class="cs-x" data-del="inventory.${i}" aria-label="Remove item">×</button></div>`; }).join('');
    fillInputs(box);
  }
  function renderResists(d) {
    const c = char();
    const r = d.race;
    let raceTxt = '';
    if (r) {
      const parts = r.resist.map(x => `${x.type} ${x.value}`);
      if (r.resistChoice) parts.push(c.raceResist ? `${c.raceResist} ${r.resistChoice.value}` : `choose a type on the Character tab`);
      raceTxt = parts.length ? `${esc(r.name)} resistance: ${esc(parts.join(', '))}` : `${esc(r.name)}: no racial resistance.`;
    }
    const tot = Object.keys(d.resist).filter(t => d.resist[t]).sort().map(t => `${esc(t)} ${d.resist[t]}`);
    const fxImm = (d.fxImmune || []).length ? `<br>From effects, immune to: ${esc(d.fxImmune.join(', '))}` : '';
    const fxVul = (d.fxVuln || []).length ? `<br>From effects, vulnerable to: ${esc(d.fxVuln.join(', '))}` : '';
    $('#cs-race-res').textContent = '';
    $('#cs-race-res').innerHTML = raceTxt + (tot.length ? `<br><b>Total resistance:</b> ${tot.join(' · ')}` : '') + fxImm + fxVul;
    rowList('#cs-res', 'resist', (x, i) => `
      <select data-bind="resist.${i}.type" id="res${i}-type" aria-label="Damage type">${opt('', 'Type')}${ALL_DMG.concat(['True']).map(t => opt(t)).join('')}</select>
      <label class="cs-narrow"><span class="cs-lbl">Amount</span>${numIn(`resist.${i}.value`, `id="res${i}-val" min="0"`)}</label>
      <input data-bind="resist.${i}.src" id="res${i}-src" placeholder="Source" aria-label="Source" class="cs-grow">`, 'No other resistances.');
  }
  function renderFeatures(d) {
    const c = char();
    const r = d.race;
    $('#cs-race-feats').innerHTML = r ? r.abilities.map(a => `<div class="cs-feat"><h4>${esc(a.name)}</h4><p>${a.text.charAt(0).toUpperCase() + a.text.slice(1)}</p></div>`).join('') +
      adaptations(c).map(a => `<div class="cs-feat"><h4>${esc(a.name)}</h4><p>${esc(a.text)}</p></div>`).join('') : '<p class="cs-note">Choose a race on the Character tab.</p>';
    const showAll = $('#f-upcoming') && $('#f-upcoming').checked;
    $('#cs-class-feats').innerHTML = d.cls.length ? d.cls.map(kc => {
      const list = kc.cls.features.map(f => Object.assign({ src: kc.name }, f));
      const sub = kc.sub && kc.cls.subclasses[kc.sub] ? kc.cls.subclasses[kc.sub].map(f => Object.assign({ src: kc.sub }, f)) : [];
      const all = list.concat(sub).sort((a, b) => a.level - b.level);
      const shown = all.filter(f => showAll || f.level <= kc.level);
      return `<div class="cs-classfeats"><h4 class="cs-h4">${link(kc.name, kc.cls.page)} ${kc.level}${kc.sub ? ` · ${esc(kc.sub)}` : ' · <span class="cs-note">no subclass chosen</span>'}</h4>
        ${shown.map(f => {
          const fl = (d.fxList || []).filter(x => x.src === `${f.src} ${f.level}` && x.label === f.name);
          const locked = f.level > kc.level;
          const chips = locked ? fxLines(f.effects).map(r2 => `<span class="cs-chip cs-bchip cs-fx-off">${esc(r2)}</span>`).join('') : fl.map(fxChip).join('');
          return `<details class="cs-feat${locked ? ' locked' : ''}"><summary><span class="cs-lvl">Lv ${f.level}</span> ${esc(f.name)} <small>${esc(f.src)}</small>${fl.some(x => x.status === 'choose') ? ' <span class="cs-chip cs-bchip cs-fx-choose">choose</span>' : ''}</summary>${chips ? `<div class="cs-fxrow">${chips}</div>` : ''}<p>${esc(f.text).replace(/\n/g, '<br>')}</p></details>`;
        }).join('') || '<p class="cs-note">No features yet.</p>'}
      </div>`;
    }).join('') : '<p class="cs-note">Pick a class to list its features.</p>';
    fillInputs($('#cs-class-feats'));
    rowList('#cs-feats', 'feats', (f, i) => `<span class="cs-grow cs-spell-name">${link(f.name, f.href)}</span>
      <input data-bind="feats.${i}.notes" id="feat${i}-notes" placeholder="Choice or notes" aria-label="Feat notes" class="cs-grow">`, 'No feats yet.');
    rowList('#cs-features', 'features', (f, i) => `<div class="cs-featedit">
      <input data-bind="features.${i}.name" id="fe${i}-name" placeholder="Feature name" aria-label="Feature name">
      <textarea data-bind="features.${i}.text" id="fe${i}-text" rows="2" placeholder="What it does" aria-label="Feature text"></textarea>
      <textarea data-bind="features.${i}.fx" id="fe${i}-fx" rows="1" data-rerender="fx" placeholder="Effects, one per line: Mana +5" aria-label="Feature effects"></textarea>
      ${(() => { const fl = (d.fxList || []).filter(x => x.src === 'Feature' && x.id.startsWith(fxId('feat', i) + '|')); return fl.length ? `<div class="cs-fxrow">${fl.map(fxChip).join('')}</div>` : ''; })()}
      <div class="cs-form-inline">
        <label class="cs-narrow"><span class="cs-lbl">Used</span>${numIn(`features.${i}.uses`, `id="fe${i}-uses" min="0"`)}</label>
        <label class="cs-narrow"><span class="cs-lbl">Max</span>${numIn(`features.${i}.max`, `id="fe${i}-max" min="0"`)}</label>
        <select data-bind="features.${i}.reset" id="fe${i}-reset" aria-label="Refreshes on">${opt('full', 'Full rest')}${opt('partial', 'Partial rest')}${opt('none', 'Never')}</select>
      </div></div>`, 'Add items, boons, or GM rulings here.');
  }
  function renderConditions() {
    const c = char();
    $('#cs-conditions').innerHTML = D.conditions.map(k => `<div class="cs-cond${c.conditions.includes(k.name) ? ' on' : ''}">
      <button type="button" class="cs-cond-tog" data-cond="${esc(k.name)}" aria-pressed="${c.conditions.includes(k.name)}">${esc(k.name)}</button>
      <button type="button" class="cs-why" data-info="cond:${esc(k.name)}" aria-label="What ${esc(k.name)} does">?</button></div>`).join('');
    $('#cs-cond-chips').innerHTML = c.conditions.map(x => `<button type="button" class="cs-chip on" data-info="cond:${esc(x)}">${esc(x)}</button>`).join('');
  }
  function renderDying(d) {
    const c = char();
    const box = $('#cs-dying');
    const hp = curOf('hp', d);
    const dying = c.conditions.includes('Dying');
    const target = d.stat.fort.mod + d.level;
    const maxRounds = c.race === 'Deadspawn' ? 5 + d.level : 5;
    if (!dying) {
      box.innerHTML = `<h4 class="cs-h4">Dying</h4><p class="cs-note">At 0 Health or below you gain Dying. Death saves succeed on a d100 at or under ${target} (Fortitude modifier + level). You die below −${d.stat.fort.score} Health, at 3 failed saves, or after ${maxRounds} rounds.</p>`;
      return;
    }
    box.innerHTML = `<h4 class="cs-h4">Dying</h4>
      ${c.dying.dead ? '<p class="cs-dead">Your character has died.</p>' : ''}
      <dl class="cs-dl">
        <div><dt>Health</dt><dd class="cs-plain">${hp}</dd></div>
        <div><dt>Stabilize DC</dt><dd class="cs-plain">${Math.max(0, -hp)}</dd></div>
        <div><dt>Death save</dt><dd class="cs-plain">d100 ≤ ${target}</dd></div>
        <div><dt>Rounds dying</dt><dd>${numIn('dying.rounds', `id="f-dyr" min="0" max="${maxRounds}"`)}<small> of ${maxRounds}</small></dd></div>
      </dl>
      <div class="cs-fails" aria-label="Failed death saves">${[1, 2, 3].map(x => `<button type="button" class="cs-fail${n(c.dying.fails) >= x ? ' on' : ''}" data-fail="${x}" aria-label="Failed save ${x}"></button>`).join('')}<span class="cs-lbl">Failed saves</span></div>
      <div class="cs-btnrow"><button type="button" class="cs-btn cs-btn-red" data-act="deathsave">Roll death save</button><button type="button" class="cs-btn" data-act="stabilize">Stabilized at 0</button></div>`;
    fillInputs(box);
  }
  function vitalTile(key, label, d, cls) {
    const max = d[key].total;
    const cur = curOf(key, d);
    const pct = max > 0 ? clamp(cur / max, 0, 1) * 100 : 0;
    return `<div class="cs-vital ${cls}">
      <div class="cs-vital-top"><span class="cs-lbl">${label}</span><button type="button" class="cs-why" data-break="${key}" aria-label="${label} maximum: show the math">max ${max}</button></div>
      <div class="cs-vital-row">
        <button type="button" class="cs-step" data-step="${key}:-1" aria-label="${label} minus 1">−</button>
        <input type="number" inputmode="numeric" class="cs-vital-num" data-cur="${key}" id="cur-${key}" value="${cur}" aria-label="Current ${label}">
        <button type="button" class="cs-step" data-step="${key}:1" aria-label="${label} plus 1">+</button>
      </div>
      <div class="cs-bar"><span style="width:${pct}%"></span></div></div>`;
  }
  function renderFx(d) {
    const box = $('#cs-fxlist');
    if (!box) return;
    const list = d.fxList || [];
    const word = { on: 'Applied', off: 'Switched off', choose: 'Needs a choice', error: 'Cannot read' };
    box.innerHTML = list.length ? `<div class="cs-fxtable" role="table">
      <div class="cs-fxtr cs-fxth" role="row"><span role="columnheader">Source</span><span role="columnheader">Effect</span><span role="columnheader">Status</span></div>
      ${list.map(x => `<div class="cs-fxtr" role="row"><span role="cell">${esc(x.label)} <small>${esc(x.src)}</small></span><span role="cell">${fxChip(x)}</span><span role="cell" class="cs-fx-st cs-fx-st-${x.status}">${word[x.status]}</span></div>`).join('')}
    </div>${(d.fxInfo || []).length ? `<h4 class="cs-h4">Notes from effects</h4><ul class="cs-fxnotes">${d.fxInfo.map(([l, t]) => `<li><b>${esc(l)}:</b> ${esc(t)}</li>`).join('')}</ul>` : ''}`
      : '<p class="cs-note">No effects yet. Equip a magic item, reach a class feature with a bonus, or type effects into an Other feature.</p>';
    fillInputs(box);
  }
  function renderVitals(d) {
    const focus = document.activeElement && document.activeElement.dataset ? document.activeElement.dataset.cur : null;
    const tiles = [['hp', 'Health', 'v-hp'], ['pa', 'Physical Armor', 'v-pa'], ['ma', 'Magical Armor', 'v-ma'], ['ta', 'True Armor', 'v-ta']];
    if (d.mana.total > 0 || d.cls.some(k => k.cls.resource === 'mana')) tiles.push(['mana', 'Mana', 'v-mana']);
    if (d.stamina.total > 0 || d.cls.some(k => k.cls.resource === 'stamina')) tiles.push(['stamina', 'Stamina', 'v-sta']);
    if (focus) {
      tiles.forEach(([k]) => { if (k !== focus) { const el = $(`#cs-vitals [data-vital="${k}"]`); if (el) el.outerHTML = `<div data-vital="${k}">${vitalTile(k, tiles.find(t => t[0] === k)[1], d, tiles.find(t => t[0] === k)[2])}</div>`; } });
      return;
    }
    $('#cs-vitals').innerHTML = tiles.map(([k, l, cls]) => `<div data-vital="${k}">${vitalTile(k, l, d, cls)}</div>`).join('');
  }
  function renderRolls() {
    const list = $('#cs-roll-list');
    if (!list) return;
    $('#cs-roll-count').textContent = rolls.length ? `(${rolls.length})` : '';
    list.innerHTML = rolls.map(r => `<li class="${esc(r.cls)}"><div class="cs-roll-top"><b>${esc(r.title)}</b><span class="cs-roll-num">${esc(r.total)}</span></div><small>${r.detail}</small></li>`).join('') || '<li class="cs-note">Tap any total with a d20 to roll it. Results land here.</li>';
    $$('[data-mode]').forEach(b => { b.setAttribute('aria-checked', b.dataset.mode === rollMode); b.classList.toggle('on', b.dataset.mode === rollMode); });
  }

  // ------------------------------------------------------------------ outputs
  function outputs(c, d) {
    const o = {};
    const cl = d.cls.map(k => `${k.name} ${k.level}${k.sub ? ` (${k.sub})` : ''}`).join(' / ');
    o.subline = [c.race ? (c.race === 'Deadspawn' && c.prevRace ? `Deadspawn ${c.prevRace}` : c.race) : 'No race', cl || 'No class', c.alignment].filter(Boolean).join(' · ');
    o.level = d.level;
    o.xpText = d.xpNext ? `${n(c.xp).toLocaleString()} / ${d.xpNext.toLocaleString()} XP` : `${n(c.xp).toLocaleString()} XP · max level`;
    o.xpPct = d.xpNext ? clamp((n(c.xp) - d.xpPrev) / (d.xpNext - d.xpPrev), 0, 1) * 100 : 100;
    o.initSigned = sign(d.init.total);
    o.saveSigned = {}; Object.keys(d.save).forEach(k => { o.saveSigned[k] = sign(d.save[k].total); });
    o.statRace = {}; o.statClass = {}; o.statMod = {};
    STAT_KEYS.forEach(k => { o.statRace[k] = d.stat[k].raceBonus ? sign(d.stat[k].raceBonus) : '—'; o.statClass[k] = d.stat[k].classBonus ? sign(d.stat[k].classBonus) : '—'; o.statMod[k] = sign(d.stat[k].mod); });
    o.pointsText = `Leveling points ${d.points.spent} of ${d.points.avail}`;
    o.paNote = `${c.rules.armorMult} × Fortitude modifier. A partial rest restores ${d.stat.fort.score}.`;
    o.maNote = `${c.rules.armorMult} × Intelligence modifier. A partial rest restores ${d.stat.int.score}.`;
    o.carryNote = `Carrying ${d.carry.used} kg. Heavy Object Interaction works within 5 kg of this.`;
    o.carryText = `${d.carry.used} of ${d.carry.total} kg`;
    o.goldText = `${n(c.gold).toLocaleString('en-US')} GP`;
    o.carryPct = d.carry.total ? clamp(d.carry.used / d.carry.total, 0, 1) * 100 : 0;
    o.skillStat = {}; o.skillSigned = {};
    D.skills.forEach(sk => { o.skillStat[sk.name] = STAT[d.skill[sk.name].stat].abbr; o.skillSigned[sk.name] = sign(d.skill[sk.name].total); });
    o.ranksText = ` ranks available · ${d.ranks.spent} placed`;
    o.spellSlots = `${d.known.spell} known · ${d.slots.spell} spell slots${d.slots.mem ? ` · +${d.slots.mem} from Memory` : ''}`;
    o.manSlots = `${d.known.maneuver} known · ${d.slots.maneuver} maneuver slots${d.slots.mem ? ` · +${d.slots.mem} from Memory` : ''}`;
    o.featsText = `${c.feats.length} of ${d.feats.total}`;
    o.raceLang = d.race ? `${d.race.name} languages: ${d.race.languages}` : '';
    o.classProf = d.cls.map(k => `<b>${esc(k.name)}:</b> ${esc(k.cls.prof.join(', '))}`).join('<br>');
    return o;
  }
  let lastD = null;
  let lastSig = '';
  function safeRender(sel, fn) {
    const box = $(sel);
    const a = document.activeElement;
    if (box && a && box.contains(a) && a.matches('input, textarea, select')) return;
    fn();
  }
  function update(full) {
    const c = char();
    const d = compute(c);
    lastD = d;
    const o = outputs(c, d);
    $$('[data-out]').forEach(el => {
      const k = el.dataset.out;
      let v = getPath(o, k);
      if (v === undefined) v = getPath(d, k);
      el.textContent = v == null ? '' : v;
    });
    $$('[data-out-html]').forEach(el => { el.innerHTML = getPath(o, el.dataset.outHtml) || ''; });
    $$('[data-out-style]').forEach(el => { el.style.width = getPath(o, el.dataset.outStyle) + '%'; });
    renderVitals(d);
    renderConditions();
    safeRender('#cs-fxlist', () => renderFx(d));
    safeRender('#cs-dying', () => renderDying(d));
    renderCasting(d);
    const sig = JSON.stringify([d.level, d.cls.map(k => [k.name, k.level, k.sub])]);
    if (full) { fullRender(d); lastSig = sig; }
    else {
      $$('[data-break^="tool."]').forEach(el => { const i = n(el.dataset.break.split('.')[1]); if (d.tool[i]) el.textContent = sign(d.tool[i].total); });
      d.weapon.forEach((wc, i) => {
        if (!wc) return;
        const a = $(`[data-break="weapon.${i}.atk"]`); if (a) a.textContent = sign(wc.atk.total);
        const m = $(`[data-break="weapon.${i}.dmg"]`); if (m) m.textContent = `${wc.data.die} ${sign(wc.dmg.total)}`;
        const cr = $(`[data-break="weapon.${i}.critW"]`); if (cr) cr.textContent = wc.critW.total >= 100 ? 'Always' : wc.critW.total;
      });
      if (sig !== lastSig) {
        lastSig = sig;
        safeRender('#cs-class-feats', () => renderFeatures(d));
        safeRender('#cs-spells', () => renderTierList('#cs-spells', 'spells', D.spellTiers, d, 'Mana'));
        safeRender('#cs-mans', () => renderTierList('#cs-mans', 'maneuvers', D.maneuverTiers, d, 'Stamina'));
      }
    }
    $('#cs-warn').innerHTML = d.warnings.map(w => `<p>${esc(w)}</p>`).join('');
    $('#cs-example').hidden = !c.example;
    saveSoon();
  }
  function fullRender(d) {
    d = d || compute(char());
    renderRoster();
    renderRaceChoices();
    renderClassSelects();
    renderWeapons(d);
    renderArmorMagic(d);
    renderTools(d);
    renderTierList('#cs-spells', 'spells', D.spellTiers, d, 'Mana');
    renderTierList('#cs-mans', 'maneuvers', D.maneuverTiers, d, 'Stamina');
    renderItems();
    renderInventory();
    renderPurchases();
    renderResists(d);
    renderFeatures(d);
    renderArt();
  }
  function rerender(kind) {
    const d = compute(char());
    if (kind === 'race') { renderRaceChoices(); renderResists(d); renderFeatures(d); renderWeapons(d); }
    if (kind === 'class') { renderClassSelects(); renderFeatures(d); renderTierList('#cs-spells', 'spells', D.spellTiers, d, 'Mana'); renderTierList('#cs-mans', 'maneuvers', D.maneuverTiers, d, 'Stamina'); renderWeapons(d); renderRoster(); }
    if (kind === 'weapons' || kind === 'hunt') renderWeapons(d);
    if (kind === 'name') renderRoster();
    if (kind === 'items') { renderItems(); renderResists(d); }
    if (kind === 'fx') { renderItems(); renderFeatures(d); renderResists(d); renderFx(d); renderWeapons(d); renderArmorMagic(d); }
    if (kind === 'armor') { renderArmorMagic(d); renderFeatures(d); renderFx(d); renderResists(d); }
    if (kind === 'attune') { renderWeapons(d); renderArmorMagic(d); renderItems(); renderFeatures(d); renderFx(d); renderResists(d); }
    if (kind === 'weaponfx') { renderWeapons(d); renderArmorMagic(d); renderFeatures(d); renderFx(d); renderResists(d); }
  }

  // ------------------------------------------------------------------ binding
  function fillInputs(root) {
    const c = char();
    $$('[data-bind]', root || document).forEach(el => {
      const v = getPath(c, el.dataset.bind);
      if (el.type === 'checkbox') el.checked = !!v;
      else el.value = v == null ? '' : v;
    });
  }
  function readInput(el) {
    const t = el.dataset.type;
    if (el.type === 'checkbox') return el.checked;
    if (t === 'num') return el.value === '' ? 0 : n(el.value);
    if (t === 'float') return el.value === '' ? 0 : (parseFloat(el.value) || 0);
    if (t === 'bool') return el.value === 'true';
    if (el.tagName === 'SELECT' && (el.value === 'true' || el.value === 'false') && el.dataset.bind.startsWith('rules.')) return el.value === 'true';
    return el.value;
  }
  function onInput(e) {
    const el = e.target;
    if (el.dataset.bind) {
      const c = char();
      const path = el.dataset.bind;
      setPath(c, path, readInput(el));
      if (path === 'race') { c.raceChoice = {}; c.raceResist = ''; c.adaptations = ['', '']; c.prevRace = ''; }
      if (path === 'hunt' && !c.hunt && RACE[c.race] && RACE[c.race].auto.hunt) { toggleCondition('Exhausted', true); toast('The Hunt ends. You gain Exhausted until a partial rest.'); }
      if (/^classes\.\d\.name$/.test(path)) {
        const i = n(path.split('.')[1]);
        c.classes[i].sub = '';
        if (c.classes[i].name && !n(c.classes[i].level)) c.classes[i].level = 1;
        if (!c.classes[i].name) c.classes[i].level = 0;
        fillInputs($(`#f-clvl${i}`).parentNode);
      }
      if (/^weapons\.\d+\.item$/.test(path)) { const w = getPath(c, path.replace(/\.item$/, '')); w.type = ''; }
      if (/^(weapons\.\d+\.magic|armorMagic|shieldMagic)\.attuned$/.test(path) && readInput(el)) {
        const au = attuneUse(c);
        if (au.used > au.slots) {
          setPath(c, path, false); el.checked = false;
          toast(`No free attunement slot (${au.slots} of ${au.slots} used). Unattune an item or press Add slot on the Gear tab.`, 'dmg');
          return;
        }
      }
      if (/^weapons\.\d+\.chosen$/.test(path) && readInput(el)) c.weapons.forEach((w, j) => { if (j !== n(path.split('.')[1])) w.chosen = false; });
      if (path.startsWith('rules.')) { update(true); return; }
      if (e.type === 'change' && el.dataset.rerender) rerender(el.dataset.rerender);
      if (path === 'name') { if (e.type === 'change') renderRoster(); }
      update();
      return;
    }
    if (el.dataset.cur && e.type === 'change') {
      const d = compute(char());
      setCur(el.dataset.cur, n(el.value), d);
      if (el.dataset.cur === 'hp' && curOf('hp', d) <= 0) toggleCondition('Dying', true);
      update();
    }
    if (el.id === 'f-upcoming') renderFeatures(compute(char()));
  }

  // ------------------------------------------------------------------ popovers, toasts, modal
  let popAnchor = null;
  function showPop(anchor, html) {
    const pop = $('#cs-pop');
    if (popAnchor === anchor && !pop.hidden) { hidePop(); return; }
    popAnchor = anchor;
    pop.innerHTML = `<button type="button" class="cs-x cs-pop-x" data-act="close-pop" aria-label="Close">×</button>${html}`;
    pop.hidden = false;
    const r = anchor.getBoundingClientRect();
    const vw = document.documentElement.clientWidth;
    const pw = Math.min(340, vw - 32);
    pop.style.width = pw + 'px';
    pop.style.left = clamp(r.left + r.width / 2 - pw / 2, 16, vw - pw - 16) + 'px';
    pop.style.top = (r.bottom + 8) + 'px';
    const ph = pop.offsetHeight;
    if (r.bottom + ph + 16 > window.innerHeight && r.top - ph - 8 > 0) pop.style.top = (r.top - ph - 8) + 'px';
  }
  function hidePop() { $('#cs-pop').hidden = true; popAnchor = null; }
  function breakdownHtml(key) {
    const d = lastD || compute(char());
    const obj = getPath(d, key);
    if (!obj || !obj.parts) return '';
    const title = key.split('.').map(s => s.replace(/^\w/, ch => ch.toUpperCase())).join(' › ');
    const label = {
      ac: 'Armor Class', hp: 'Maximum Health', pa: 'Maximum Physical Armor', ma: 'Maximum Magical Armor', ta: 'Maximum True Armor',
      mana: 'Maximum Mana', stamina: 'Maximum Stamina', crit: 'Critical Chance', init: 'Initiative', speed: 'Walk speed (m per AP)',
      pen: 'Armor penalty', carry: 'Carrying capacity (kg)', ranks: 'Skill ranks available',
    }[key] || (key.startsWith('weapon.') ? `${d.weapon[n(key.split('.')[1])].title} ${{ atk: 'attack', dmg: 'damage bonus', deadly: 'Deadly levels', ench: 'Enchanted levels', critW: 'Critical Chance', decisive: 'decisive dice' }[key.split('.')[2]] || ''}` :
      key.startsWith('cast.') ? `${d.cast[n(key.split('.')[1])].name} ${key.endsWith('dc') ? 'DC' : 'attack'}` :
      key.startsWith('tool.') ? (char().tools[n(key.split('.')[1])].name || 'Tool') :
      key.startsWith('stat.') ? STAT[key.split('.')[1]].name + ' score' : key.startsWith('save.') ? SAVE_NAME[key.split('.')[1]] :
      key.startsWith('skill.') ? key.slice(6) : title);
    return `<h4>${esc(label)}</h4><table class="cs-break">${obj.parts.map(p => `<tr><td>${esc(p[0])}</td><td>${sign(p[1])}</td></tr>`).join('')}<tr class="tot"><td>Total</td><td>${obj.total}</td></tr></table>`;
  }
  function infoHtml(spec) {
    const [kind, ...rest] = spec.split(':');
    const name = rest.join(':');
    if (kind === 'skill') { const s = SKILL[name]; return `<h4>${esc(name)}</h4><p>${s.desc}</p><p class="cs-note">Stat: ${STAT[s.stat].name}${s.armorPenalty ? '. Armor penalty applies.' : ''}</p>`; }
    if (kind === 'trait') { const [k, t] = traitText(name); return `<h4>${esc(name)}</h4><p>${esc(t || 'No description in the Equipment table.')}</p>${k === 'Piercing' ? '<p class="cs-note">This weapon trait is separate from the Piercing damage type.</p>' : ''}`; }
    if (kind === 'cond') { const k = COND[name]; return `<h4>${esc(name)}</h4><p>${k ? k.text : ''}</p>`; }
    if (kind === 'mtrait') {
      const [k2, tn, path] = name.split('|');
      const t = MTRAIT[k2 + '|' + tn];
      if (!t) return '';
      const mg = path ? magicOf(getPath(char(), path), k2) : null;
      const x = mg && mg.list.find(y => y.t.name === tn);
      return `<h4>${esc(x ? traitLabel(x) : tn)}</h4><ul class="cs-tsum">${traitSummary(t, x, mg).map(l => `<li>${esc(l)}</li>`).join('')}</ul>
        <p>${esc(t.text)}</p><p class="cs-note">Costs +${t.cost}${t.perLevel ? ' per level' : ''} of the magical bonus.${t.costNote ? ' ' + esc(t.costNote) : ''}</p>`;
    }
    if (kind === 'inv' || kind === 'slot') {
      const it = kind === 'inv' ? char().inventory[n(name)] : getPath(char(), name);
      if (!it) return '';
      const meta = [it.shop, it.power, it.slot && normSlot(it.slot) + ' slot', KIND_LABEL[it.kind]].filter(Boolean).join(' · ');
      return `<h4>${esc(it.name)}</h4>${meta ? `<p class="cs-note">${esc(meta)}</p>` : ''}${esc(it.desc || it.notes || '').split(/\n{2,}/).map(x => `<p>${x.replace(/\n/g, '<br>')}</p>`).join('')}`;
    }
    return '';
  }
  function toast(html, cls) {
    const box = $('#cs-toasts');
    const t = document.createElement('div');
    t.className = 'cs-toast ' + (cls || '');
    t.innerHTML = html;
    box.appendChild(t);
    while (box.children.length > 3) box.removeChild(box.firstChild);
    setTimeout(() => { t.classList.add('out'); setTimeout(() => t.remove(), 400); }, 5200);
  }
  function modal(title, bodyHtml, buttons) {
    const back = $('#cs-modal');
    const m = back.firstElementChild;
    m.innerHTML = `<h3 id="cs-modal-title" class="cs-h">${esc(title)}</h3>${bodyHtml}<div class="cs-btnrow cs-modal-btns">${buttons.map((b, i) => `<button type="button" class="cs-btn ${b.cls || ''}" data-mbtn="${i}">${esc(b.label)}</button>`).join('')}</div>`;
    m.oninput = null; m.onchange = null;
    back.hidden = false;
    const first = m.querySelector('textarea, input, [data-mbtn]');
    if (first) first.focus();
    m.onclick = e => {
      const b = e.target.closest('[data-mbtn]');
      if (!b) return;
      const fn = buttons[n(b.dataset.mbtn)].fn;
      const keep = fn ? fn(m) === false : false;
      if (!keep) back.hidden = true;
    };
  }

  // ------------------------------------------------------------------ magic item forge
  // spec: 'new' (buy a weapon and enchant it), 'w:<index>' (a weapon on the sheet), 'armor', or 'shield'
  function openForge(spec) {
    const c = char();
    const isW = spec === 'new' || spec.startsWith('w:');
    const kind = isW ? 'weapon' : 'armor';
    const wi = spec.startsWith('w:') ? n(spec.slice(2)) : -1;
    const w = wi >= 0 ? c.weapons[wi] : null;
    const slot = isW ? null : spec;
    const key = slot === 'armor' ? 'armorMagic' : slot === 'shield' ? 'shieldMagic' : null;
    const TABLE = slot === 'shield' ? SHIELD : ARMOR;
    if (wi >= 0 && (!w || !weaponData(w))) return;
    if (slot && !TABLE[c[slot]]) { toast(`Pick ${slot === 'armor' ? 'armor' : 'a shield'} first, then enchant it.`); return; }
    const stored = w ? w.magic : key ? c[key] : null;
    const myPath = w ? `weapons.${wi}.magic` : key;
    const cur = stored && n(stored.bonus) > 0 && stored.base === (w ? w.item : slot ? c[slot] : '') ? stored : null;
    const st = {
      base: w ? w.item : slot ? c[slot] : (WEAPON['Arming Sword'] ? 'Arming Sword' : D.weapons[0].name),
      bonus: cur ? clamp(n(cur.bonus), 1, 10) : 1, name: cur ? cur.name || '' : '', payBase: spec === 'new', sel: {},
    };
    let seq = 0;   // traits keep the order they were picked in, so the name reads the way the player built it
    (cur ? cur.traits || [] : []).forEach(x => { if (x && MTRAIT[kind + '|' + x.name]) st.sel[x.name] = { on: true, level: n(x.level) || 1, pick: x.pick || '', seq: ++seq }; });
    const paidBonus = cur ? clamp(n(cur.bonus), 1, 10) : 0;
    const baseName = () => (isW ? ((st.base === '__custom' ? weaponData(w) : WEAPON[st.base]) || {}).name || 'Weapon' : st.base);
    const basePrice = () => (isW ? (WEAPON[st.base] || {}).price : (TABLE[st.base] || {}).price) || 0;
    const rangedBase = () => {
      const data = st.base === '__custom' ? weaponData(w) : WEAPON[st.base];
      return !!data && (data.traits || []).some(t => /^Ranged/i.test(t));
    };
    const fits = t => !t.only || (t.only === 'ranged') === rangedBase();
    const traitsHere = () => (D.magicTraits || []).filter(t => t.for === kind && fits(t));
    const pickOpts = t => { const m = fxLines(t.fx).join(' ').match(/\{([^}]*)\}/); return m ? m[1].split('|').map(o => o.trim()) : null; };
    const chosenList = () => traitsHere().filter(t => st.sel[t.name] && st.sel[t.name].on)
      .sort((a, b2) => (st.sel[a.name].seq || 0) - (st.sel[b2.name].seq || 0))
      .map(t => ({ name: t.name, level: t.perLevel ? clamp(n(st.sel[t.name].level) || 1, 1, t.maxLevel || 10) : 1, pick: String(st.sel[t.name].pick || '').trim() }));
    const draft = () => ({ base: st.base, bonus: st.bonus, name: st.name.trim(), traits: chosenList() });
    const gold = () => Math.max(0, n(c.gold));
    const costNow = () => Math.max(0, magicPrice(st.bonus) - magicPrice(paidBonus)) + (st.payBase ? basePrice() : 0);
    const gp = v => `${Number(v).toLocaleString('en-US')} GP`;
    const traitRow = t => {
      const s0 = st.sel[t.name] || {};
      const po = pickOpts(t);
      return `<div class="cs-ftrait" data-t="${esc(t.name)}" data-q="${esc((t.name + ' ' + traitSummary(t).join(' ') + ' ' + t.text).toLowerCase())}">
        <label class="cs-check cs-ftrait-name"><input type="checkbox" data-ft="${esc(t.name)}"${s0.on ? ' checked' : ''}> ${esc(t.name)}</label>
        <span class="cs-fcost">+${t.cost}${t.perLevel ? ' a level' : ''}</span>
        <span class="cs-fopts">
          ${t.perLevel ? `<label class="cs-flevel"><span class="cs-lbl">Level</span><input type="number" min="1" max="${t.maxLevel || 10}" value="${esc(s0.level || 1)}" data-fl="${esc(t.name)}" aria-label="${esc(t.name)} level"></label>` : ''}
          ${t.choice ? (po ? `<select data-fp="${esc(t.name)}" aria-label="${esc(t.name)} choice">${opt('', 'Choose')}${po.map(o => opt(o, o, s0.pick)).join('')}</select>`
            : `<input data-fp="${esc(t.name)}" value="${esc(s0.pick || '')}" placeholder="Creature type" aria-label="${esc(t.name)}: creature type">`) : ''}
        </span>
        <span class="cs-fsum">${esc(traitSummary(t).join('. '))}</span>
      </div>`;
    };
    const baseSel = spec === 'new'
      ? `<label class="cs-span"><span class="cs-lbl">Weapon</span><select id="fg-base">${D.weapons.filter(x => x.price != null).map(x => opt(x.name, `${x.name} · ${x.die} · ${x.price} GP`, st.base)).join('')}</select></label>`
      : `<div class="cs-span"><span class="cs-lbl">${isW ? 'Weapon' : slot === 'armor' ? 'Armor' : 'Shield'}</span><p class="cs-forge-base">${esc(baseName())}</p></div>`;
    const body = `<div class="cs-forge">
      <p class="cs-note">The magical bonus adds to ${isW ? 'attack and damage rolls' : 'AC and saves'}. It is also the budget for traits: each trait spends part of it, up to +10.${spec === 'new' ? ' For magic armor or a shield, pick it under Armor and shield, then press Enchant.' : ''}</p>
      <div class="cs-form">
        ${baseSel}
        <label><span class="cs-lbl">Magical bonus</span><select id="fg-bonus">${Array.from({ length: 10 }, (_, i) => i + 1).map(b => opt(b, `+${b} · ${gp(magicPrice(b))}`, st.bonus)).join('')}</select></label>
        <label><span class="cs-lbl">Name (optional)</span><input id="fg-name" value="${esc(st.name)}" placeholder="Leave blank to name it from its traits"></label>
      </div>
      <div class="cs-forge-budget"><span id="fg-points"></span><span class="cs-forge-meter" aria-hidden="true"><span id="fg-meter"></span></span></div>
      <label class="cs-forge-filter"><span class="cs-lbl">Find a trait</span><input type="search" id="fg-q" placeholder="Fire, attack, speed…"></label>
      <div class="cs-forge-traits" id="fg-traits" role="group" aria-label="Magic traits"></div>
      <div class="cs-forge-preview" id="fg-prev" aria-live="polite"></div>
      <label class="cs-check" id="fg-paywrap"><input type="checkbox" id="fg-paybase"${st.payBase ? ' checked' : ''}> <span id="fg-paytext"></span></label>
      <p class="cs-note" id="fg-attune"></p>
      <div class="cs-forge-cost"><span>Cost</span><strong id="fg-cost"></strong></div>
      <p class="cs-note" id="fg-left"></p>
    </div>`;
    const commit = pay => {
      const dr = draft(), mg = magicOf(dr, kind);
      if (!mg) return false;
      const cost = costNow();
      if (pay && cost > gold()) { toast('Not enough gold.'); return false; }
      const title = magicTitle(mg, baseName());
      if (pay && cost) {
        c.gold = gold() - cost;
        c.purchases = c.purchases || [];
        c.purchases.push({ t: Date.now(), name: paidBonus ? `${title} (upgrade from +${paidBonus})` : title, shop: MAGIC_SHOP, qty: 1, cost, kind: 'magic' });
      }
      const au = attuneUse(c, myPath);
      dr.attuned = cur && cur.attuned === false ? false : au.used < au.slots;
      if (spec === 'new') { const nw = newWeapon(st.base); nw.magic = dr; c.weapons.push(nw); }
      else if (w) w.magic = dr;
      else c[key] = dr;
      if (c.example) c.example = false;
      fillInputs(); update(true);
      toast(`${esc(title)} is ready${pay && cost ? ` for ${gp(cost)}. ${gp(c.gold)} left` : ''}.${dr.attuned ? '' : ' It is not attuned, so its magic stays off. Free an attunement slot on the Gear tab, then tick Attuned.'}`);
      return true;
    };
    const btns = [
      { label: 'Buy', cls: 'cs-btn-red', fn: () => (commit(true) ? undefined : false) },
      { label: 'Save without paying', fn: () => (commit(false) ? undefined : false) },
    ];
    if (cur) btns.push({ label: 'Remove magic', cls: 'cs-btn-quiet', fn: () => { if (w) w.magic = null; else c[key] = null; update(true); toast('Magic removed.'); } });
    btns.push({ label: 'Cancel', cls: 'cs-btn-quiet' });
    modal(spec === 'new' ? 'Forge a magic weapon' : cur ? `Magic on ${baseName()}` : `Enchant ${baseName()}`, body, btns);
    const m = $('#cs-modal').firstElementChild;
    const fillTraits = () => {
      $('#fg-traits', m).innerHTML = traitsHere().map(traitRow).join('') || '<p class="cs-note">No traits fit this item.</p>';
      filter();
    };
    const filter = () => {
      const q = ($('#fg-q', m).value || '').trim().toLowerCase();
      $$('.cs-ftrait', m).forEach(r => { r.hidden = !!q && !r.dataset.q.includes(q) && !(st.sel[r.dataset.t] || {}).on; });
    };
    const refresh = () => {
      const dr = draft(), mg = magicOf(dr, kind), left = st.bonus - mg.spent;
      const listHere = traitsHere();
      const blocked = [];
      listHere.forEach(t => {
        const row = $(`.cs-ftrait[data-t="${CSS.escape(t.name)}"]`, m);
        if (!row) return;
        const on = !!(st.sel[t.name] && st.sel[t.name].on);
        const cb = row.querySelector('[data-ft]');
        const needs = t.requires && !(st.sel[t.requires] && st.sel[t.requires].on) && !(isW && traitLevel(st.base === '__custom' ? weaponData(w) : WEAPON[st.base] || {}, t.requires));
        cb.disabled = !on && (t.cost > left || needs);
        row.classList.toggle('on', on);
        row.classList.toggle('cant', cb.disabled);
        row.title = cb.disabled ? (needs ? `Needs ${t.requires}` : `Needs +${t.cost} of the bonus. ${left > 0 ? `+${left} is left.` : 'None is left.'}`) : '';
        row.querySelectorAll('[data-fl], [data-fp]').forEach(el => { el.disabled = !on; });
        const x = on ? mg.list.find(y => y.t.name === t.name) : null;
        const fs = row.querySelector('.cs-fsum'), txt = traitSummary(t, x, x ? mg : null).join('. ');
        if (fs.textContent !== txt) fs.textContent = txt;
        if (on && needs) blocked.push(`${t.name} needs ${t.requires}.`);
      });
      $('#fg-points', m).textContent = `Traits spend +${mg.spent} of +${st.bonus}.${left > 0 ? ` +${left} left.` : ''}`;
      $('#fg-meter', m).style.width = Math.min(100, (mg.spent / st.bonus) * 100) + '%';
      m.querySelector('.cs-forge-budget').classList.toggle('over', left < 0);
      const title = magicTitle(mg, baseName());
      const lines = [isW ? `Attack +${st.bonus + mg.list.reduce((a, x) => a + (x.t.atk || 0) * x.level, 0)}, damage +${st.bonus}` : `AC +${st.bonus}, Evasion, Resistance (Body), and Resistance (Mind) +${st.bonus}`];
      mg.list.forEach(x => traitSummary(x.t, x, mg).forEach(l => { if (!/^Attack \+/.test(l)) lines.push(`${traitLabel(x)}: ${l}`); }));
      $('#fg-prev', m).innerHTML = `<p class="cs-forge-name">${esc(title)}</p><ul>${lines.map(l => `<li>${esc(l)}</li>`).join('')}</ul>`;
      const bp = basePrice();
      $('#fg-paywrap', m).hidden = !bp;
      $('#fg-paytext', m).textContent = `Also pay for the ${baseName()} (${gp(bp)})`;
      const au = attuneUse(c, myPath), keepOff = cur && cur.attuned === false;
      $('#fg-attune', m).textContent = keepOff ? 'Not attuned. Tick Attuned on the sheet to use the magic.'
        : au.used < au.slots ? `Takes 1 attunement slot. ${au.slots - au.used} of ${au.slots} free.` : `Takes 1 attunement slot, and all ${au.slots} are full. It will wait unattuned until you free one.`;
      const cost = costNow(), after = gold() - cost;
      $('#fg-cost', m).textContent = gp(cost);
      const problems = blocked.concat(left < 0 ? [`The traits cost +${mg.spent}. Raise the bonus or drop a trait.`] : []);
      $('#fg-left', m).innerHTML = problems.length ? `<span class="cs-bad">${esc(problems.join(' '))}</span>`
        : paidBonus && st.bonus <= paidBonus ? `No charge for the bonus. You paid for +${paidBonus} already.`
          : after >= 0 ? `${esc(c.name || 'Your character')} has ${gp(gold())}. ${gp(after)} left after buying.` : `<span class="cs-bad">Not enough gold for Buy. You need ${gp(-after)} more. Save without paying records loot or a gift.</span>`;
      const buy = m.querySelector('[data-mbtn="0"]'), save = m.querySelector('[data-mbtn="1"]');
      buy.textContent = cost ? `Buy for ${gp(cost)}` : 'Save';
      buy.disabled = !!problems.length || after < 0;
      save.disabled = !!problems.length;
      save.hidden = !cost;
    };
    m.oninput = e => {
      const el = e.target, ds = el.dataset;
      if (el.id === 'fg-bonus') st.bonus = clamp(n(el.value), 1, 10);
      else if (el.id === 'fg-name') st.name = el.value;
      else if (el.id === 'fg-paybase') st.payBase = el.checked;
      else if (el.id === 'fg-q') { filter(); return; }
      else if (el.id === 'fg-base') {
        st.base = el.value;
        Object.keys(st.sel).forEach(k => { const t = MTRAIT[kind + '|' + k]; if (t && !fits(t)) delete st.sel[k]; });
        fillTraits();
      } else if (ds.ft) { st.sel[ds.ft] = Object.assign(st.sel[ds.ft] || { level: 1, pick: '' }, { on: el.checked }, el.checked ? { seq: ++seq } : {}); }
      else if (ds.fl) { (st.sel[ds.fl] = st.sel[ds.fl] || { on: true, pick: '' }).level = n(el.value) || 1; }
      else if (ds.fp) { (st.sel[ds.fp] = st.sel[ds.fp] || { on: true, level: 1 }).pick = el.value; }
      else return;
      refresh();
    };
    m.onchange = m.oninput;
    fillTraits();
    refresh();
    const first = $('#fg-base', m) || $('#fg-bonus', m);
    if (first) first.focus();
  }

  // ------------------------------------------------------------------ character builder
  // A step-by-step builder that runs before the sheet: name, race, class, subclass, statistics,
  // spells or maneuvers, then equipment bought with starting gold. It fills a blank character and
  // hands it to the sheet, so every number comes from the same rules engine.
  const START_GOLD = 1000;
  const STAT_ARRAY = [12, 12, 10, 8, 7, 6, 4];   // Selective Array (stat-generation.html)
  const COMMON_SCHOOLS = ['Necromancy', 'Transmutation', 'Hydromancy', 'Pyromancy', 'Geomancy', 'Aeromancy'];
  const ALL_SCHOOLS = Array.from(new Set(D.spells.map(s => s[1]))).sort();
  const B_STEPS = [['who', 'Create character'], ['race', 'Race'], ['class', 'Class'], ['sub', 'Subclass'], ['stats', 'Statistics'], ['magic', 'Spells and maneuvers'], ['gear', 'Equipment'], ['review', 'Review']];
  const SMITH_ID = 'general-smithing';
  let B = null;

  function shopItems(id) {
    const sh = ((window.SPARKS_SHOPS && window.SPARKS_SHOPS.shops) || []).find(s => s.id === id);
    return sh ? sh.items : [];
  }
  // General Smithing stock. Falls back to the sheet's weapon, armor, and shield tables if the shop is missing.
  function smithStock() {
    const items = shopItems(SMITH_ID);
    if (items.length) return items.map(it => Object.assign({}, it, { shopName: 'General Smithing' }));
    const out = [];
    D.weapons.forEach(w => { if (typeof w.price === 'number') out.push({ name: w.name, gp: w.price, section: 'Weapons', shopName: 'General Smithing' }); });
    D.armor.forEach(a => { if (typeof a.price === 'number') out.push({ name: a.name, gp: a.price, section: 'Armor', shopName: 'General Smithing' }); });
    D.shields.forEach(s => { if (typeof s.price === 'number') out.push({ name: s.name, gp: s.price, section: 'Shields', shopName: 'General Smithing' }); });
    return out;
  }
  function storeStock() {
    return shopItems('general-store').filter(it => typeof it.gp === 'number').map(it => Object.assign({}, it, { section: 'Adventuring gear', shopName: 'General Store' }));
  }
  function gearKind(it) {
    if (it.section === 'Weapons') return 'weapon';
    if (it.section === 'Armor') return 'armor';
    if (it.section === 'Shields') return 'shield';
    const nm = it.name.toLowerCase();
    if (D.tools.some(t => t.toLowerCase() === nm)) return 'tool';
    if (/acid|smoke bomb|powder keg|dynamite|rations|^oil$|torch|candle|caltrops|ball bearings|parchment|ink/.test(nm)) return 'consumable';
    return 'gear';
  }
  function gearInfo(it) {
    const k = gearKind(it);
    if (k === 'weapon' && WEAPON[it.name]) { const w = WEAPON[it.name]; return `${w.die} ${w.type || ''}${w.traits.length ? ' · ' + w.traits.join(', ') : ''}`; }
    if (k === 'armor' && ARMOR[it.name]) { const a = ARMOR[it.name]; return `${a.type || ''} armor · AC ${a.ac} · max Finesse ${a.maxFin == null ? 'none' : '+' + a.maxFin}${a.penalty ? ' · penalty ' + a.penalty : ''}`; }
    if (k === 'shield' && SHIELD[it.name]) { const s = SHIELD[it.name]; return `+${s.ac} AC${s.penalty ? ' · penalty ' + s.penalty : ''}`; }
    return shortText(it.desc || '');
  }

  function newBuild(opts) {
    const stats = {}; STAT_KEYS.forEach(k => { stats[k] = ''; });
    const lvl = {}; STAT_KEYS.forEach(k => { lvl[k] = 0; });
    return { step: opts && opts.landing ? 'start' : 'who', replaceId: (opts && opts.replaceId) || null,
      name: '', player: '', alignment: '', deity: '', race: '', prevRace: '', raceChoice: {}, raceResist: '', adaptations: ['', ''],
      cls: '', sub: '', method: 'array', assign: stats, custom: Object.fromEntries(STAT_KEYS.map(k => [k, 8])), lvl,
      spells: [], maneuvers: [], allSchools: false, extraKind: false, cart: {}, wearArmor: '', wearShield: '', shop: 'smith', filter: '' };
  }
  function bRace() { return RACE[B.race] || null; }
  function bClass() { return D.classes[B.cls] || null; }
  function bBase(k) {
    if (B.method === 'custom') return n(B.custom[k]);
    return B.assign[k] === '' ? 8 : STAT_ARRAY[n(B.assign[k])];
  }
  function bPoints() { return D.levels[0].points; }
  function bSpent() { return STAT_KEYS.reduce((a, k) => a + n(B.lvl[k]), 0); }
  function bGold() { return START_GOLD - bCartTotal(); }
  function bCartLines() {
    const all = smithStock().concat(storeStock());
    return Object.keys(B.cart).filter(key => B.cart[key] > 0).map(key => {
      const it = all.find(x => `${x.shopName}|${x.name}` === key);
      return it ? { it, qty: B.cart[key], key } : null;
    }).filter(Boolean);
  }
  function bCartTotal() { return bCartLines().reduce((a, l) => a + l.it.gp * l.qty, 0); }
  function bTierName(kind) {
    const tiers = kind === 'spell' ? D.spellTiers : D.maneuverTiers;
    return tiers.filter(t => t.level <= 1).map(t => t.name);
  }
  function bSlots() {
    const cl = bClass();
    if (!cl) return { kind: 'spell', slots: 0 };
    const d = compute(bChar(true));
    return { kind: cl.slotType, slots: cl.slots[0] + Math.max(0, d.slots.mem) };
  }
  function bGrantedSchools() {
    const cl = bClass();
    if (!cl) return [];
    const text = [].concat(cl.prof || [], (cl.features || []).filter(f => f.level <= 1).map(f => f.text),
      ((cl.subclasses || {})[B.sub] || []).filter(f => f.level <= 1).map(f => f.text)).join(' ');
    return ALL_SCHOOLS.filter(s => new RegExp('\\b' + s + '\\b', 'i').test(text));
  }

  // the character the builder will hand to the sheet; light=true skips gear for previews
  function bChar(light) {
    const c = blankChar();
    c.name = B.name.trim(); c.player = B.player.trim(); c.alignment = B.alignment; c.deity = B.deity.trim();
    c.race = B.race; c.prevRace = B.prevRace; c.raceChoice = clone(B.raceChoice); c.raceResist = B.raceResist; c.adaptations = B.adaptations.slice();
    c.classes = [{ name: B.cls, level: 1, sub: B.sub }, { name: '', level: 0, sub: '' }];
    const r = bRace(); if (r) c.languages = r.languages || '';
    STAT_KEYS.forEach(k => { c.stats[k].base = bBase(k); c.stats[k].lvl = n(B.lvl[k]); });
    c.spells = B.spells.map(nm => SPELL_BY_NAME[nm.toLowerCase()]).filter(Boolean).map(s => ({ name: s[0], school: s[1], tier: s[2], href: s[3], notes: '' }));
    c.maneuvers = B.maneuvers.map(nm => MAN_BY_NAME[nm.toLowerCase()]).filter(Boolean).map(m => ({ name: m[0], tier: m[1], href: m[2], notes: '' }));
    c.gold = START_GOLD;
    if (light) return c;
    const weapons = [];
    bCartLines().forEach(({ it, qty }) => {
      const kind = gearKind(it), cost = it.gp * qty;
      c.purchases.push({ t: Date.now(), name: it.name, shop: it.shopName, qty, cost, kind });
      if (kind === 'weapon') { for (let i = 0; i < qty; i++) weapons.push(newWeapon(it.name)); return; }
      let left = qty;
      if (kind === 'armor' && B.wearArmor === it.name) { c.armor = it.name; left--; }
      if (kind === 'shield' && B.wearShield === it.name) { c.shield = it.name; left--; }
      if (left > 0) addToInventory(c, { name: it.name, qty: left, kg: 0, where: kind === 'consumable' ? 'Carried' : 'Pack', notes: '', shop: it.shopName, kind, desc: it.desc || gearInfo(it), paid: it.gp });
    });
    c.weapons = weapons.concat([newWeapon('Unarmed Strike')]);
    c.gold = bGold();
    return c;
  }

  // which steps are done, and what blocks the Next button
  function bProblem(step) {
    const r = bRace(), cl = bClass();
    switch (step) {
      case 'who': return B.name.trim() ? '' : 'Give your character a name.';
      case 'race':
        if (!r) return 'Pick a race.';
        if (r.previousRace && !B.prevRace) return 'Pick your previous race.';
        { const src = raceInfo(bChar(true)).statSrc;
          if (src && src.choices.some((ch, i) => !B.raceChoice['c' + i])) return 'Pick the stat for your racial bonus.'; }
        if (r.resistChoice && !B.raceResist) return 'Pick your resistance.';
        if (r.auto.adaptations && B.adaptations.some(a => !a)) return 'Pick both adaptations.';
        return '';
      case 'class': return cl ? '' : 'Pick a class.';
      case 'sub': return B.sub ? '' : 'Pick a subclass.';
      case 'stats':
        if (B.method === 'array') { const used = STAT_KEYS.map(k => B.assign[k]); if (used.some(v => v === '')) return 'Place every number from the array.'; }
        if (bSpent() !== bPoints()) return `Spend all ${bPoints()} leveling points (${bSpent()} spent).`;
        return '';
      case 'magic': { const s = bSlots(); const have = (s.kind === 'spell' ? B.spells : B.maneuvers).length;
        return have > s.slots ? `You picked ${have} but have ${s.slots} slots. Remove ${have - s.slots}.` : ''; }
      case 'gear': return bGold() < 0 ? `You are ${(-bGold()).toLocaleString('en-US')} GP over budget.` : '';
      default: return '';
    }
  }

  function openBuilder(opts) {
    B = newBuild(opts);
    let box = $('#cs-builder');
    const root = document.getElementById('cs-app');
    if (!box) {
      box = document.createElement('div');
      box.id = 'cs-builder'; box.className = 'cs-wrap cs-builder';
      root.insertBefore(box, root.firstChild);
      box.addEventListener('click', bClick);
      box.addEventListener('input', bInput);
      box.addEventListener('change', bInput);
    }
    root.classList.add('cs-building');
    box.hidden = false;
    bRender();
    window.scrollTo(0, 0);
  }
  function closeBuilder() {
    const box = $('#cs-builder');
    if (box) box.hidden = true;
    document.getElementById('cs-app').classList.remove('cs-building');
    B = null;
  }

  function bRender(focusSel) {
    const box = $('#cs-builder');
    if (!box || !B) return;
    if (B.step === 'start') {
      const real = roster.order.filter(id => !roster.chars[id].example);
      box.innerHTML = `<div class="cs-b-start">
        <h2 class="cs-b-title">Sparks Character Builder</h2>
        <p>Build a level 1 character one step at a time: race, class, subclass, statistics, spells or maneuvers, then equipment. You start with ${START_GOLD.toLocaleString('en-US')} GP.</p>
        <div class="cs-btnrow cs-b-startbtns">
          <button type="button" class="cs-btn cs-btn-red cs-b-big" data-bx="go:who">Create character</button>
          ${real.length ? '<button type="button" class="cs-btn" data-bx="close">Open my characters</button>' : '<button type="button" class="cs-btn" data-bx="close">See the example sheet</button>'}
          <button type="button" class="cs-btn cs-btn-quiet" data-bx="import">Import a character</button>
        </div></div>`;
      return;
    }
    const idx = B_STEPS.findIndex(s => s[0] === B.step);
    const prob = bProblem(B.step);
    const stepper = B_STEPS.map(([id, label], i) => {
      const reach = i <= idx || B_STEPS.slice(0, i).every(s => !bProblem(s[0]));
      return `<li><button type="button" class="cs-b-stepbtn${i === idx ? ' on' : ''}${i < idx ? ' done' : ''}" data-bx="go:${id}"${reach ? '' : ' disabled'}${i === idx ? ' aria-current="step"' : ''}><span class="cs-b-num">${i + 1}</span>${esc(label)}</button></li>`;
    }).join('');
    box.innerHTML = `
      <div class="cs-b-head">
        <h2 class="cs-b-title">${esc(B_STEPS[idx][1])}</h2>
        <button type="button" class="cs-btn cs-btn-quiet cs-btn-sm" data-bx="cancel">Cancel</button>
      </div>
      <ol class="cs-b-steps" aria-label="Builder steps">${stepper}</ol>
      <div class="cs-b-body">${B_VIEWS[B.step]()}</div>
      <div class="cs-b-foot">
        ${idx > 0 ? `<button type="button" class="cs-btn" data-bx="go:${B_STEPS[idx - 1][0]}">Back</button>` : '<span></span>'}
        <span class="cs-b-prob${prob ? ' cs-bad' : ''}" role="status">${esc(prob)}</span>
        ${B.step === 'review'
          ? '<button type="button" class="cs-btn cs-btn-red" data-bx="finish">Create character</button>'
          : `<button type="button" class="cs-btn cs-btn-red" data-bx="go:${B_STEPS[idx + 1][0]}"${prob ? ' disabled' : ''}>Next</button>`}
      </div>`;
    if (focusSel) { const el = $(focusSel, box); if (el) { el.focus(); if (el.setSelectionRange && el.value) el.setSelectionRange(el.value.length, el.value.length); } }
  }
  // re-render only the footer status and the Next button (used while typing)
  function bFoot() {
    const box = $('#cs-builder');
    const prob = bProblem(B.step);
    const p = $('.cs-b-prob', box); if (p) { p.textContent = prob; p.classList.toggle('cs-bad', !!prob); }
    const nx = $('.cs-b-foot [data-bx^="go:"]:last-child', box); if (nx && B.step !== 'review') nx.disabled = !!prob;
  }

  const card = (key, active, title, sub, body) => `<button type="button" class="cs-b-card${active ? ' on' : ''}" data-bx="${key}" aria-pressed="${active}">
    <span class="cs-b-card-t">${esc(title)}</span>${sub ? `<span class="cs-b-card-s">${esc(sub)}</span>` : ''}${body ? `<span class="cs-b-card-b">${body}</span>` : ''}</button>`;

  const B_VIEWS = {
    who() {
      return `<p class="cs-note">Start with who your character is. You can change any of this later on the sheet.</p>
      <div class="cs-b-grid2">
        <label><span class="cs-lbl">Character name</span><input id="b-name" data-bf="name" value="${esc(B.name)}" autocomplete="off"></label>
        <label><span class="cs-lbl">Player</span><input id="b-player" data-bf="player" value="${esc(B.player)}" autocomplete="off"></label>
        <label><span class="cs-lbl">Alignment</span><select id="b-align" data-bf="alignment">${opt('', 'Choose later')}${D.alignments.map(a => opt(a, a, B.alignment)).join('')}</select></label>
        <label><span class="cs-lbl">Deity (optional)</span><input id="b-deity" data-bf="deity" value="${esc(B.deity)}" autocomplete="off"></label>
      </div>`;
    },
    race() {
      const r = bRace();
      const cards = D.races.map(x => card('race:' + x.name, x.name === B.race, x.name, `${x.statsText} · ${x.size} · ${x.speedText}`, '')).join('');
      let detail = '';
      if (r) {
        let picks = '';
        if (r.previousRace) picks += `<label><span class="cs-lbl">Previous race</span><select data-bf="prevRace" id="b-prev" data-rr="1">${opt('', 'Choose')}${D.races.filter(x => !x.previousRace).map(x => opt(x.name, x.name, B.prevRace)).join('')}</select></label>`;
        const src = raceInfo(bChar(true)).statSrc;
        if (src) src.choices.forEach((ch, i) => {
          picks += `<label><span class="cs-lbl">${esc(src.name)}: +${ch.value} to</span><select data-bf="raceChoice.c${i}" id="b-rc${i}" data-rr="1">${opt('', 'Choose a stat')}${ch.options.map(k => opt(k, STAT[k].name, B.raceChoice['c' + i])).join('')}</select></label>`;
        });
        if (r.resistChoice) picks += `<label><span class="cs-lbl">Resistance ${r.resistChoice.value} to</span><select data-bf="raceResist" id="b-res" data-rr="1">${opt('', 'Choose')}${r.resistChoice.options.map(t => opt(t, t, B.raceResist)).join('')}</select></label>`;
        if (r.auto.adaptations) [0, 1].forEach(i => {
          picks += `<label><span class="cs-lbl">Adaptation ${i + 1}</span><select data-bf="adaptations.${i}" id="b-ad${i}" data-rr="1">${opt('', 'Choose')}${r.auto.adaptations.map(a => opt(a.name, a.name, B.adaptations[i])).join('')}</select></label>`;
        });
        detail = `<div class="cs-b-detail">
          <h3 class="cs-h">${link(r.name, 'race.html#' + r.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'))}</h3>
          <p>${esc(r.statsText)} · ${esc(r.size)} ${esc(r.type)} · ${esc(r.speedText)} · Languages: ${esc(r.languages)}</p>
          ${r.abilities.map(a => `<p><b>${esc(a.name)}.</b> ${esc(a.text)}</p>`).join('')}
          ${picks ? `<div class="cs-b-grid2">${picks}</div>` : ''}
        </div>`;
      }
      return `<div class="cs-b-cards">${cards}</div>${detail}`;
    },
    class() {
      const cards = CLASS_NAMES.map(nm => {
        const cl = D.classes[nm];
        return card('class:' + nm, nm === B.cls, nm, `${STAT[cl.primary].name} and ${STAT[cl.secondary].name} · d${cl.hitDie} · ${cl.resource === 'mana' ? 'Mana' : 'Stamina'}`, '');
      }).join('');
      const cl = bClass();
      let detail = '';
      if (cl) {
        const f1 = (cl.features || []).filter(f => f.level <= 1);
        detail = `<div class="cs-b-detail">
          <h3 class="cs-h">${link(B.cls, cl.page)}</h3>
          <p>Hit die d${cl.hitDie} · ${cl.resource === 'mana' ? 'Mana' : 'Stamina'} ${cl.resourceTable[0]} at level 1 · ${cl.slots[0]} ${cl.slotType} slots · ${cl.skillRanks[0]} skill ranks</p>
          <p>Primary ${STAT[cl.primary].name} (+${cl.primaryBonus[0]}), secondary ${STAT[cl.secondary].name} (+${cl.secondaryBonus[0]}) · Saves: Evasion ${cl.saves.evasion}, Body ${cl.saves.body}, Mind ${cl.saves.mind}</p>
          <p>Proficiencies: ${esc((cl.prof || []).join(', ') || 'None')}</p>
          ${f1.map(f => `<p><b>${esc(f.name)}.</b> ${esc(f.text)}</p>`).join('')}
        </div>`;
      }
      return `<div class="cs-b-cards">${cards}</div>${detail}`;
    },
    sub() {
      const cl = bClass();
      if (!cl) return '<p>Pick a class first.</p>';
      const subs = cl.subclasses || {};
      const cards = Object.keys(subs).map(nm => {
        const f1 = subs[nm].filter(f => f.level <= 1);
        return card('sub:' + nm, nm === B.sub, nm, f1.length ? 'Level 1: ' + f1.map(f => f.name).join(', ') : '', '');
      }).join('');
      let detail = '';
      if (B.sub && subs[B.sub]) {
        detail = `<div class="cs-b-detail"><h3 class="cs-h">${esc(B.sub)}</h3>${subs[B.sub].map(f => `<p${f.level > 1 ? ' class="cs-b-later"' : ''}><b>${esc(f.name)}</b> <small>(level ${f.level})</small>. ${esc(f.text)}</p>`).join('')}</div>`;
      }
      return `<div class="cs-b-cards">${cards}</div>${detail}`;
    },
    stats() {
      const d = compute(bChar(true));
      const usedIdx = STAT_KEYS.map(k => B.assign[k]).filter(v => v !== '').map(Number);
      const rows = STAT_KEYS.map(k => {
        const s = d.stat[k];
        let baseCell;
        if (B.method === 'array') {
          baseCell = `<select id="b-as-${k}" data-bas="${k}" aria-label="${STAT[k].name} base">${opt('', '—', String(B.assign[k]))}${STAT_ARRAY.map((v, i) => (usedIdx.includes(i) && String(B.assign[k]) !== String(i)) ? '' : opt(String(i), String(v), String(B.assign[k]))).join('')}</select>`;
        } else {
          baseCell = `<input type="number" class="cs-num" id="b-cu-${k}" data-bcu="${k}" value="${n(B.custom[k])}" min="1" max="30" aria-label="${STAT[k].name} base">`;
        }
        const other = s.parts.filter(p => p[0] !== 'Base' && p[0] !== 'Leveling points').map(p => `${esc(p[0])} ${sign(p[1])}`).join(', ');
        return `<tr><th scope="row">${esc(STAT[k].name)}${k === (bClass() || {}).primary ? ' <small>primary</small>' : k === (bClass() || {}).secondary ? ' <small>secondary</small>' : ''}</th>
          <td>${baseCell}</td><td class="cs-b-other">${other || '—'}</td>
          <td><span class="cs-b-step"><button type="button" class="cs-btn cs-btn-sm" data-bx="pt:${k}:-1" aria-label="Remove a point from ${STAT[k].name}"${n(B.lvl[k]) ? '' : ' disabled'}>−</button><b>${n(B.lvl[k])}</b><button type="button" class="cs-btn cs-btn-sm" data-bx="pt:${k}:1" aria-label="Add a point to ${STAT[k].name}"${bSpent() < bPoints() ? '' : ' disabled'}>+</button></span></td>
          <td class="cs-b-score"><b>${s.score}</b> <span>(${sign(s.mod)})</span></td></tr>`;
      }).join('');
      return `<div class="cs-seg cs-b-method" role="radiogroup" aria-label="Stat method">
          <button type="button" role="radio" aria-checked="${B.method === 'array'}" data-bx="method:array" class="${B.method === 'array' ? 'on' : ''}">Selective Array</button>
          <button type="button" role="radio" aria-checked="${B.method === 'custom'}" data-bx="method:custom" class="${B.method === 'custom' ? 'on' : ''}">GM approved scores</button>
        </div>
        <p class="cs-note">${B.method === 'array' ? `Place each number once: ${STAT_ARRAY.join(', ')}. ${link('Stat Generation', 'stat-generation.html')} explains the array.` : 'Type the base scores your GM approved.'} Race, size, and your class bonuses add on their own. Then spend ${bPoints()} leveling points.</p>
        <div class="cs-table-wrap"><table class="cs-b-stats"><thead><tr><th>Stat</th><th>Base</th><th>Race, size, class</th><th>Leveling points</th><th>Score</th></tr></thead><tbody>${rows}</tbody></table></div>
        <p class="cs-note">Leveling points: ${bSpent()} of ${bPoints()} spent. Modifier = (score − 8) ÷ 2, rounded down.</p>
        <p class="cs-b-preview">Health ${d.hp.total} · AC ${d.ac.total} · Mana ${d.mana.total} · Stamina ${d.stamina.total} · Evasion ${sign(d.save.evasion.total)} · Body ${sign(d.save.body.total)} · Mind ${sign(d.save.mind.total)}</p>`;
    },
    magic() {
      const s = bSlots(), cl = bClass();
      const main = s.kind;
      const other = main === 'spell' ? 'maneuver' : 'spell';
      const mainPicked = main === 'spell' ? B.spells : B.maneuvers;
      const list = kind => {
        const tiers = bTierName(kind);
        const picked = kind === 'spell' ? B.spells : B.maneuvers;
        let pool;
        if (kind === 'spell') {
          const ok = B.allSchools ? ALL_SCHOOLS : COMMON_SCHOOLS.concat(bGrantedSchools());
          pool = D.spells.filter(x => tiers.includes(x[2]) && ok.includes(x[1])).map(x => ({ name: x[0], group: x[1], tier: x[2], href: x[3] }));
        } else {
          pool = D.maneuvers.filter(x => tiers.includes(x[1])).map(x => ({ name: x[0], group: x[1], tier: x[1], href: x[2] }));
        }
        const q = B.filter.trim().toLowerCase();
        if (q) pool = pool.filter(x => x.name.toLowerCase().includes(q) || x.group.toLowerCase().includes(q));
        const groups = {};
        pool.forEach(x => (groups[x.group] = groups[x.group] || []).push(x));
        return Object.keys(groups).sort().map(g => `<div class="cs-b-group"><h4>${esc(g)}</h4><div class="cs-b-picks">${groups[g].map(x => {
          const on = picked.includes(x.name);
          return `<span class="cs-b-pick${on ? ' on' : ''}"><button type="button" data-bx="pick:${kind}:${esc(x.name)}" aria-pressed="${on}">${on ? '✓ ' : ''}${esc(x.name)}</button>${x.href ? link('info', x.href) : ''}</span>`;
        }).join('')}</div></div>`).join('') || '<p class="cs-note">Nothing matches.</p>';
      };
      const granted = bGrantedSchools();
      const word = main === 'spell' ? 'spells' : 'maneuvers';
      return `<p>${esc(B.cls)} learns ${word}. At level 1 you know up to <b>${s.slots}</b> ${bTierName(main).join(' or ')} ${word} (${cl.slots[0]} class slots${s.slots > cl.slots[0] ? ` + ${s.slots - cl.slots[0]} from Memory` : ''}). Picked: <b>${mainPicked.length}</b>.</p>
        ${main === 'spell' ? `<p class="cs-note">Anyone learns ${COMMON_SCHOOLS.join(', ')}.${granted.length ? ` Your class or subclass also opens ${granted.join(', ')}.` : ''} Other schools need a feature that grants them.</p>
        <label class="cs-check"><input type="checkbox" id="b-allsch" data-bchk="allSchools"${B.allSchools ? ' checked' : ''}> Show every school (GM approved)</label>` : ''}
        <label class="cs-b-filter"><span class="cs-lbl">Search</span><input id="b-filter" data-bf="filter" value="${esc(B.filter)}" placeholder="Name or ${main === 'spell' ? 'school' : 'tier'}" autocomplete="off"></label>
        ${list(main)}
        <label class="cs-check cs-b-extra"><input type="checkbox" id="b-extra" data-bchk="extraKind"${B.extraKind ? ' checked' : ''}> A feature also grants me ${other === 'spell' ? 'spells' : 'maneuvers'}</label>
        ${B.extraKind ? `<p class="cs-note">These do not use your slots. Take only what the feature allows. Picked: ${(other === 'spell' ? B.spells : B.maneuvers).length}.</p>${list(other)}` : ''}`;
    },
    gear() {
      const stock = B.shop === 'smith' ? smithStock() : storeStock();
      const q = B.filter.trim().toLowerCase();
      const sections = {};
      stock.filter(it => !q || it.name.toLowerCase().includes(q)).forEach(it => (sections[it.section || 'Items'] = sections[it.section || 'Items'] || []).push(it));
      const gold = bGold();
      const rows = Object.keys(sections).map(sec => `<div class="cs-b-group"><h4>${esc(sec)}</h4>${sections[sec].map(it => {
        const key = `${it.shopName}|${it.name}`, qty = n(B.cart[key]);
        const afford = gold >= it.gp;
        return `<div class="cs-b-item${qty ? ' on' : ''}"><span class="cs-b-item-n"><b>${esc(it.name)}</b><small>${esc(gearInfo(it))}</small></span><span class="cs-b-item-p">${it.gp.toLocaleString('en-US')} GP</span>
          <span class="cs-b-step"><button type="button" class="cs-btn cs-btn-sm" data-bx="cart:${esc(key)}:-1" aria-label="Remove one ${esc(it.name)}"${qty ? '' : ' disabled'}>−</button><b>${qty}</b><button type="button" class="cs-btn cs-btn-sm" data-bx="cart:${esc(key)}:1" aria-label="Add one ${esc(it.name)}"${afford ? '' : ' disabled'}>+</button></span></div>`;
      }).join('')}</div>`).join('') || '<p class="cs-note">Nothing matches.</p>';
      const lines = bCartLines();
      const armors = lines.filter(l => gearKind(l.it) === 'armor'), shields = lines.filter(l => gearKind(l.it) === 'shield');
      const cl = bClass();
      return `<p class="cs-b-purse">Starting gold <b>${START_GOLD.toLocaleString('en-US')} GP</b> · Spent <b>${bCartTotal().toLocaleString('en-US')} GP</b> · Left <b class="${gold < 0 ? 'cs-bad' : ''}">${gold.toLocaleString('en-US')} GP</b></p>
        ${cl ? `<p class="cs-note">${esc(B.cls)} proficiencies: ${esc((cl.prof || []).join(', '))}.</p>` : ''}
        <div class="cs-b-shopcols">
          <div>
            <div class="cs-seg" role="tablist" aria-label="Shop">
              <button type="button" role="tab" aria-selected="${B.shop === 'smith'}" class="${B.shop === 'smith' ? 'on' : ''}" data-bx="shop:smith">General Smithing</button>
              <button type="button" role="tab" aria-selected="${B.shop === 'store'}" class="${B.shop === 'store' ? 'on' : ''}" data-bx="shop:store">General Store</button>
            </div>
            <label class="cs-b-filter"><span class="cs-lbl">Search</span><input id="b-filter" data-bf="filter" value="${esc(B.filter)}" autocomplete="off"></label>
            ${rows}
          </div>
          <aside class="cs-b-cart" aria-label="Your gear">
            <h3 class="cs-h">Your gear</h3>
            ${lines.length ? `<ul>${lines.map(l => `<li><span>${l.qty > 1 ? l.qty + ' × ' : ''}${esc(l.it.name)}</span><b>${(l.it.gp * l.qty).toLocaleString('en-US')} GP</b></li>`).join('')}</ul>` : '<p class="cs-note">Nothing bought yet. Unspent gold stays with you.</p>'}
            ${armors.length ? `<label><span class="cs-lbl">Wear armor</span><select id="b-wear-a" data-bf="wearArmor">${opt('', 'None')}${armors.map(l => opt(l.it.name, l.it.name, B.wearArmor)).join('')}</select></label>` : ''}
            ${shields.length ? `<label><span class="cs-lbl">Carry shield</span><select id="b-wear-s" data-bf="wearShield">${opt('', 'None')}${shields.map(l => opt(l.it.name, l.it.name, B.wearShield)).join('')}</select></label>` : ''}
          </aside>
        </div>`;
    },
    review() {
      const c = bChar(), d = compute(c);
      const st = STAT_KEYS.map(k => `<span><small>${STAT[k].abbr}</small><b>${d.stat[k].score}</b><i>${sign(d.stat[k].mod)}</i></span>`).join('');
      const kn = [].concat(c.spells.map(s => s.name), c.maneuvers.map(m => m.name));
      const warn = d.warnings.filter(w => !/class levels|Pick a class/.test(w));
      return `<div class="cs-b-review">
        <h3 class="cs-b-rname">${esc(c.name)}</h3>
        <p>Level 1 ${esc(c.race)}${c.prevRace ? ` (${esc(c.prevRace)})` : ''} ${esc(B.cls)} · ${esc(B.sub)}${c.alignment ? ' · ' + esc(c.alignment) : ''}</p>
        <div class="cs-b-statrow">${st}</div>
        <p class="cs-b-preview">Health ${d.hp.total} · AC ${d.ac.total} · Physical Armor ${d.pa.total} · Magical Armor ${d.ma.total} · Mana ${d.mana.total} · Stamina ${d.stamina.total} · Speed ${d.speed.text}</p>
        <p><b>Spells and maneuvers:</b> ${kn.length ? esc(kn.join(', ')) : 'None yet'}</p>
        <p><b>Weapons:</b> ${esc(c.weapons.map(w => w.item).join(', '))}</p>
        <p><b>Armor:</b> ${esc(c.armor || 'None')}${c.shield ? ' · <b>Shield:</b> ' + esc(c.shield) : ''}</p>
        ${c.inventory.length ? `<p><b>Pack:</b> ${esc(c.inventory.map(i => (i.qty > 1 ? i.qty + ' × ' : '') + i.name).join(', '))}</p>` : ''}
        <p><b>Gold left:</b> ${c.gold.toLocaleString('en-US')} GP</p>
        ${warn.length ? `<ul class="cs-b-warn">${warn.map(w => `<li>${esc(w)}</li>`).join('')}</ul>` : ''}
        <p class="cs-note">Skill ranks, tools, languages, and feats go on the sheet next.</p>
      </div>`;
    },
  };

  function bInput(e) {
    const el = e.target;
    if (!B) return;
    if (el.tagName === 'SELECT' && e.type !== 'change') return;
    if (el.dataset.bf) {
      const path = el.dataset.bf;
      setPath(B, path, el.value);
      if (path === 'prevRace') B.raceChoice = {};
      if (el.tagName === 'SELECT') bRender('#' + el.id);
      else if (path === 'filter') bRender('#b-filter');
      else bFoot();
      return;
    }
    if (el.dataset.bas && e.type === 'change') { B.assign[el.dataset.bas] = el.value; bRender('#' + el.id); return; }
    if (el.dataset.bcu) { B.custom[el.dataset.bcu] = clamp(n(el.value), 1, 60); if (e.type === 'change') bRender('#' + el.id); return; }
    if (el.dataset.bchk && e.type === 'change') { B[el.dataset.bchk] = el.checked; bRender('#' + el.id); }
  }
  function bClick(e) {
    const t = e.target.closest('[data-bx]');
    if (!t || !B) return;
    e.stopPropagation();
    const [act, ...rest] = t.dataset.bx.split(':');
    const arg = rest.join(':');
    switch (act) {
      case 'go': B.filter = ''; B.step = arg; bRender(); window.scrollTo(0, Math.min(window.scrollY, $('#cs-builder').offsetTop)); return;
      case 'close': closeBuilder(); return;
      case 'import': closeBuilder(); importChar(); return;
      case 'cancel':
        if (B.name || B.race || B.cls) {
          modal('Leave the builder?', '<p>The character you started will not be saved.</p>', [{ label: 'Leave', cls: 'cs-btn-red', fn: closeBuilder }, { label: 'Keep building' }]);
        } else closeBuilder();
        return;
      case 'race':
        if (B.race !== arg) { B.race = arg; B.prevRace = ''; B.raceChoice = {}; B.raceResist = ''; B.adaptations = ['', '']; }
        break;
      case 'class': if (B.cls !== arg) { B.cls = arg; B.sub = ''; B.spells = []; B.maneuvers = []; } break;
      case 'sub': B.sub = arg; break;
      case 'method': B.method = arg; break;
      case 'pt': { const [k, dv] = arg.split(':'); const v = n(B.lvl[k]) + n(dv); if (v >= 0 && bSpent() + n(dv) <= bPoints()) B.lvl[k] = v; break; }
      case 'pick': {
        const i = arg.indexOf(':'); const kind = arg.slice(0, i), name = arg.slice(i + 1);
        const arr = kind === 'spell' ? B.spells : B.maneuvers;
        const at = arr.indexOf(name);
        if (at >= 0) arr.splice(at, 1);
        else {
          const s = bSlots();
          if (kind === s.kind && arr.length >= s.slots) { toast(`Every slot is full (${s.slots}). Remove one first.`, 'dmg'); return; }
          arr.push(name);
        }
        break;
      }
      case 'shop': B.shop = arg; B.filter = ''; break;
      case 'cart': {
        const j = arg.lastIndexOf(':'); const key = arg.slice(0, j), dv = n(arg.slice(j + 1));
        B.cart[key] = Math.max(0, n(B.cart[key]) + dv);
        const lines = bCartLines();
        const arm = lines.filter(l => gearKind(l.it) === 'armor').map(l => l.it.name), sh = lines.filter(l => gearKind(l.it) === 'shield').map(l => l.it.name);
        if (!arm.includes(B.wearArmor)) B.wearArmor = arm[0] || '';
        if (!sh.includes(B.wearShield)) B.wearShield = sh[0] || '';
        break;
      }
      case 'finish': bFinish(); return;
      default: return;
    }
    const id = t.id;
    bRender(id ? '#' + id : null);
    const same = $(`[data-bx="${CSS.escape(t.dataset.bx)}"]`, $('#cs-builder'));
    if (same && !same.disabled) same.focus();
  }
  function bFinish() {
    for (const [id] of B_STEPS) { const p = bProblem(id); if (p) { B.step = id; bRender(); toast(p, 'dmg'); return; } }
    const c = bChar();
    const replace = B.replaceId;
    closeBuilder();
    // the example sheet steps aside for the first real character
    Object.keys(roster.chars).forEach(id => { if (roster.chars[id].example && (id === replace || roster.order.length === 1)) { delete roster.chars[id]; roster.order = roster.order.filter(x => x !== id); } });
    addChar(c, `${esc(c.name)} is ready. Add skill ranks, tools, and feats next.`);
    setTab('character');
  }

  // ------------------------------------------------------------------ actions
  function addChar(c, msg) {
    roster.chars[c.id] = c; roster.order.push(c.id); roster.active = c.id;
    switchTo(c.id);
    if (msg) toast(msg);
  }
  function switchTo(id) {
    roster.active = id;
    fillInputs();
    update(true);
    saveNow();
  }
  function exportChar() {
    const c = char();
    const json = JSON.stringify(c, null, 2);
    const fname = `${(c.name || 'character').replace(/[^\w-]+/g, '_')}_sparks.json`;
    const body = `<p class="cs-note">Save the file, or copy the text and keep it somewhere safe. Import reads either one.</p><textarea class="cs-json" id="cs-json-out" rows="8" readonly>${esc(json)}</textarea>`;
    const btns = [{ label: 'Copy text', fn: m => {
      const ta = m.querySelector('#cs-json-out');
      const done = () => toast('Character copied.');
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(json).then(done, () => { ta.select(); toast('Press Ctrl+C or ⌘C to copy.'); });
      else { ta.select(); toast('Press Ctrl+C or ⌘C to copy.'); }
      return false;
    } }];
    if (CFG.canDownload) btns.unshift({ label: 'Download file', cls: 'cs-btn-red', fn: () => {
      const blob = new Blob([json], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob); a.download = fname;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 2000);
      toast(`Saved ${esc(fname)}.`);
    } });
    btns.push({ label: 'Close' });
    modal(`Export ${c.name || 'character'}`, body, btns);
  }
  function importText(text) {
    let o;
    try { o = JSON.parse(text); } catch (e) { toast('That text is not a character file. Check that you copied all of it.', 'dmg'); return false; }
    let c;
    if (o && o.v === 2 && o.stats) c = upgradeChar(o);
    else if (o && (o.charName !== undefined || o.charRace !== undefined)) c = migrateOld(o);
    else { toast('That file is not a Sparks character.', 'dmg'); return false; }
    c.id = uid(); c.example = false;
    addChar(c, `Imported ${esc(c.name || 'character')}.`);
    return true;
  }
  function importChar() {
    modal('Import a character', `<p class="cs-note">Choose a file you exported, or paste its text below.</p>
      <div class="cs-btnrow"><label class="cs-btn" for="cs-import-file">Choose file</label></div>
      <textarea class="cs-json" id="cs-json-in" rows="7" placeholder="Paste character text here"></textarea>`,
    [{ label: 'Import pasted text', cls: 'cs-btn-red', fn: m => importText(m.querySelector('#cs-json-in').value) }, { label: 'Cancel' }]);
  }
  function renderArt() {
    const c = char();
    const ok = typeof c.art === 'string' && /^data:image\/(png|jpeg|webp|gif);base64,/.test(c.art);
    $('#cs-art').innerHTML = ok ? `<img src="${c.art}" alt="Reference art for ${esc(c.name || 'this character')}">` : '<p class="cs-note">No image yet.</p>';
  }
  function loadArt(file) {
    if (!file || !/^image\//.test(file.type)) { toast('Choose an image file.', 'dmg'); return; }
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const s = Math.min(1, 600 / Math.max(img.width, img.height));
        const cv = document.createElement('canvas');
        cv.width = Math.round(img.width * s); cv.height = Math.round(img.height * s);
        cv.getContext('2d').drawImage(img, 0, 0, cv.width, cv.height);
        char().art = cv.toDataURL('image/jpeg', 0.82);
        renderArt(); update();
      };
      img.onerror = () => toast('That image could not be read.', 'dmg');
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  }
  function addSpell(kind) {
    const c = char();
    const inp = $(kind === 'spell' ? '#add-spell' : '#add-man');
    const name = inp.value.trim();
    if (!name) { toast(`Type a ${kind === 'spell' ? 'spell' : 'maneuver'} name first.`); inp.focus(); return; }
    if (kind === 'spell') {
      const s = SPELL_BY_NAME[name.toLowerCase()];
      c.spells.push(s ? { name: s[0], school: s[1], tier: s[2], href: s[3], notes: '' } : { name, school: '', tier: $('#add-spell-tier').value, href: '', notes: '' });
    } else {
      const m = MAN_BY_NAME[name.toLowerCase()];
      c.maneuvers.push(m ? { name: m[0], tier: m[1], href: m[2], notes: '' } : { name, tier: $('#add-man-tier').value, href: '', notes: '' });
    }
    inp.value = '';
    const d = compute(c);
    if (kind === 'spell') renderTierList('#cs-spells', 'spells', D.spellTiers, d, 'Mana');
    else renderTierList('#cs-mans', 'maneuvers', D.maneuverTiers, d, 'Stamina');
    update();
  }
  function del(path) {
    const parts = path.split('.');
    const idx = n(parts.pop());
    const arr = getPath(char(), parts.join('.'));
    if (!Array.isArray(arr)) return;
    arr.splice(idx, 1);
    update(true);
  }

  function onClick(e) {
    const t = e.target.closest('button, [data-act], label[for]');
    if (!t) { if (!e.target.closest('#cs-pop')) hidePop(); return; }
    const c = char();
    const ds = t.dataset;
    if (ds.tab) { setTab(ds.tab); return; }
    if (ds.break) { e.preventDefault(); showPop(t, breakdownHtml(ds.break)); return; }
    if (ds.info) { showPop(t, infoHtml(ds.info)); return; }
    if (ds.roll) {
      const [k, a] = ds.roll.split(':');
      const d = compute(c);
      if (k === 'init') rollCheck('Initiative', d.init.total);
      if (k === 'save') rollCheck(SAVE_NAME[a], d.save[a].total);
      if (k === 'skill') rollCheck(a, d.skill[a].total);
      if (k === 'tool') rollCheck(c.tools[n(a)].name || 'Tool check', d.tool[n(a)].total);
      if (k === 'cast') { const k2 = d.cast[n(a)]; rollCheck(`${k2.name} ${k2.isSpell ? 'spell' : 'maneuver'} attack`, k2.atk.total); }
      return;
    }
    if (ds.attack !== undefined) { rollAttack(n(ds.attack)); return; }
    if (ds.damage) { const [i, m] = ds.damage.split(':'); rollDamage(n(i), n(m)); return; }
    if (ds.step) { const [k, v] = ds.step.split(':'); const d = compute(c); setCur(k, curOf(k, d) + n(v), d); if (k === 'hp' && curOf('hp', d) <= 0) toggleCondition('Dying', true); update(); return; }
    if (ds.cond) { toggleCondition(ds.cond); if (ds.cond === 'Dying' && !c.conditions.includes('Dying')) c.dying = { fails: 0, rounds: 0, dead: false }; update(); return; }
    if (ds.fail) { const x = n(ds.fail); c.dying.fails = n(c.dying.fails) >= x ? x - 1 : x; checkDeath(c, compute(c)); update(); return; }
    if (ds.forge) { hidePop(); openForge(ds.forge); return; }
    if (ds.unattune) { const mg = getPath(c, ds.unattune); if (mg) mg.attuned = false; fillInputs(); update(true); toast('Unattuned. Its magic is off until you attune it again.'); return; }
    if (ds.del) {
      const mw = /^weapons\.\d+$/.test(ds.del) && getPath(c, ds.del);
      if (mw && mw.magic && n(mw.magic.bonus) > 0) {
        const wc = compute(c).weapon[n(ds.del.split('.')[1])];
        modal('Remove this magic weapon?', `<p>${esc(wc ? wc.title : 'This weapon')} and its magic leave the sheet. Gold you paid is not returned.</p>`,
          [{ label: 'Remove', cls: 'cs-btn-red', fn: () => del(ds.del) }, { label: 'Keep it' }]);
        return;
      }
      del(ds.del); return;
    }
    if (ds.equip !== undefined) { equip(n(ds.equip)); return; }
    if (ds.use !== undefined && t.closest('#cs-inventory')) { useItem(n(ds.use)); return; }
    if (ds.unequip) { unequipTo(c, ds.unequip); renderItems(); renderInventory(); update(true); toast('Moved back to your inventory.'); return; }
    if (ds.totool !== undefined) { const it = c.inventory[n(ds.totool)]; c.tools.push({ name: D.tools.find(x => x.toLowerCase() === it.name.toLowerCase()) || it.name, rank: 0 }); renderTools(compute(c)); renderInventory(); update(); toast(`${it.name} added to Tools on the Skills tab.`); return; }
    if (ds.bedit) { const box = document.getElementById(ds.bedit.replace(/\./g, '-') + '-bedit'); box.hidden = !box.hidden; t.setAttribute('aria-expanded', String(!box.hidden)); if (box.hidden) openEditors.delete(ds.bedit); else openEditors.add(ds.bedit); return; }
    if (ds.addbonus) { const e = getPath(c, ds.addbonus); e.bonuses = e.bonuses || []; e.bonuses.push({ key: 'ac', value: 1, manual: true }); openEditors.add(ds.addbonus); renderItems(); update(true); return; }
    if (ds.cast !== undefined) {
      const s = c.spells[n(ds.cast)];
      const sel = t.parentNode.querySelector('[data-cast-tier]');
      const tier = D.spellTiers.find(x => x.name === (sel ? sel.value : s.tier)) || D.spellTiers[0];
      spend('mana', tier.cost, `${s.name}${tier.name !== s.tier ? ` (upcast to ${tier.name})` : ''}`);
      return;
    }
    if (ds.use !== undefined) {
      const m = c.maneuvers[n(ds.use)];
      const tier = D.maneuverTiers.find(x => x.name === m.tier) || D.maneuverTiers[0];
      spend('stamina', tier.cost, m.name);
      return;
    }
    if (ds.mode) { rollMode = ds.mode; renderRolls(); return; }
    if (ds.die) { const sides = n(ds.die.slice(1)); const r = rnd(sides); logRoll(ds.die, r, `${ds.die} → ${r}`); return; }
    if (t.id === 'cs-dice-fab') {
      const p = $('#cs-rolls'); p.hidden = !p.hidden; t.setAttribute('aria-expanded', String(!p.hidden)); renderRolls(); return;
    }
    switch (ds.act) {
      case 'close-pop': hidePop(); break;
      case 'new': openBuilder(); break;
      case 'new-blank': addChar(blankChar(), 'Blank character started.'); setTab('character'); $('#cs-name').focus(); break;
      case 'start': openBuilder({ replaceId: c.id }); break;
      case 'dup': { const cp = clone(c); cp.id = uid(); cp.name = (c.name || 'Character') + ' (copy)'; cp.example = false; addChar(cp, 'Copy made.'); break; }
      case 'delete':
        modal(`Delete ${c.name || 'this character'}?`, '<p>This removes the character from this browser. Export it first if you want a backup.</p>', [
          { label: 'Delete', cls: 'cs-btn-red', fn: () => {
            delete roster.chars[c.id];
            roster.order = roster.order.filter(id => id !== c.id);
            if (!roster.order.length) { const b = blankChar(); roster.chars[b.id] = b; roster.order = [b.id]; }
            switchTo(roster.order[0]); toast('Character deleted.');
          } }, { label: 'Keep' }]);
        break;
      case 'export': exportChar(); break;
      case 'import': importChar(); break;
      case 'print': $$('.cs-panel').forEach(p => { p.hidden = false; }); window.print(); setTab(tab); break;
      case 'damage': applyDamage($('#dmg-amt').value, $('#dmg-type').value, $('#dmg-true').checked); break;
      case 'heal': heal($('#dmg-amt').value); break;
      case 'partial': rest('partial'); break;
      case 'full': rest('full'); break;
      case 'deathsave': deathSave(); break;
      case 'stabilize': c.cur.hp = 0; toggleCondition('Dying', false); c.dying = { fails: 0, rounds: 0, dead: false }; logRoll('Stabilized', 0, 'Stable at 0 Health. Dying ends.', 'heal'); update(); break;
      case 'clear-cond': c.conditions = []; c.dying = { fails: 0, rounds: 0, dead: false }; update(); break;
      case 'add-weapon': c.weapons.push(newWeapon('')); renderWeapons(compute(c)); update(); break;
      case 'add-tool': c.tools.push({ name: '', rank: 0 }); renderTools(compute(c)); update(); break;
      case 'add-spell': addSpell('spell'); break;
      case 'add-man': addSpell('man'); break;
      case 'add-ring': c.rings.push({}); renderItems(); update(); break;
      case 'add-misc': c.misc.push({}); renderItems(); update(); break;
      case 'add-item': c.inventory.push({ name: '', qty: 1, kg: 0, where: 'Pack', notes: '' }); renderInventory(); update(); $$('#cs-inventory input[data-bind$=".name"]').pop().focus(); break;
      case 'add-res': c.resist.push({ type: '', value: 5, src: '' }); renderResists(compute(c)); update(); break;
      case 'add-feat': {
        const inp = $('#add-feat'); const nm = inp.value.trim();
        if (!nm) { toast('Type a feat name first.'); inp.focus(); break; }
        const f = FEAT_BY_NAME[nm.toLowerCase()];
        c.feats.push({ name: f ? f[0] : nm, href: f ? f[1] : '', notes: '' }); inp.value = '';
        renderFeatures(compute(c)); update(); break;
      }
      case 'add-feature': c.features.push({ name: '', text: '', uses: 0, max: 0, reset: 'full' }); renderFeatures(compute(c)); update(); break;
      case 'clear-art': c.art = ''; renderArt(); update(); break;
      case 'clear-history': c.purchases = []; renderPurchases(); update(); break;
      default: break;
    }
  }
  function setTab(id) {
    tab = id;
    try { localStorage.setItem('sparks-sheet-tab', id); } catch (e) { /* storage blocked */ }
    TABS.forEach(([t]) => {
      const on = t === id;
      $('#cs-panel-' + t).hidden = !on;
      const b = $('#cs-tab-' + t);
      b.setAttribute('aria-selected', String(on));
      b.classList.toggle('on', on);
      b.tabIndex = on ? 0 : -1;
    });
    hidePop();
  }

  // ------------------------------------------------------------------ init
  function init() {
    const root = document.getElementById('cs-app');
    if (!root) return;
    loadRoster();
    root.innerHTML = shell();
    root.addEventListener('input', onInput);
    root.addEventListener('change', e => {
      if (e.target.id === 'cs-roster') { switchTo(e.target.value); return; }
      if (e.target.id === 'cs-import-file') {
        const f = e.target.files[0]; if (!f) return;
        const rd = new FileReader();
        rd.onload = () => { if (importText(rd.result)) $('#cs-modal').hidden = true; };
        rd.readAsText(f); e.target.value = '';
        return;
      }
      if (e.target.id === 'f-art') { loadArt(e.target.files[0]); e.target.value = ''; return; }
      onInput(e);
    });
    root.addEventListener('click', onClick);
    root.addEventListener('keydown', e => {
      if (e.key === 'Escape') { hidePop(); $('#cs-modal').hidden = true; }
      if (e.target.classList && e.target.classList.contains('cs-tab') && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) {
        const i = TABS.findIndex(t => t[0] === tab);
        const j = (i + (e.key === 'ArrowRight' ? 1 : TABS.length - 1)) % TABS.length;
        setTab(TABS[j][0]); $('#cs-tab-' + TABS[j][0]).focus();
      }
      if (e.key === 'Enter' && (e.target.id === 'add-spell' || e.target.id === 'add-man' || e.target.id === 'add-feat')) {
        e.preventDefault(); if (e.target.id === 'add-feat') { onClick({ target: $('[data-act="add-feat"]') }); } else addSpell(e.target.id === 'add-spell' ? 'spell' : 'man');
      }
    });
    document.addEventListener('click', e => { if (!root.contains(e.target)) hidePop(); });
    window.addEventListener('resize', hidePop);
    window.addEventListener('storage', e => {
      if (e.key !== STORE_KEY || !e.newValue) return;
      try {
        const r = JSON.parse(e.newValue);
        if (!r || !r.chars || !r.order) return;
        const keep = roster.active;
        roster = r; Object.values(roster.chars).forEach(upgradeChar);
        roster.active = roster.chars[keep] ? keep : roster.order[0];
        fillInputs(); update(true);
        toast('Updated with your latest shop purchases.');
      } catch (err) { /* ignore a half-written value */ }
    });
    window.addEventListener('scroll', () => { if (!$('#cs-pop').hidden) hidePop(); }, { passive: true });
    fillInputs();
    if (/^#forge/.test(location.hash)) tab = 'combat';
    setTab(tab);
    update(true);
    renderRolls();
    saveNow();
    if (!/^#forge/.test(location.hash) && (location.hash === '#new' || !roster.order.some(id => !roster.chars[id].example))) openBuilder({ landing: location.hash !== '#new' });
    if (/^#forge/.test(location.hash)) {
      const b = Number((location.hash.match(/^#forge-(\d+)$/) || [])[1]);
      openForge('new');
      if (b >= 1 && b <= 10) { const sel = $('#fg-bonus'); if (sel) { sel.value = String(b); sel.dispatchEvent(new Event('input', { bubbles: true })); } }
      try { history.replaceState(null, '', location.pathname + location.search); } catch (e) { /* file:// pages */ }
    }
  }
  // Exposed for tests and for GMs who want to inspect a sheet in the console.
  window.SparksSheet = { compute: () => compute(char()), char: () => char(), roster: () => roster, levelFromXp, modOf, magicOf, magicTitle, openForge, update };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
