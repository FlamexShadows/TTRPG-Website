#!/usr/bin/env python3
"""Add magic items to the shops.

Reads docs/items-to-add.md (format in docs/ADD-ITEMS-FORMAT.md). For each item it:
  1. adds the item to the shop's list in Webpages/shops-data.js
  2. writes an item page, Webpages/<item-name>.html
  3. updates the item count in the shop page description

Run:  python tools/add_items.py [file.md] [--check]
--check validates the file and changes nothing.
"""
import sys, re, json, html, shutil, datetime
from pathlib import Path

HERE = Path(__file__).resolve().parent
BASE = next((p for p in (HERE, HERE.parent) if (p / 'Webpages').is_dir()), HERE)
WEB = BASE / 'Webpages'
DATA = WEB / 'shops-data.js'
MARK = '<!-- added by add_items.py -->'
KEYS = {'shop', 'price', 'weight', 'section', 'rarity', 'power', 'slot', 'page', 'description', 'effects'}

def slug(name):
    s = name.lower().replace("'", '').replace('’', '')
    return re.sub(r'[^a-z0-9]+', '-', s).strip('-')

def load_data():
    raw = DATA.read_text(encoding='utf-8')
    head = raw[:raw.index('window.SPARKS_SHOPS')]
    body = raw[raw.index('{'):raw.rindex('}') + 1]
    return head, json.loads(body)

def dump_data(head, data):
    text = head + 'window.SPARKS_SHOPS = ' + json.dumps(data, indent=1, ensure_ascii=False) + ';\n'
    return text.replace('\r\n', '\n').replace('\n', '\r\n')

def parse(md_path):
    items, errors = [], []
    shop_default, cur, field = None, None, None
    for n, line in enumerate(md_path.read_text(encoding='utf-8').splitlines(), 1):
        s = line.strip()
        m = re.match(r'^#\s+Shop:\s*(.+)$', s, re.I)
        if m:
            shop_default = m.group(1).strip(); cur = None; field = None; continue
        if s.startswith('# '):
            continue                       # other title lines are notes
        m = re.match(r'^##\s+(.+)$', s)
        if m:
            cur = {'name': m.group(1).strip(), 'line': n, 'shop': shop_default, 'description': [], 'effects': []}
            items.append(cur); field = None; continue
        if cur is None or s.startswith('<!--') or s.startswith('>'):
            continue
        m = re.match(r'^([A-Za-z]+):\s*(.*)$', s)
        if m and m.group(1).lower() in KEYS:
            key, val = m.group(1).lower(), m.group(2).strip()
            field = key
            if key == 'description':
                cur['description'] = [val] if val else []
            elif key == 'effects':
                cur['effects'] = [val] if val else []
            else:
                cur[key] = val
            continue
        if field == 'description':
            cur['description'].append(s if s else '')
        elif field == 'effects':
            if s.startswith('- '):
                cur['effects'].append(s[2:].strip())
            elif s:
                errors.append(f'line {n}: an effect line must start with "- "')
        elif s:
            errors.append(f'line {n}: "{s[:40]}" is not a known field. Fields: Shop, Price, Weight, Section, Rarity, Power, Slot, Page, Description, Effects.')
    return items, errors

def price_of(text):
    t = text.strip()
    m = re.fullmatch(r'(\d[\d,]*(?:\.\d+)?|\.\d+)\s*(gp)?', t, re.I)
    if m:
        gp = float(m.group(1).replace(',', ''))
        gp = int(gp) if gp == int(gp) else gp
        return f'{gp:,} GP', gp
    return t, None                          # "Varies", "See Desc" and the like

def weight_of(text):
    t = text.strip().lower()
    if t in ('', '-', '\u2014', 'none'):
        return None, None
    m = re.fullmatch(r'(\d+(?:\.\d+)?|\.\d+)\s*(kg)?', t)
    if not m:
        return None, f'Weight "{text}" must be a number of kilograms, such as 0.5 kg.'
    kg = float(m.group(1))
    return (int(kg) if kg == int(kg) else kg), None

def desc_text(lines):
    out, para = [], []
    for l in lines + ['']:
        if l:
            para.append(l)
        elif para:
            out.append(' '.join(para)); para = []
    return '\n\n'.join(out)

