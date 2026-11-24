/* Sparks of Dynasty shops. Renders the hub (data-shop="hub") or one shop (data-shop="<id>").
   Needs shops-data.js loaded first (window.SPARKS_SHOPS). */
(function () {
  'use strict';
  const S = window.SPARKS_SHOPS;
  const app = document.getElementById('shop-app');
  if (!S || !app) return;
  const SHOP = Object.fromEntries(S.shops.map(s => [s.id, s]));
  const POWER_COLOR = { Faint: 'faint', Glimmering: 'glim', Exotic: 'exotic', Legendary: 'legend', Mythic: 'mythic', Relic: 'relic' };
  const SLOT_ALIAS = { Belt: 'Waist', Hand: 'Hands' };
  const LIST_KEY = 'sparks-shop-list';
  const ROSTER_KEY = 'sparks-sheet-v2';     // the character sheet's saved characters
  const BUYER_KEY = 'sparks-shop-buyer';
  const TOOLS = ['woodshop toolkit', 'calligraphy tools', 'cartographer kit', 'alchemy kit', 'mathematics toolkit', 'lockpicking kit', "painter's supplies", 'musical instrument', 'tinkering tools', 'gaming sets', 'herbalist kit', 'medicine kit', 'astronomy kit', 'enchanter toolkit', "enchanter's tools", 'blacksmith set'];

  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const slug = s => String(s).toLowerCase().replace(/['’]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const gp = n => n == null ? '' : `${Number(n).toLocaleString('en-US')} GP`;
  const slotOf = it => SLOT_ALIAS[it.slot] || it.slot || '';
  const paras = t => esc(t).split(/\n{2,}/).map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`).join('');
  S.shops.forEach(s => s.items.forEach((it, i) => { it.key = `${s.id}:${slug(it.name)}:${i}`; it.shop = s.id; it.anchor = slug(it.name); }));
  const ITEM = {};
  S.shops.forEach(s => s.items.forEach(it => { ITEM[it.key] = it; }));
  const range = s => {
    const v = s.items.map(i => i.gp).filter(x => x != null);
    return v.length ? `${gp(Math.min(...v))} to ${gp(Math.max(...v))}` : '';
  };

  // ---------------------------------------------------------------- shopping list (this browser only)
  let list = {};
  try { list = JSON.parse(localStorage.getItem(LIST_KEY) || '{}') || {}; } catch (e) { list = {}; }
  Object.keys(list).forEach(k => { if (!ITEM[k]) delete list[k]; });
  const saveList = () => { try { localStorage.setItem(LIST_KEY, JSON.stringify(list)); } catch (e) { /* storage blocked */ } };
  function listTotals() {
    let count = 0, total = 0, varies = 0;
    Object.entries(list).forEach(([k, q]) => { const it = ITEM[k]; count += q; if (it.gp == null) varies += 1; else total += it.gp * q; });
    return { count, total, varies };
  }
  function addToList(key, d) {
    list[key] = Math.max(0, (list[key] || 0) + d);
    if (!list[key]) delete list[key];
    saveList(); renderList(); markButtons();
  }
  function listText() {
    const lines = Object.entries(list).map(([k, q]) => { const it = ITEM[k]; return `${q} × ${it.name} (${SHOP[it.shop].name}) ${it.gp == null ? it.price : gp(it.gp * q)}`; });
    const t = listTotals();
    lines.push(`Total: ${gp(t.total)}${t.varies ? ` plus ${t.varies} item${t.varies > 1 ? 's' : ''} priced by the GM` : ''}`);
    return lines.join('\n');
  }

  // ---------------------------------------------------------------- characters (shared with the character sheet)
  function readRoster() { try { const r = JSON.parse(localStorage.getItem(ROSTER_KEY) || 'null'); return r && r.chars && r.order ? r : null; } catch (e) { return null; } }
  function writeRoster(r) { try { localStorage.setItem(ROSTER_KEY, JSON.stringify(r)); return true; } catch (e) { return false; } }
  function buyerId(r) {
    let id = null; try { id = localStorage.getItem(BUYER_KEY); } catch (e) { /* storage blocked */ }
    return r && r.chars[id] ? id : (r ? (r.chars[r.active] ? r.active : r.order[0]) : null);
  }
  const money = c => Math.max(0, Number(c.gold) || 0);
  function kindOf(it) {
    const nm = it.name.toLowerCase();
    switch (it.shop) {
      case 'marionettes-market': return 'magic';
      case 'grand-elixirs': return it.section === 'Potion Ingredients' ? 'material' : 'consumable';
      case 'black-market': return /coins/i.test(nm) ? 'gear' : 'consumable';
      case 'clouds-pet-shop': return 'companion';
      case 'services': return /servant/.test(nm) ? 'companion' : 'service';
      case 'church':
        if (/^blessing/.test(nm)) return 'boon';
        if (/resurrection|purge|confession/.test(nm)) return 'service';
        if (/silver/.test(nm)) return 'material';
        if (/symbol/.test(nm)) return 'gear';
        return 'consumable';
      default:
        if (TOOLS.includes(nm)) return 'tool';
        if (/acid|smoke bomb|powder keg|dynamite|rations|^oil$|torch|candle|caltrops|ball bearings|parchment|ink/.test(nm)) return 'consumable';
        return 'gear';
    }
  }
  const KIND_NOTE = { magic: 'goes to inventory. Equip it on the character sheet.', consumable: 'goes to inventory. Use it on the character sheet.', material: 'goes to inventory.', tool: 'goes to inventory. Add it to Tools on the character sheet.', gear: 'goes to inventory.', companion: 'goes to inventory as a companion.', boon: 'is added to Other features.', service: 'is recorded in purchase history.' };
  // apply one purchase to a character object
  function applyPurchase(c, it, qty, unit) {
    const kind = kindOf(it), shopName = SHOP[it.shop].name;
    c.gold = money(c) - unit * qty;
    c.inventory = c.inventory || []; c.features = c.features || []; c.purchases = c.purchases || [];
    if (kind === 'boon') {
      if (!c.features.some(f => f.name === it.name)) c.features.push({ name: it.name, text: it.desc || '', uses: 0, max: 0, reset: 'none', fx: (it.effects || []).join('\n') });
    } else if (kind !== 'service') {
      const same = c.inventory.find(x => x.name === it.name && x.shop === shopName && x.kind === kind);
      if (same) same.qty = (Number(same.qty) || 0) + qty;
      else c.inventory.push({ name: it.name, qty, kg: 0, where: kind === 'companion' ? 'Stored' : 'Pack', notes: '', shop: shopName, kind, slot: it.slot || '', power: it.power || '', desc: it.desc || '', paid: unit });
    }
    c.purchases.push({ t: Date.now(), name: it.name, shop: shopName, qty, cost: unit * qty, kind });
    c.updated = Date.now();
    if (c.example) c.example = false;
    return kind;
  }
  function renderBuyer() {
    const box = document.getElementById('sh-buyer');
    if (!box) return;
    const r = readRoster();
    if (!r) { box.innerHTML = '<p>To buy, make a character on the <a href="character-sheet.html">character sheet</a> first. You can still browse and build a list.</p>'; return; }
    const id = buyerId(r), c = r.chars[id];
    box.innerHTML = `<label class="sh-field"><span class="sh-lbl">Shopping as</span><select id="sh-who">${r.order.map(k => `<option value="${esc(k)}"${k === id ? ' selected' : ''}>${esc(r.chars[k].name || 'Unnamed character')}</option>`).join('')}</select></label>
      <div class="sh-purse"><span class="sh-lbl">Gold</span><strong>${esc(gp(money(c)))}</strong></div>
      <a class="sh-sheetlink" href="character-sheet.html">Open character sheet</a>`;
  }
  function openBuy(keys) {
    const r = readRoster();
    if (!r) { toast('Make a character on the character sheet first.'); return; }
    const id = buyerId(r), c = r.chars[id];
    const items = keys.map(k => ITEM[k]);
    const single = items.length === 1;
    const rows = single
      ? (() => { const it = items[0]; return `<div class="sh-brow"><label class="sh-field"><span class="sh-lbl">Price each (GP)</span><input type="number" min="0" step="1" id="sh-m-price" value="${it.gp == null ? '' : it.gp}" placeholder="Ask your GM"></label>
          <label class="sh-field sh-qtyf"><span class="sh-lbl">Quantity</span><input type="number" min="1" step="1" id="sh-m-qty" value="1"></label></div>
          ${it.gp == null ? `<p class="sh-note">Listed price: ${esc(it.price)}. Enter the price your GM set.</p>` : '<p class="sh-note">Change the price if your GM gave you a deal.</p>'}
          <p class="sh-note">${esc(it.name)} ${esc(KIND_NOTE[kindOf(it)])}</p>`; })()
      : `<ul class="sh-mlist">${keys.map(k => `<li><span>${esc(list[k])} × ${esc(ITEM[k].name)}</span><strong>${esc(gp(ITEM[k].gp * list[k]))}</strong></li>`).join('')}</ul>`;
    const modal = document.getElementById('sh-modal');
    modal.firstElementChild.innerHTML = `<h2 id="sh-m-title">${single ? `Buy ${esc(items[0].name)}` : `Buy ${items.length} items`}</h2>
      <p class="sh-note">For <strong>${esc(c.name || 'Unnamed character')}</strong> · ${esc(gp(money(c)))} in their purse</p>
      ${rows}
      <div class="sh-total sh-mtotal"><span>Cost</span><strong id="sh-m-cost"></strong></div>
      <p class="sh-note" id="sh-m-left"></p>
      <div class="sh-list-btns"><button type="button" class="sh-btn sh-btn-buy" id="sh-m-ok">Buy</button><button type="button" class="sh-btn sh-btn-quiet" id="sh-m-cancel">Cancel</button></div>`;
    modal.hidden = false;
    const price = document.getElementById('sh-m-price'), qty = document.getElementById('sh-m-qty');
    const calc = () => single ? Math.max(0, Number(price.value) || 0) * Math.max(1, Math.floor(Number(qty.value) || 1)) : keys.reduce((a, k) => a + ITEM[k].gp * list[k], 0);
    const refresh = () => {
      const cost = calc(), left = money(c) - cost, ok = left >= 0 && (!single || price.value !== '');
      document.getElementById('sh-m-cost').textContent = gp(cost);
      document.getElementById('sh-m-left').textContent = single && price.value === '' ? 'Enter a price to buy.' : left >= 0 ? `${gp(left)} left after buying.` : `Not enough gold. ${c.name || 'This character'} needs ${gp(-left)} more.`;
      document.getElementById('sh-m-ok').disabled = !ok;
    };
    if (single) { price.addEventListener('input', refresh); qty.addEventListener('input', refresh); (price.value === '' ? price : qty).focus(); }
    refresh();
    document.getElementById('sh-m-cancel').onclick = () => { modal.hidden = true; };
    document.getElementById('sh-m-ok').onclick = () => {
      const fresh = readRoster(); if (!fresh || !fresh.chars[id]) { toast('That character was removed. Pick another.'); modal.hidden = true; renderBuyer(); return; }
      const ch = fresh.chars[id];
      if (calc() > money(ch)) { toast('Not enough gold.'); refresh(); return; }
      const names = [];
      if (single) { const q = Math.max(1, Math.floor(Number(qty.value) || 1)), u = Math.max(0, Number(price.value) || 0); applyPurchase(ch, items[0], q, u); names.push(items[0].name); }
      else keys.forEach(k => { applyPurchase(ch, ITEM[k], list[k], ITEM[k].gp); names.push(ITEM[k].name); delete list[k]; });
      if (!writeRoster(fresh)) { toast('This browser blocked saving, so nothing was bought.'); return; }
      if (!single) { saveList(); renderList(); markButtons(); }
      modal.hidden = true; renderBuyer();
      toast(`Bought ${names.length === 1 ? names[0] : names.length + ' items'} for ${ch.name || 'your character'}. ${gp(money(ch))} left.`);
    };
  }

  // ---------------------------------------------------------------- shared pieces
  function shopNav(active) {
    return `<nav class="sh-nav" aria-label="Shops">
      <a href="shops.html"${active === 'hub' ? ' aria-current="page" class="on"' : ''}>All shops</a>
      ${S.shops.map(s => `<a href="${esc(s.page)}"${active === s.id ? ' aria-current="page" class="on"' : ''}>${esc(s.name)}</a>`).join('')}
    </nav>`;
  }
  function itemCard(it, showShop) {
    const long = (it.desc || '').length > 260;
    const meta = [];
    if (showShop) meta.push(`<a class="sh-chip sh-chip-shop" href="${esc(SHOP[it.shop].page)}#${esc(it.anchor)}">${esc(SHOP[it.shop].name)}</a>`);
    if (it.section) meta.push(`<span class="sh-chip">${esc(it.section)}</span>`);
    if (it.slot) meta.push(`<span class="sh-chip">${esc(slotOf(it))} slot</span>`);
    if (it.power) meta.push(`<span class="sh-chip sh-pow sh-pow-${POWER_COLOR[it.power]}"><span class="sh-dot" aria-hidden="true"></span>${esc(it.power)}</span>`);
    if (it.rarity) meta.push(`<span class="sh-chip">Rarity: ${esc(it.rarity)}</span>`);
    return `<article class="sh-item" id="${esc(it.anchor)}" data-key="${esc(it.key)}">
      <header class="sh-item-head">
        <h3 class="sh-item-name">${esc(it.name)}</h3>
        <span class="sh-price${it.gp == null ? ' sh-price-text' : ''}">${esc(it.price || '—')}</span>
      </header>
      ${meta.length ? `<div class="sh-meta">${meta.join('')}</div>` : ''}
      ${it.desc ? `<div class="sh-desc${long ? ' sh-clamp' : ''}">${paras(it.desc)}</div>` : '<p class="sh-desc sh-none">No description yet.</p>'}
      <div class="sh-item-foot">
        ${long ? '<button type="button" class="sh-more" data-more aria-expanded="false">Read more</button>' : '<span></span>'}
        <span class="sh-btnpair"><button type="button" class="sh-add" data-add="${esc(it.key)}">Add to list</button><button type="button" class="sh-buy" data-buy="${esc(it.key)}">Buy</button></span>
      </div>
    </article>`;
  }
  function chrome(inner, active) {
    return `<div class="sh-wrap">${shopNav(active)}<div class="sh-buyer" id="sh-buyer"></div>${inner}</div>
    <div class="sh-modal-back" id="sh-modal" hidden><div class="sh-modal" role="dialog" aria-modal="true" aria-labelledby="sh-m-title"></div></div>
    <button type="button" class="sh-fab" id="sh-fab" aria-expanded="false" aria-controls="sh-list">Shopping list <span id="sh-fab-count"></span></button>
    <aside class="sh-list" id="sh-list" hidden aria-label="Shopping list">
      <div class="sh-list-head"><h2>Shopping list</h2><button type="button" class="sh-x" data-close aria-label="Close">×</button></div>
      <ol id="sh-list-items" class="sh-list-items"></ol>
      <div class="sh-list-foot">
        <div class="sh-total"><span>Total</span><strong id="sh-total"></strong></div>
        <p class="sh-note" id="sh-varies"></p>
        <div class="sh-list-btns"><button type="button" class="sh-btn sh-btn-buy" data-checkout>Buy everything</button><button type="button" class="sh-btn" data-copy>Copy list</button><button type="button" class="sh-btn sh-btn-quiet" data-clear>Clear</button></div>
        <p class="sh-note">Buy everything charges the character picked at the top of the page. Items your GM prices stay on the list. Buy those one at a time.</p>
      </div>
    </aside>
    <div class="sh-toast" id="sh-toast" role="status" aria-live="polite"></div>`;
  }
  function renderList() {
    const box = document.getElementById('sh-list-items');
    if (!box) return;
    const entries = Object.entries(list);
    box.innerHTML = entries.length ? entries.map(([k, q]) => {
      const it = ITEM[k];
      return `<li><div class="sh-li-name"><a href="${esc(SHOP[it.shop].page)}#${esc(it.anchor)}">${esc(it.name)}</a><small>${esc(SHOP[it.shop].name)} · ${esc(it.price)} each</small></div>
        <div class="sh-qty"><button type="button" data-dec="${esc(k)}" aria-label="One fewer">−</button><span>${q}</span><button type="button" data-inc="${esc(k)}" aria-label="One more">+</button></div>
        <strong class="sh-li-cost">${it.gp == null ? esc(it.price) : esc(gp(it.gp * q))}</strong></li>`;
    }).join('') : '<li class="sh-empty">Nothing yet. Press Add to list on any item.</li>';
    const t = listTotals();
    document.getElementById('sh-total').textContent = gp(t.total);
    document.getElementById('sh-varies').textContent = t.varies ? `Plus ${t.varies} item${t.varies > 1 ? 's' : ''} the GM prices.` : '';
    document.getElementById('sh-fab-count').textContent = t.count ? `· ${t.count} · ${gp(t.total)}` : '';
  }
  function markButtons() {
    document.querySelectorAll('[data-add]').forEach(b => {
      const q = list[b.dataset.add] || 0;
      b.textContent = q ? `In list (${q}) · Add another` : 'Add to list';
      b.classList.toggle('on', !!q);
    });
  }
  let toastT = null;
  function toast(msg) {
    const t = document.getElementById('sh-toast');
    t.textContent = msg; t.classList.add('show');
    clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 2600);
  }

  // ---------------------------------------------------------------- hub page
  function renderHub() {
    const total = S.shops.reduce((a, s) => a + s.items.length, 0);
    app.innerHTML = chrome(`
      <header class="sh-head">
        <h1 class="sh-title">Shops</h1>
        <p class="sh-sub">${S.shops.length} shops and ${total} goods and services. Search everything at once or open a shop.</p>
      </header>
      <div class="sh-search">
        <label for="sh-q" class="sh-lbl">Find an item</label>
        <input id="sh-q" type="search" placeholder="Try ring, potion, horse, or poison" autocomplete="off">
      </div>
      <div id="sh-results" class="sh-results" aria-live="polite"></div>
      <div class="sh-tiles" id="sh-tiles">
        ${S.shops.map(s => `<a class="sh-tile" href="${esc(s.page)}">
          <h2>${esc(s.name)}</h2>
          <p>${esc(s.subtitle)}</p>
          <span class="sh-tile-meta">${s.items.length} items${range(s) ? ` · ${esc(range(s))}` : ''}</span>
        </a>`).join('')}
      </div>
      <p class="sh-note">Prices and descriptions come from the <a href="https://docs.google.com/spreadsheets/d/1rRpI9rE2s8JoGJAy7q9ke17nCecQUnDwkTuSyR9ce88/edit#gid=0" target="_blank" rel="noopener">Shops sheet</a>. Your GM sets final prices.</p>`, 'hub');
    const q = document.getElementById('sh-q');
    const res = document.getElementById('sh-results');
    const tiles = document.getElementById('sh-tiles');
    q.addEventListener('input', () => {
      const term = q.value.trim().toLowerCase();
      if (term.length < 2) { res.innerHTML = ''; tiles.hidden = false; return; }
      const hits = [];
      S.shops.forEach(s => s.items.forEach(it => {
        const inName = it.name.toLowerCase().includes(term);
        if (inName || (it.desc || '').toLowerCase().includes(term) || (it.slot || '').toLowerCase() === term) hits.push([inName ? 0 : 1, it]);
      }));
      hits.sort((a, b) => a[0] - b[0] || a[1].name.localeCompare(b[1].name));
      tiles.hidden = true;
      res.innerHTML = `<p class="sh-count">${hits.length} result${hits.length === 1 ? '' : 's'} for “${esc(q.value.trim())}”</p>` +
        (hits.length ? `<div class="sh-grid">${hits.slice(0, 80).map(h => itemCard(h[1], true)).join('')}</div>` : '<p class="sh-none">Nothing matches. Check the spelling or try a shorter word.</p>');
      markButtons();
    });
  }

  // ---------------------------------------------------------------- shop page
  function renderShop(s) {
    const slots = s.hasSlots ? [...new Set(s.items.map(slotOf).filter(Boolean))].sort() : [];
    const powers = s.hasPower ? S.powers.filter(p => s.items.some(i => i.power === p)) : [];
    document.title = `Sparks | ${s.name}`;
    app.innerHTML = chrome(`
      <header class="sh-head">
        <h1 class="sh-title">${esc(s.name)}</h1>
        <p class="sh-sub">${esc(s.subtitle)} · ${s.items.length} items${range(s) ? ` · ${esc(range(s))}` : ''}</p>
      </header>
      ${s.hasPower ? `<div class="sh-legend"><span class="sh-lbl">Item power</span>${S.powers.map(p => `<span class="sh-pow sh-pow-${POWER_COLOR[p]}"><span class="sh-dot" aria-hidden="true"></span>${p}</span>`).join('')}<p class="sh-note">${esc(S.notes[s.id] || '')}</p></div>` : ''}
      <div class="sh-tools" role="search">
        <label class="sh-field sh-grow"><span class="sh-lbl">Search</span><input id="sh-q" type="search" placeholder="Search ${esc(s.name)}" autocomplete="off"></label>
        ${s.sections.length ? `<label class="sh-field"><span class="sh-lbl">Section</span><select id="sh-sec"><option value="">All sections</option>${s.sections.map(x => `<option>${esc(x)}</option>`).join('')}</select></label>` : ''}
        ${slots.length ? `<label class="sh-field"><span class="sh-lbl">Slot</span><select id="sh-slot"><option value="">All slots</option>${slots.map(x => `<option>${esc(x)}</option>`).join('')}</select></label>` : ''}
        ${powers.length ? `<label class="sh-field"><span class="sh-lbl">Power</span><select id="sh-pow"><option value="">All powers</option>${powers.map(x => `<option>${esc(x)}</option>`).join('')}</select></label>` : ''}
        <label class="sh-field"><span class="sh-lbl">Sort</span><select id="sh-sort">
          <option value="sheet">Shop order</option><option value="name">Name A to Z</option><option value="low">Price, low to high</option><option value="high">Price, high to low</option>
        </select></label>
      </div>
      <p class="sh-count" id="sh-count" aria-live="polite"></p>
      <div class="sh-grid" id="sh-grid"></div>`, s.id);
    const $ = id => document.getElementById(id);
    function draw() {
      const term = ($('sh-q').value || '').trim().toLowerCase();
      const sec = $('sh-sec') ? $('sh-sec').value : '';
      const slot = $('sh-slot') ? $('sh-slot').value : '';
      const pow = $('sh-pow') ? $('sh-pow').value : '';
      let items = s.items.filter(it => (!term || it.name.toLowerCase().includes(term) || (it.desc || '').toLowerCase().includes(term))
        && (!sec || it.section === sec) && (!slot || slotOf(it) === slot) && (!pow || it.power === pow));
      const sort = $('sh-sort').value;
      if (sort === 'name') items = items.slice().sort((a, b) => a.name.localeCompare(b.name));
      if (sort === 'low' || sort === 'high') items = items.slice().sort((a, b) => {
        if (a.gp == null) return 1; if (b.gp == null) return -1;
        return sort === 'low' ? a.gp - b.gp : b.gp - a.gp;
      });
      $('sh-count').textContent = items.length === s.items.length ? `Showing all ${items.length} items` : `Showing ${items.length} of ${s.items.length} items`;
      $('sh-grid').innerHTML = items.length ? items.map(it => itemCard(it, false)).join('') : '<p class="sh-none">Nothing matches. Clear the search or pick another filter.</p>';
      markButtons();
    }
    ['sh-q', 'sh-sec', 'sh-slot', 'sh-pow', 'sh-sort'].forEach(id => { const el = $(id); if (el) el.addEventListener(id === 'sh-q' ? 'input' : 'change', draw); });
    draw();
    // jump to an item linked from search: #item-name
    const focusHash = () => {
      const id = decodeURIComponent(location.hash.slice(1));
      if (!id) return;
      const el = document.getElementById(id);
      if (el) { el.scrollIntoView({ block: 'center' }); el.classList.add('sh-hit'); setTimeout(() => el.classList.remove('sh-hit'), 2400); }
    };
    setTimeout(focusHash, 60);
    window.addEventListener('hashchange', focusHash);
  }

  // ---------------------------------------------------------------- events and start
  app.addEventListener('click', e => {
    const b = e.target.closest('button');
    if (!b) return;
    if (b.dataset.more !== undefined) {
      const d = b.closest('.sh-item').querySelector('.sh-desc');
      const open = d.classList.toggle('sh-open');
      b.textContent = open ? 'Show less' : 'Read more'; b.setAttribute('aria-expanded', String(open));
    }
    if (b.dataset.add) { addToList(b.dataset.add, 1); toast(`Added ${ITEM[b.dataset.add].name} to your list.`); }
    if (b.dataset.buy) openBuy([b.dataset.buy]);
    if (b.dataset.checkout !== undefined) {
      const keys = Object.keys(list).filter(k => ITEM[k].gp != null);
      if (!keys.length) toast(Object.keys(list).length ? 'Every item left needs a price from your GM. Buy them one at a time.' : 'Your list is empty.');
      else openBuy(keys);
    }
    if (b.dataset.inc) addToList(b.dataset.inc, 1);
    if (b.dataset.dec) addToList(b.dataset.dec, -1);
    if (b.id === 'sh-fab' || b.dataset.close !== undefined) {
      const p = document.getElementById('sh-list'); p.hidden = !p.hidden;
      document.getElementById('sh-fab').setAttribute('aria-expanded', String(!p.hidden));
    }
    if (b.dataset.clear !== undefined) { list = {}; saveList(); renderList(); markButtons(); toast('List cleared.'); }
    if (b.dataset.copy !== undefined) {
      const text = listText();
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(() => toast('List copied.'), () => toast('Copy failed. Select the list and copy it by hand.'));
      else toast('Copy is not available in this browser.');
    }
  });
  app.addEventListener('change', e => { if (e.target.id === 'sh-who') { try { localStorage.setItem(BUYER_KEY, e.target.value); } catch (err) { /* storage blocked */ } renderBuyer(); } });
  window.addEventListener('storage', e => { if (e.key === ROSTER_KEY) renderBuyer(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { const m = document.getElementById('sh-modal'); if (m && !m.hidden) { m.hidden = true; return; } }
    if (e.key === 'Escape') { const p = document.getElementById('sh-list'); if (p && !p.hidden) { p.hidden = true; document.getElementById('sh-fab').setAttribute('aria-expanded', 'false'); } } });

  const id = app.dataset.shop;
  if (id === 'hub') renderHub(); else if (SHOP[id]) renderShop(SHOP[id]); else app.innerHTML = '<p>Shop not found.</p>';
  renderList();
  renderBuyer();
})();
