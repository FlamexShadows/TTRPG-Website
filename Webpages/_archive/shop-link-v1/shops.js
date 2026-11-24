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
        <button type="button" class="sh-add" data-add="${esc(it.key)}">Add to list</button>
      </div>
    </article>`;
  }
  function chrome(inner, active) {
    return `<div class="sh-wrap">${shopNav(active)}${inner}</div>
    <button type="button" class="sh-fab" id="sh-fab" aria-expanded="false" aria-controls="sh-list">Shopping list <span id="sh-fab-count"></span></button>
    <aside class="sh-list" id="sh-list" hidden aria-label="Shopping list">
      <div class="sh-list-head"><h2>Shopping list</h2><button type="button" class="sh-x" data-close aria-label="Close">×</button></div>
      <ol id="sh-list-items" class="sh-list-items"></ol>
      <div class="sh-list-foot">
        <div class="sh-total"><span>Total</span><strong id="sh-total"></strong></div>
        <p class="sh-note" id="sh-varies"></p>
        <div class="sh-list-btns"><button type="button" class="sh-btn" data-copy>Copy list</button><button type="button" class="sh-btn sh-btn-quiet" data-clear>Clear</button></div>
        <p class="sh-note">The list stays in this browser. Show it to your GM to buy.</p>
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
    if (b.dataset.add) { addToList(b.dataset.add, 1); toast(`Added ${ITEM[b.dataset.add].name}.`); }
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
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { const p = document.getElementById('sh-list'); if (p && !p.hidden) { p.hidden = true; document.getElementById('sh-fab').setAttribute('aria-expanded', 'false'); } } });

  const id = app.dataset.shop;
  if (id === 'hub') renderHub(); else if (SHOP[id]) renderShop(SHOP[id]); else app.innerHTML = '<p>Shop not found.</p>';
  renderList();
})();