def build(items, data):
    shops = {s['id']: s for s in data['shops']}
    byname = {s['name'].lower(): s['id'] for s in data['shops']}
    errors, ready, seen = [], [], set()
    taken = {i['page']: f'"{i["name"]}" in {s["name"]}' for s in data['shops'] for i in s['items'] if i.get('page')}
    for it in items:
        where = f'"{it["name"]}" (line {it["line"]})'
        sid = (it.get('shop') or '').strip()
        sid = sid if sid in shops else byname.get(sid.lower(), slug(sid))
        if sid not in shops:
            errors.append(f'{where}: shop "{it.get("shop")}" not found. Use one of: ' + ', '.join(s['name'] for s in data['shops'])); continue
        shop = shops[sid]
        if not it.get('price'):
            errors.append(f'{where}: Price is missing.'); continue
        price, gp = price_of(it['price'])
        desc = desc_text(it['description'])
        if not desc:
            errors.append(f'{where}: Description is missing.')
        sec = it.get('section', '')
        if shop['sections'] and sec not in shop['sections']:
            errors.append(f'{where}: Section "{sec}" is not in {shop["name"]}. Use one of: ' + ', '.join(shop['sections']))
        if not shop['sections'] and sec:
            errors.append(f'{where}: {shop["name"]} has no sections. Remove the Section line.')
        power = it.get('power', '')
        if power and power not in data['powers']:
            errors.append(f'{where}: Power "{power}" is not one of: ' + ', '.join(data['powers']))
        if shop['hasPower'] and not power:
            errors.append(f'{where}: {shop["name"]} needs a Power line (' + ', '.join(data['powers']) + ').')
        if not shop['hasPower'] and power:
            errors.append(f'{where}: {shop["name"]} does not use Power. Use Rarity or remove the line.')
        if shop['hasSlots'] and not it.get('slot'):
            errors.append(f'{where}: {shop["name"]} needs a Slot line.')
        if any(i['name'].lower() == it['name'].lower() for i in shop['items']):
            errors.append(f'{where}: the shop already has an item with this name. Rename it or remove the old one first.')
        key = (sid, it['name'].lower())
        if key in seen:
            errors.append(f'{where}: listed twice in this file.')
        seen.add(key)
        want_page = it.get('page', 'yes').lower() not in ('no', 'false', 'n')
        pf = WEB / f'{slug(it["name"])}.html'
        if want_page and pf.name in taken:
            errors.append(f'{where}: the page {pf.name} already belongs to {taken[pf.name]}. Rename the item or add "Page: no".')
        if want_page:
            taken[pf.name] = f'"{it["name"]}" in {shop["name"]}'
        if want_page and pf.exists() and MARK not in pf.read_text(encoding='utf-8', errors='ignore'):
            errors.append(f'{where}: {pf.name} already exists and is a different page. Rename the item or add "Page: no".')
        kg, werr = weight_of(it.get('weight', ''))
        if werr:
            errors.append(f'{where}: {werr}')
        entry = {'name': it['name'], 'price': price, 'gp': gp, 'section': sec}
        if kg is not None: entry['kg'] = kg
        if it.get('slot'): entry['slot'] = it['slot']
        if it.get('rarity'): entry['rarity'] = it['rarity']
        entry['desc'] = desc
        if power: entry['power'] = power
        if it['effects']: entry['effects'] = it['effects']
        if want_page: entry['page'] = pf.name
        ready.append((shop, entry))
    return errors, ready

PAGE = '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sparks | {name}</title>
    <link rel="icon" type="image/svg+xml" href="favicon.svg">
    <link rel="stylesheet" type="text/css" href="styles.css"/>
    {mark}
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
{lines}
{paras}
        </div>
    </div>
</body>
</html>
'''

def page_html(shop, e):
    E = lambda t: html.escape(t, quote=False)
    rows = [('Price', E(e['price'])),
            ('Shop', f'<a href="{shop["page"]}#{slug(e["name"])}">{E(shop["name"])}</a>')]
    if e.get('kg') is not None: rows.append(('Weight', f'{e["kg"]} kg'))
    if e.get('section'): rows.append(('Section', E(e['section'])))
    if e.get('slot'): rows.append(('Slot', E(e['slot'])))
    if e.get('rarity'): rows.append(('Rarity', E(e['rarity'])))
    if e.get('power'): rows.append(('Power', E(e['power'])))
    lines = '\n'.join(f'            <b>{k}:</b>  {v}<br>' for k, v in rows)
    paras = '\n'.join(f'            <p>{E(p)}</p>' for p in e['desc'].split('\n\n'))
    if e.get('effects'):
        paras += '\n            <b>Sheet effects:</b><br>\n' + '\n'.join(f'            {E(x)}<br>' for x in e['effects'])
    return PAGE.format(name=E(e['name']), mark=MARK, lines=lines, paras=paras)

def main():
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    check = '--check' in sys.argv
    md = Path(args[0]) if args else BASE / 'docs' / 'items-to-add.md'
    if not md.exists():
        sys.exit(f'File not found: {md}')
    items, errors = parse(md)
    if not items:
        sys.exit('No items found. Each item starts with a line like "## Item Name".')
    head, data = load_data()
    e2, ready = build(items, data)
    errors += e2
    if errors:
        print(f'{len(errors)} problem(s). Nothing was changed.\n')
        for e in errors: print(' -', e)
        sys.exit(1)
    if check:
        print(f'OK. {len(ready)} item(s) are valid. Nothing was changed.'); return
    arch = BASE / '_archive'; arch.mkdir(exist_ok=True)
    shutil.copy2(DATA, arch / f'shops-data (before add_items {datetime.datetime.now():%Y%m%d-%H%M%S}).js')
    touched = {}
    for shop, e in ready:
        shop['items'].append(e)
        touched[shop['id']] = shop
        if e.get('page'):
            (WEB / e['page']).write_text(page_html(shop, e), encoding='utf-8', newline='\n')
    DATA.write_text(dump_data(head, data), encoding='utf-8', newline='')
    for sid, shop in touched.items():
        pf = WEB / shop['page']
        if pf.exists():
            t = pf.read_text(encoding='utf-8')
            t2 = re.sub(r'\b\d+ items with prices', f'{len(shop["items"])} items with prices', t)
            if t2 != t: pf.write_text(t2, encoding='utf-8', newline='')
    for shop, e in ready:
        print(f'Added {e["name"]} to {shop["name"]}' + (f' and wrote {e["page"]}' if e.get('page') else ''))
    print(f'\nDone. {len(ready)} item(s) added.')

if __name__ == '__main__':
    main()
