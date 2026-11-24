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
      bonus: {},
      rules: defaultRules(),
      updated: Date.now(),
    };
  }
  function defaultRules() {
    return { armorMult: 5, unarmored: 'ten', initStat: 'wits', survivalStat: 'wits', critBase: 'score',
      raceStats: true, weaponStat: 'best', manAtkLevel: false };
  }
  function newWeapon(item) {
    return { item: item || '', name: '', die: '', traits: '', range: '', type: '', prof: true, stat: 'auto', atk: 0, dmg: 0, notes: '' };
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
    const B = k => n(c.bonus[k]);
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
      const score = parts.reduce((a, p) => a + p[1], 0);
      d.stat[k] = { total: score, score, mod: modOf(score), parts,
        classBonus: parts.filter(p => / (primary|secondary)$/.test(p[0])).reduce((a, p) => a + p[1], 0),
        raceBonus: parts.filter(p => /^(Race|Size)/.test(p[0])).reduce((a, p) => a + p[1], 0) };
    });
    const M = k => d.stat[k].mod;
    const S = k => d.stat[k].score;
    const lvRow = D.levels[L - 1];
    d.points = { avail: lvRow.points, spent: STAT_KEYS.reduce((a, k) => a + n(c.stats[k].lvl), 0) };
    if (d.points.spent > d.points.avail) d.warnings.push(`You spent ${d.points.spent} leveling points. Level ${L} allows ${d.points.avail}.`);

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
      if (B('save_' + sv)) parts.push(['Bonus', B('save_' + sv)]);
      d.save[sv] = { total: parts.reduce((a, p) => a + p[1], 0), parts };
    });

    // health and resources
    let parts = [];
    d.cls.forEach(kc => {
      const avg = kc.cls.hitDie / 2 + 1;
      parts.push([`${kc.name} ${kc.level} × ${avg} (d${kc.cls.hitDie} average)`, kc.level * avg]);
    });
    parts.push(['Fortitude modifier', M('fort')]);
    if (B('health')) parts.push(['Bonus', B('health')]);
    d.hp = { total: Math.max(1, parts.reduce((a, p) => a + p[1], 0)), parts };

    const resource = type => {
      const ps = [];
      d.cls.forEach(kc => { if (kc.cls.resource === type) ps.push([`${kc.name} ${kc.level}`, kc.cls.resourceTable[kc.level - 1]]); });
      if (type === 'mana') ps.push(['Charisma modifier', M('cha')]);
      else ps.push(['Fortitude modifier', M('fort')]);
      if (B(type)) ps.push(['Bonus', B(type)]);
      return { total: Math.max(0, ps.reduce((a, p) => a + p[1], 0)), parts: ps };
    };
    d.mana = resource('mana');
    d.stamina = resource('stamina');

    const armorPool = (stat, label, key) => {
      const ps = [[`${R.armorMult} × ${label} modifier (min 0)`, Math.max(0, R.armorMult * M(stat))]];
      if (auto.armorPerLevel) ps.push([`${race.name}: ${auto.armorPerLevel} × level`, auto.armorPerLevel * L]);
      if (B(key)) ps.push(['Bonus', B(key)]);
      return { total: Math.max(0, ps.reduce((a, p) => a + p[1], 0)), parts: ps };
    };
    d.pa = armorPool('fort', 'Fortitude', 'pa');
    d.ma = armorPool('int', 'Intelligence', 'ma');
    d.ta = { total: Math.max(0, B('ta')), parts: [['Bonus (features only)', B('ta')]] };

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
    if (auto.ac) parts.push([race.name, auto.ac]);
    adapt.forEach(a => { if (a.ac) parts.push([a.name, a.ac]); });
    if (n(c.defensiveWielded)) parts.push(['Defensive weapons wielded', n(c.defensiveWielded)]);
    if (B('ac')) parts.push(['Bonus', B('ac')]);
    d.ac = { total: parts.reduce((a, p) => a + p[1], 0), parts };
    parts = [];
    if (arm && arm.penalty) parts.push([arm.name, arm.penalty]);
    if (sh && sh.penalty) parts.push([sh.name, sh.penalty]);
    if (B('armorPen')) parts.push(['Penalty reduction', -B('armorPen')]);
    d.pen = { total: Math.max(0, parts.reduce((a, p) => a + p[1], 0)), parts };

    // crit, initiative, speed, carry
    parts = [[R.critBase === 'score' ? 'Wits score' : 'Wits base score', Math.max(0, R.critBase === 'score' ? S('wits') : n(c.stats.wits.base))]];
    if (auto.crit) parts.push([race.name, auto.crit]);
    if (B('crit')) parts.push(['Bonus', B('crit')]);
    d.crit = { total: parts.reduce((a, p) => a + p[1], 0), parts };
    parts = [[`${STAT[R.initStat].name} modifier`, M(R.initStat)]];
    if (B('init')) parts.push(['Bonus', B('init')]);
    d.init = { total: parts.reduce((a, p) => a + p[1], 0), parts };

    const sp = Object.assign({}, speedSrc ? speedSrc.speed : { walk: 5 });
    adapt.forEach(a => { if (a.speed) Object.keys(a.speed).forEach(k => { sp[k] = Math.max(sp[k] || 0, a.speed[k]); }); });
    const spBonus = B('speed') + (c.hunt && auto.hunt ? 2 : 0);
    parts = [[speedSrc ? `${speedSrc.name} walk speed` : 'Walk speed', sp.walk || 0]];
    if (c.hunt && auto.hunt) parts.push(['The Hunt', 2]);
    if (B('speed')) parts.push(['Bonus', B('speed')]);
    d.speed = { total: (sp.walk || 0) + spBonus, parts,
      text: Object.keys(sp).map(k => `${k === 'walk' ? (sp[k] + spBonus) : sp[k]} ${k[0].toUpperCase() + k.slice(1)}`).join(' · ') };

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
      if (cursed) ps.push(['Cursed', -1]);
      d.skill[sk.name] = { total: ps.reduce((a, p) => a + p[1], 0), parts: ps, stat, rank };
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
    if (B('skillRanks')) parts.push(['Bonus', B('skillRanks')]);
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
      const dcB = B(`dc${kc.i}`), atB = B(`atk${kc.i}`);
      const dcParts = [['Base', 10], [`${STAT[st].name} modifier`, M(st)]];
      if (dcB) dcParts.push(['Bonus', dcB]);
      const atParts = [[`${STAT[st].name} modifier`, M(st)]];
      if (isSpell || R.manAtkLevel) atParts.push(['Level', L]);
      if (cursed) atParts.push(['Cursed', -1]);
      if (atB) atParts.push(['Bonus', atB]);
      return { i: kc.i, name: kc.name, isSpell, stat: st,
        dc: { total: dcParts.reduce((a, p) => a + p[1], 0), parts: dcParts },
        atk: { total: atParts.reduce((a, p) => a + p[1], 0), parts: atParts } };
    });

    // weapons
    d.weapon = c.weapons.map(w => weaponCalc(c, d, w, cursed, auto, race));

    // carrying
    let used = 0;
    c.inventory.forEach(it => { if (it.where !== 'Stored') used += (parseFloat(it.kg) || 0) * (n(it.qty) || 0); });
    if (sh && sh.weight) used += sh.weight;
    parts = [['Strength score × 5 kg', S('str') * 5]];
    if (B('carry')) parts.push(['Bonus', B('carry')]);
    d.carry = { total: parts.reduce((a, p) => a + p[1], 0), parts, used: Math.round(used * 10) / 10 };

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
    d.immune = String(c.immune || '').split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
    d.vuln = String(c.vuln || '').split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
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
  function weaponCalc(c, d, w, cursed, auto, race) {
    const data = weaponData(w);
    if (!data) return null;
    let stat = w.stat;
    if (stat === 'auto') {
      if (c.rules.weaponStat === 'traits') stat = (hasTrait(data, 'Light') || hasTrait(data, 'Ranged (Finesse)')) ? 'fin' : 'str';
      else stat = d.stat.fin.mod > d.stat.str.mod ? 'fin' : 'str';
    }
    const simple = hasTrait(data, 'Simple') || data.name === 'Unarmed Strike' || data.natural;
    const atk = [[`${STAT[stat].name} modifier`, d.stat[stat].mod]];
    if (w.prof || simple) atk.push([simple && !w.prof ? 'Level (simple weapon)' : 'Level (proficient)', d.level]);
    if (c.hunt && auto.hunt) atk.push(['The Hunt', d.level]);
    if (cursed) atk.push(['Cursed', -1]);
    if (n(w.atk)) atk.push(['Bonus', n(w.atk)]);
    const dmg = [[`${STAT[stat].name} modifier`, d.stat[stat].mod]];
    if (auto.damageHalfLevel) dmg.push([`${race.name}: ½ level`, Math.floor(d.level / 2)]);
    if (n(w.dmg)) dmg.push(['Bonus', n(w.dmg)]);
    const needsSkilled = hasTrait(data, 'Skilled');
    return { data, stat, atk: { total: atk.reduce((a, p) => a + p[1], 0), parts: atk },
      dmg: { total: dmg.reduce((a, p) => a + p[1], 0), parts: dmg }, needsSkilled,
      ranged: (data.traits || []).some(t => /^Ranged/i.test(t)) };
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
  function rollAttack(idx) {
    const c = char(), d = compute(c);
    const w = d.weapon[idx];
    if (!w) return;
    const r = d20();
    const tot = r.nat + w.atk.total;
    const critRoll = rnd(100);
    let mult = 1, tag = '';
    if (r.nat === 20) {
      const dec = critRoll <= d.crit.total;
      mult = dec ? 3 : 2;
      tag = dec ? `Natural 20: Decisive Strike (d100 ${critRoll} ≤ ${d.crit.total}). Target is Crippled.` : `Natural 20: Critical Strike (d100 ${critRoll} > ${d.crit.total} for Decisive).`;
    } else if (critRoll <= d.crit.total) {
      mult = 2; tag = `If it hits: Critical Strike (d100 ${critRoll} ≤ ${d.crit.total}).`;
    } else tag = `If it hits: normal hit (d100 ${critRoll} > ${d.crit.total}).`;
    const dm = rollDice(w.data.die, mult);
    const dmgTot = dm.sum + w.dmg.total;
    const ranged = w.ranged ? ' Ranged attacks in melee take −5.' : '';
    logRoll(`${w.data.name} attack`, tot,
      `${esc(r.txt)} ${sign(w.atk.total)}<br>${esc(tag)}<br>Damage <b>${dmgTot}</b> ${esc(w.data.type)} (${mult > 1 ? `${esc(w.data.die)} ×${mult}: ` : ''}${dm.dice.join(' + ') || dm.flat} ${sign(w.dmg.total)})${esc(ranged)}`,
      r.nat === 20 ? 'nat20' : r.nat === 1 ? 'nat1' : '');
  }
  function rollDamage(idx, mult) {
    const c = char(), d = compute(c);
    const w = d.weapon[idx];
    if (!w) return;
    const dm = rollDice(w.data.die, mult);
    logRoll(`${w.data.name} damage${mult === 2 ? ' (critical)' : mult === 3 ? ' (decisive)' : ''}`, dm.sum + w.dmg.total,
      `${esc(w.data.die)}${mult > 1 ? ' ×' + mult : ''}: ${dm.dice.join(' + ') || dm.flat} ${sign(w.dmg.total)} · ${esc(w.data.type)}`);
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
      <button type="button" class="cs-btn" data-act="new">New</button>
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
    <button type="button" class="cs-btn cs-btn-red" data-act="start">Start my character</button>
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
      <label class="cs-span"><span class="cs-lbl">Armor</span><select data-bind="armor" id="f-armor">${opt('', 'No armor')}${['Light', 'Medium', 'Heavy'].map(t => `<optgroup label="${t}">${D.armor.filter(a => a.type === t).map(a => opt(a.name, `${a.name} (AC ${a.ac}${a.maxFin != null && a.maxFin < 25 ? `, Finesse max ${a.maxFin}` : ''}${a.penalty ? `, penalty ${a.penalty}` : ''})`)).join('')}</optgroup>`).join('')}</select></label>
      <label><span class="cs-lbl">Shield</span><select data-bind="shield" id="f-shield">${opt('', 'No shield')}${D.shields.map(s => opt(s.name, `${s.name} (+${s.ac} AC${s.penalty ? `, penalty ${s.penalty}` : ''})`)).join('')}</select></label>
      <label><span class="cs-lbl">Defensive weapons wielded</span>${numIn('defensiveWielded', 'id="f-defw" min="0" max="2"')}</label>
    </div>
    <dl class="cs-dl">
      <div><dt>Armor Class</dt><dd>${brk('ac', 'Armor Class')}</dd></div>
      <div><dt>Armor penalty</dt><dd>${brk('pen', 'Armor penalty')}</dd></div>
    </dl>
    <p class="cs-note">The armor penalty comes off Balance, Heavy Object Interaction, Overpower, Sleight of Hand, Sneak, both Traverse skills, and the Lockpicking Kit.</p>
  </div>
</div>
<div class="cs-box">
  <div class="cs-h-row"><h3 class="cs-h">Weapons</h3><button type="button" class="cs-btn cs-btn-sm" data-act="add-weapon">Add weapon</button></div>
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
    <p class="cs-note">Miscellaneous items need attunement. You start with 3 slots. Attuning takes 10 minutes.</p>
  </div>
</div>
<div class="cs-box">
  <div class="cs-h-row"><h3 class="cs-h">Inventory</h3><span class="cs-meter" data-out="carryText"></span><button type="button" class="cs-btn cs-btn-sm" data-act="add-item">Add item</button></div>
  <div class="cs-carry"><span data-out-style="carryPct"></span></div>
  <div id="cs-inventory"></div>
  <p class="cs-note">Stored items do not count toward carried weight. An equipped shield does.</p>
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
          <button type="button" class="cs-x" data-del="weapons.${i}" aria-label="Remove weapon">×</button>
        </div>
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
        </div>
        <div class="cs-traits">${(data.traits || []).map(t => `<button type="button" class="cs-chip" data-info="trait:${esc(t)}">${esc(t)}</button>`).join('') || '<span class="cs-note">No traits</span>'}</div>
        <div class="cs-form cs-form-inline">
          <label class="cs-check"><input type="checkbox" data-bind="weapons.${i}.prof" id="w${i}-prof" data-type="bool" data-rerender="weapons"> Proficient</label>
          <label><span class="cs-lbl">Stat</span><select data-bind="weapons.${i}.stat" id="w${i}-stat" data-rerender="weapons">${opt('auto', `Auto (${STAT[wc.stat].name})`)}${opt('str', 'Strength')}${opt('fin', 'Finesse')}</select></label>
          <label class="cs-narrow"><span class="cs-lbl">Attack bonus</span>${numIn(`weapons.${i}.atk`, `id="w${i}-atkb" data-rerender="weapons"`)}</label>
          <label class="cs-narrow"><span class="cs-lbl">Damage bonus</span>${numIn(`weapons.${i}.dmg`, `id="w${i}-dmgb" data-rerender="weapons"`)}</label>
        </div>
        ${wc.needsSkilled && !w.prof ? '<p class="cs-note cs-bad">Skilled weapon: you need skilled weapon proficiency.</p>' : ''}
        <div class="cs-btnrow cs-atkrow">
          <button type="button" class="cs-btn cs-btn-red" data-attack="${i}">Attack</button>
          <button type="button" class="cs-btn cs-btn-sm" data-damage="${i}:1">Damage</button>
          <button type="button" class="cs-btn cs-btn-sm" data-damage="${i}:2">Crit ×2</button>
          <button type="button" class="cs-btn cs-btn-sm" data-damage="${i}:3">Decisive ×3</button>
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
  function renderItems() {
    const c = char();
    const slot = (path, label, it) => `<div class="cs-slot"><span class="cs-lbl">${label}</span>
      <input data-bind="${path}.name" id="${path.replace(/\./g, '-')}-name" placeholder="Empty" aria-label="${label} item">
      <select data-bind="${path}.power" id="${path.replace(/\./g, '-')}-power" aria-label="${label} power">${opt('', 'Power')}${D.itemPowers.map(p => opt(p)).join('')}</select>
      <input data-bind="${path}.notes" id="${path.replace(/\./g, '-')}-notes" placeholder="Effect" aria-label="${label} effect"></div>`;
    $('#cs-items').innerHTML = D.itemSlots.map(s => slot(`items.${s}`, s)).join('');
    $('#cs-rings').innerHTML = c.rings.map((r, i) => slot(`rings.${i}`, `Ring ${i + 1}`)).join('');
    $('#cs-misc').innerHTML = c.misc.map((r, i) => slot(`misc.${i}`, `Slot ${i + 1}`)).join('');
    fillInputs($('#cs-items')); fillInputs($('#cs-rings')); fillInputs($('#cs-misc'));
  }
  function renderInventory() {
    const c = char();
    const box = $('#cs-inventory');
    if (!c.inventory.length) { box.innerHTML = '<p class="cs-note">Your pack is empty.</p>'; return; }
    box.innerHTML = `<div class="cs-inv cs-inv-head" aria-hidden="true"><span>Item</span><span>Qty</span><span>kg each</span><span>Where</span><span>Notes</span><span></span></div>` +
      c.inventory.map((it, i) => `<div class="cs-inv">
      <input data-bind="inventory.${i}.name" id="inv${i}-name" placeholder="Item" aria-label="Item name">
      ${numIn(`inventory.${i}.qty`, `id="inv${i}-qty" min="0" aria-label="Quantity"`)}
      <input type="number" inputmode="decimal" step="0.1" min="0" class="cs-num" data-bind="inventory.${i}.kg" data-type="float" id="inv${i}-kg" aria-label="Kilograms each">
      <select data-bind="inventory.${i}.where" id="inv${i}-where" aria-label="Where">${['Carried', 'Pack', 'Stored'].map(x => opt(x)).join('')}</select>
      <input data-bind="inventory.${i}.notes" id="inv${i}-notes" placeholder="Notes" aria-label="Item notes">
      <button type="button" class="cs-x" data-del="inventory.${i}" aria-label="Remove item">×</button></div>`).join('');
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
    $('#cs-race-res').textContent = '';
    $('#cs-race-res').innerHTML = raceTxt;
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
        ${shown.map(f => `<details class="cs-feat${f.level > kc.level ? ' locked' : ''}"><summary><span class="cs-lvl">Lv ${f.level}</span> ${esc(f.name)} <small>${esc(f.src)}</small></summary><p>${esc(f.text).replace(/\n/g, '<br>')}</p></details>`).join('') || '<p class="cs-note">No features yet.</p>'}
      </div>`;
    }).join('') : '<p class="cs-note">Pick a class to list its features.</p>';
    rowList('#cs-feats', 'feats', (f, i) => `<span class="cs-grow cs-spell-name">${link(f.name, f.href)}</span>
      <input data-bind="feats.${i}.notes" id="feat${i}-notes" placeholder="Choice or notes" aria-label="Feat notes" class="cs-grow">`, 'No feats yet.');
    rowList('#cs-features', 'features', (f, i) => `<div class="cs-featedit">
      <input data-bind="features.${i}.name" id="fe${i}-name" placeholder="Feature name" aria-label="Feature name">
      <textarea data-bind="features.${i}.text" id="fe${i}-text" rows="2" placeholder="What it does" aria-label="Feature text"></textarea>
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
    renderTools(d);
    renderTierList('#cs-spells', 'spells', D.spellTiers, d, 'Mana');
    renderTierList('#cs-mans', 'maneuvers', D.maneuverTiers, d, 'Stamina');
    renderItems();
    renderInventory();
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
    }[key] || (key.startsWith('weapon.') ? `${d.weapon[n(key.split('.')[1])].data.name} ${key.endsWith('atk') ? 'attack' : 'damage bonus'}` :
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
    if (ds.del) { del(ds.del); return; }
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
      case 'new': addChar(blankChar(), 'New character started.'); setTab('character'); $('#cs-name').focus(); break;
      case 'start': {
        const ex = c;
        const fresh = blankChar();
        roster.chars[fresh.id] = fresh;
        roster.order = roster.order.filter(id => id !== ex.id);
        delete roster.chars[ex.id];
        roster.order.push(fresh.id);
        switchTo(fresh.id); setTab('character'); $('#cs-name').focus();
        break;
      }
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
    window.addEventListener('scroll', () => { if (!$('#cs-pop').hidden) hidePop(); }, { passive: true });
    fillInputs();
    setTab(tab);
    update(true);
    renderRolls();
    saveNow();
  }
  // Exposed for tests and for GMs who want to inspect a sheet in the console.
  window.SparksSheet = { compute: () => compute(char()), char: () => char(), roster: () => roster, levelFromXp, modOf };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
