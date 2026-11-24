#!/usr/bin/env python3
"""
Sparks of Dynasty: keep the website in line with the Basic Rules .docx.

How to use
  1. Save your Basic Rules .docx in the TTRPG Website folder (next to this file).
  2. Double-click "Update Rules.bat".
     Or drag any .docx onto "Update Rules.bat".
     Or double-click "Watch Rules.bat" and leave it open: it rebuilds every time you save the docx.

What it does
  - Rebuilds every Basic Rules page from the docx (one page per chapter group, see PAGES below).
    A new chapter in the docx gets its own page and a link in the Basic Rules menu.
  - Rebuilds the Basic Rules menu in a-header.html.
  - Refreshes rules boxes inside other pages. Put these two comments around any spot you want kept in sync:
        <!-- BASIC-RULES: Martial Maneuvers and Spells / Upcasting -->  <!-- /BASIC-RULES -->
    (chapter / section, as named by the docx headings; join several with ;)
  - Fixes old terms on every other page so they match the Basic Rules (see SWAPS below).
    That includes the Eleventy spell files in src/spells/ and the page templates in src/.
  - Checks every page for terms the Basic Rules do not define and lists them in rules-report.txt.
  - Backs up every file it changes to _archive/auto/<date and time>/ first.

Needs only Python 3.8 or newer. No extra packages.
Options: --check (report only, change nothing), --watch (rebuild on every save), --docx PATH
"""
import sys, os, re, html, json, zipfile, shutil, time, datetime, glob
import xml.etree.ElementTree as ET

HERE = os.path.dirname(os.path.abspath(__file__))
WEB = os.path.join(HERE, 'Webpages')
SRC = os.path.join(HERE, 'src')  # Eleventy source: spell files and page templates
ARCHIVE = os.path.join(HERE, '_archive', 'auto')
REPORT = os.path.join(HERE, 'rules-report.txt')

# ---------------------------------------------------------------------------
# Settings you can edit
# ---------------------------------------------------------------------------

# Page file, page title, menu label (None keeps it out of the Basic Rules menu), docx chapters (Heading 1 titles)
PAGES = [
    ('common-terms.html', 'Common Terms', 'Common Terms', ['Common Terms']),
    ('combat.html', 'Combat Rules', 'Quick Combat Rules',
     ['Combat Rules', 'Movement', 'Sizes', 'Action Points', 'Damage Types', 'Measurements', 'Combat DCs',
      'Critical and Decisive Strikes', 'Armor', 'Vision Types', 'Resting']),
    ('conditions.html', 'Conditions', 'Conditions', ['Conditions']),
    ('creature-types.html', 'Creature Types', 'Creature Types', ['Creature Types']),
    ('languages.html', 'Languages', 'Languages', ['Languages']),
    ('leveling.html', 'Leveling', 'Leveling', ['Leveling in Sparks']),
    ('magic-items.html', 'Magic Items', 'Magic Items', ['Magic Items']),
    ('maneuvers-and-spells.html', 'Maneuvers and Spells', 'Maneuvers and Spells', ['Martial Maneuvers and Spells']),
    ('sheet-formulas.html', 'Sheet Formulas', 'Sheet Formulas', ['Sheet Formulas']),
    ('skills.html', 'Skills and Saves', 'Skills', ['Skills', 'Saves']),
    ('statistics.html', 'Statistics', 'Statistics', ['Statistics']),
    ('race.html', 'Races', None, ['Races']),
]

# Old wording -> Basic Rules wording. Applied to the text of every page the docx does not build,
# plus the spell generator and the sheet and shop data. Each entry: (pattern, replacement, keep_case)
# keep_case=True copies the capital letter of the old word onto the new one.
SWAPS = [
    # Damage types (Basic Rules: Damage Types)
    (r'\b(?:lightning|thunder|sonic|electric(?:al|ity)?|shock) damage\b', 'air damage', True),
    (r'\bacid damage\b', 'earth damage', True),
    (r'\b(?:frost|ice) damage\b', 'cold damage', True),
    (r'\bradiant damage\b', 'holy damage', True),
    (r'\bforce damage\b', 'magic damage', True),
    (r'\bwater damage\b', 'bludgeoning damage', True),
    # Statistics
    (r'\bDexterity\b', 'Finesse', False),
    (r'\bConstitution\b', 'Fortitude', False),
    # Saves (Basic Rules: Saves)
    (r'\bResistance \((?:Mental|Mind)\)|\bResistance (?:Mental|Mind)\b', 'Resistance (Mind)', False),
    (r'\bResistance \((?:Physical|Body)\)|\bResistance (?:Physical|Body)\b', 'Resistance (Body)', False),
    (r'\bevasion (?=(?:save|check)s?\b)', 'Evasion ', False),
    (r'\b(Evasion|Resistance \((?:Mind|Body)\)) check(s?)\b', r'\1 save\2', None),
    (r'\bsaving throw(s?)\b', r'save\1', None),
    # Conditions (Basic Rules: Conditions)
    (r'\bfrightened\b', 'fearful', True),
    (r'\bblinded\b', 'blind', True),
    (r'\bdeafened\b', 'deaf', True),
    (r'\bhasted\b', 'hastened', True),
    (r'\bknocked prone\b', 'knocked down', True),
    # Vision types (Basic Rules: Vision Types)
    (r'\bdark ?sight\b|\bdark ?vision\b', 'Dark Sight', False),
    (r'\btrue ?sight\b|\btrue vision\b', 'True Vision', False),
    (r'\bwitch ?sight\b', 'Witch Sight', False),
    (r'\bblind ?sight\b', 'Blind Sight', False),
    (r'\bsupernatural vision\b', 'Supernatural Vision', False),
    # Skills
    (r'\bperception check(s?)\b', r'Sense Environment check\1', None),
    # Names and spellings
    (r'\bMarrisa\b', 'Marissa', False),
    (r'\bKenderkai\b', 'Kendarkai', False),
    (r'\bDragon kin\b', 'Dragonkin', False),
    # Units: the Basic Rules measure in meters
    (r'\b(\d+(?:\.\d+)?) ?(ft|feet|foot)\b', 'FEET', None),
    (r'\b(\d+(?:\.\d+)?) ?miles?\b', 'MILES', None),
]

# Extra files the swaps also run on (paths from this folder)
EXTRA_FILES = ['generate_spells.py', 'Webpages/character-sheet-data.js', 'Webpages/shops-data.js']

# Pages the swaps never touch (built by other tools)
SKIP_PAGES = {'a-header.html', 'character-sheet.html', 'index.html'}

# Words that come before "damage" without naming a type. The report ignores them.
NOT_TYPES = set('''the this that these deals deal dealt takes take taken half any all and or modifier much to of
statistic incoming attack attacks no its it double more is does did lasting other devastating suffer massive your great
for normal one chosen area different extra additional total same weapon weapons spell spells fall falling bonus rolled
their his her damage maximum minimum full less least most increased reduced reduce increase base critical decisive
melee ranged physical magical alignment elemental true twice triple doubled tripled further whatever every each
potential direct initial ongoing continuous splash bonus normal regular unarmed natural an a as by on in with from
which what was were be been being have has had also not only even then than determined randomly random
same equal enough'''.split())

# ---------------------------------------------------------------------------

W = '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'


def say(*a):
    try:
        print(*a)
    except UnicodeEncodeError:
        print(*(str(x).encode('ascii', 'replace').decode() for x in a))


def slug(t):
    return re.sub(r'[^a-z0-9]+', '-', t.lower()).strip('-')


def norm(t):
    return re.sub(r'\s+', ' ', t).strip().lower()


# ---------------------------------------------------------------------------
# Reading the docx
# ---------------------------------------------------------------------------

def find_docx(arg=None):
    if arg:
        return os.path.abspath(arg)
    cands = [f for f in glob.glob(os.path.join(HERE, '*.docx')) if not os.path.basename(f).startswith('~$')]
    if not cands:
        return None
    pref = [f for f in cands if 'basic rules' in os.path.basename(f).lower().replace('_', ' ')]
    pool = pref or cands
    return max(pool, key=os.path.getmtime)


def on(el, tag):
    """True when a run property such as w:b is present and not switched off."""
    x = el.find(W + tag) if el is not None else None
    if x is None:
        return False
    v = x.get(W + 'val')
    return v not in ('0', 'false', 'none')


def read_docx(path):
    z = zipfile.ZipFile(path)
    doc = ET.fromstring(z.read('word/document.xml'))
    names = {}
    if 'word/styles.xml' in z.namelist():
        for s in ET.fromstring(z.read('word/styles.xml')).iter(W + 'style'):
            n = s.find(W + 'name')
            names[s.get(W + 'styleId')] = (n.get(W + 'val') if n is not None else s.get(W + 'styleId')).lower()
    fmt = {}
    if 'word/numbering.xml' in z.namelist():
        nx = ET.fromstring(z.read('word/numbering.xml'))
        absf = {}
        for a in nx.iter(W + 'abstractNum'):
            lv = {}
            for l in a.iter(W + 'lvl'):
                nf = l.find(W + 'numFmt')
                lv[l.get(W + 'ilvl')] = nf.get(W + 'val') if nf is not None else 'bullet'
            absf[a.get(W + 'abstractNumId')] = lv
        for n in nx.iter(W + 'num'):
            a = n.find(W + 'abstractNumId')
            if a is not None:
                fmt[n.get(W + 'numId')] = absf.get(a.get(W + 'val'), {})
    body = doc.find(W + 'body')
    blocks = []
    for el in body:
        if el.tag == W + 'p':
            b = para(el, names, fmt)
            if b:
                blocks.append(b)
        elif el.tag == W + 'tbl':
            rows = []
            for tr in el.iter(W + 'tr'):
                cells = []
                for tc in tr.findall(W + 'tc'):
                    segs = []
                    for p in tc.iter(W + 'p'):
                        s = runs(p)
                        if s and segs:
                            segs.append([' ', False, False])
                        segs += s
                    cells.append(merge(segs))
                if cells:
                    rows.append(cells)
            if rows:
                blocks.append({'kind': 'table', 'rows': rows})
    return blocks


def runs(p):
    out = []

    def walk(node, deleted=False):
        for ch in node:
            t = ch.tag
            if t in (W + 'del', W + 'moveFrom'):
                continue
            if t == W + 'r':
                rp = ch.find(W + 'rPr')
                b = on(rp, 'b')
                i = on(rp, 'i') or (rp is not None and rp.find(W + 'highlight') is not None)
                for x in ch:
                    if x.tag == W + 't':
                        out.append([x.text or '', b, i])
                    elif x.tag == W + 'tab':
                        out.append([' ', b, i])
                    elif x.tag in (W + 'br', W + 'cr'):
                        out.append([' ', b, i])
            elif t in (W + 'pPr', W + 'rPr'):
                continue
            else:
                walk(ch)
    walk(p)
    return out


def merge(segs):
    m = []
    for t, b, i in segs:
        if m and m[-1][1] == b and m[-1][2] == i:
            m[-1][0] += t
        else:
            m.append([t, b, i])
    # trim
    while m and not m[0][0].strip():
        m.pop(0)
    while m and not m[-1][0].strip():
        m.pop()
    if m:
        m[0][0] = m[0][0].lstrip()
        m[-1][0] = m[-1][0].rstrip()
    return m


def para(p, names, fmt):
    ppr = p.find(W + 'pPr')
    style = ''
    num = None
    if ppr is not None:
        ps = ppr.find(W + 'pStyle')
        if ps is not None:
            sid = ps.get(W + 'val')
            style = names.get(sid, sid.lower())
        np_ = ppr.find(W + 'numPr')
        if np_ is not None:
            nid = np_.find(W + 'numId')
            il = np_.find(W + 'ilvl')
            if nid is not None and nid.get(W + 'val') != '0':
                lv = fmt.get(nid.get(W + 'val'), {})
                num = 'ul' if lv.get(il.get(W + 'val') if il is not None else '0', 'bullet') in ('bullet', 'none') else 'ol'
    segs = merge(runs(p))
    text = ''.join(s[0] for s in segs)
    if not text.strip():
        return None
    st = style.replace(' ', '')
    m = re.match(r'heading(\d)', st)
    if m:
        return {'kind': 'h' + m.group(1), 'text': text.strip()}
    if st in ('title', 'subtitle'):
        return {'kind': st, 'text': text.strip()}
    if num or 'listbullet' in st or 'listnumber' in st:
        return {'kind': num or ('ol' if 'number' in st else 'ul'), 'segs': segs}
    return {'kind': 'p', 'segs': segs, 'text': text}


def chapters(blocks):
    ch, order, cur = {}, [], None
    for b in blocks:
        if b['kind'] == 'h1':
            cur = b['text']
            ch[cur] = []
            order.append(cur)
        elif cur:
            ch[cur].append(b)
    return ch, order


# ---------------------------------------------------------------------------
# Writing HTML
# ---------------------------------------------------------------------------

def inl(segs):
    o = []
    for t, b, i in segs:
        e = html.escape(t)
        if i:
            e = f'<em>{e}</em>'
        if b:
            e = f'<strong>{e}</strong>'
        o.append(e)
    return ''.join(o)


def is_label(b):
    return (b['kind'] == 'p' and b['segs'] and b['segs'][0][1] and b['segs'][0][0].rstrip().endswith(':')
            and len(b['text']) <= 160)


def body(blocks, cond=False):
    out = []
    open_cond = False
    i = 0
    while i < len(blocks):
        b = blocks[i]
        k = b['kind']
        if k == 'h2':
            t = b['text']
            if cond:
                if open_cond:
                    out.append('</div>')
                out.append(f'<div class="condition" id="{slug(t)}"><h3>{html.escape(t)}</h3>')
                open_cond = True
            else:
                out.append(f'<h3 id="{slug(t)}">{html.escape(t)}</h3>')
        elif k in ('h3', 'h4', 'h5', 'h6'):
            out.append(f'<h4>{html.escape(b["text"])}</h4>')
        elif k == 'table':
            rows = b['rows']
            h = ''.join(f'<th>{inl([[s[0], False, s[2]] for s in c])}</th>' for c in rows[0])
            bd = ''.join('<tr>' + ''.join(f'<td>{inl(c)}</td>' for c in r) + '</tr>' for r in rows[1:])
            out.append(f'<div class="table-wrap" style="overflow-x:auto"><table class="list-table rules-table">'
                       f'<thead><tr>{h}</tr></thead><tbody>{bd}</tbody></table></div>')
        elif k in ('ul', 'ol'):
            items = []
            while i < len(blocks) and blocks[i]['kind'] == k:
                items.append(f'<li>{inl(blocks[i]["segs"])}</li>')
                i += 1
            out.append(f'<{k}>' + ''.join(items) + f'</{k}>')
            continue
        elif k == 'p':
            if is_label(b) and i + 1 < len(blocks) and is_label(blocks[i + 1]):
                grp = []
                while i < len(blocks) and is_label(blocks[i]):
                    grp.append(inl(blocks[i]['segs']))
                    i += 1
                out.append('<p>' + '<br>'.join(grp) + '</p>')
                continue
            out.append(f'<p>{inl(b["segs"])}</p>')
        i += 1
    if open_cond:
        out.append('</div>')
    return '\n'.join(out)


SEARCH = '''<div class="condition-search-container"><input class="condition-search-input" id="cond-q" type="search" placeholder="Search conditions" aria-label="Search conditions"></div>
<script>document.getElementById('cond-q').addEventListener('input',function(){var q=this.value.toLowerCase();document.querySelectorAll('.condition').forEach(function(c){c.style.display=c.textContent.toLowerCase().indexOf(q)>-1?'':'none';});});</script>'''


def page_html(title, secs, revised):
    return f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sparks | {html.escape(title)}</title>
    <meta name="description" content="Sparks of Dynasty Basic Rules: {html.escape(title)}. Updated {revised}.">
    <link rel="icon" type="image/svg+xml" href="favicon.svg">
    <link rel="stylesheet" type="text/css" href="styles.css"/>
    <style>.rules-table th,.rules-table td{{text-align:left;vertical-align:top}} .rules-toc{{text-align:center}} .rules-rev{{text-align:center;font-style:italic;color:var(--ink-muted)}}</style>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script>$(function(){{ $("#header-placeholder").load("a-header.html"); }});</script>
</head>
<body>
    <!-- Built from the Basic Rules docx by update_rules.py. Edit the docx, not this file. -->
    <div id="header-placeholder"></div>
    <div class="main-content">
        <div class="content-panel">
            <h2>{html.escape(title)}</h2>
            <p class="rules-rev">Basic Rules, updated {revised}</p>
{secs}
        </div>
    </div>
</body>
</html>
'''


def build_pages(ch, order, revised, warn):
    found = {norm(c): c for c in order}
    used = set()
    pages = []
    for fn, title, label, chs in PAGES:
        real = []
        for c in chs:
            if norm(c) in found:
                real.append(found[norm(c)])
                used.add(norm(c))
            else:
                warn.append(f'The docx has no chapter called "{c}" (wanted by {fn}).')
        if real:
            pages.append((fn, title, label, real))
    for c in order:
        if norm(c) not in used:
            pages.append((slug(c) + '.html', c, c, [c]))
            say(f'  New chapter "{c}" gets its own page: {slug(c)}.html')
    out = {}
    for fn, title, label, chs in pages:
        secs = []
        multi = len(chs) > 1
        if multi:
            secs.append('<p class="rules-toc">' + ' · '.join(f'<a href="#{slug(c)}">{html.escape(c)}</a>' for c in chs) + '</p>')
        elif fn == 'race.html':
            names = [b['text'] for b in ch[chs[0]] if b['kind'] == 'h2']
            secs.append('<p class="rules-toc">' + ' · '.join(f'<a href="#{slug(n)}">{html.escape(n)}</a>' for n in names) + '</p>')
        for idx, c in enumerate(chs):
            if multi and idx > 0:
                secs.append(f'<h2 id="{slug(c)}">{html.escape(c)}</h2>')
            if norm(c) == 'conditions':
                secs.append(SEARCH)
            secs.append(body(ch[c], cond=(norm(c) == 'conditions')))
        out[fn] = (title, label, page_html(title, '\n'.join(secs), revised))
    return out


def build_nav(header, pages):
    links = [(lab, fn) for fn, (t, lab, h) in pages.items() if lab]  # PAGES order, new chapters last
    block = ('<!-- RULES-NAV:START (built by update_rules.py) -->\n'
             + ''.join(f'                <a href="{fn}">{html.escape(lab)}</a>\n' for lab, fn in links)
             + '                <!-- RULES-NAV:END -->')
    if 'RULES-NAV:START' in header:
        return re.sub(r'<!-- RULES-NAV:START.*?RULES-NAV:END -->', lambda m: block, header, count=1, flags=re.S)
    m = re.search(r'(<div class="dropdown-header">[^<]*Core Rules[^<]*</div>\s*)((?:<a [^>]*>[^<]*</a>\s*)+)', header)
    if not m:
        return None
    return header[:m.end(1)] + block + '\n            ' + header[m.end(2):].lstrip()


# ---------------------------------------------------------------------------
# Rules boxes inside other pages
#   <!-- BASIC-RULES: Chapter / Section; Chapter / Section --> ... <!-- /BASIC-RULES -->
# Everything between the two comments is rebuilt from the docx on every run.
# ---------------------------------------------------------------------------

MARK = re.compile(r'(<!-- BASIC-RULES:\s*(.*?)\s*-->)(.*?)(<!-- /BASIC-RULES -->)', re.S)


def section_blocks(ch, order, ref):
    found = {norm(c): c for c in order}
    parts = [p.strip() for p in ref.split('/')]
    c = found.get(norm(parts[0]))
    if not c:
        return None, None
    if len(parts) == 1:
        return c, ch[c]
    out, inside = [], False
    for b in ch[c]:
        if b['kind'] == 'h2':
            inside = norm(b['text']) == norm(parts[1])
            continue
        if inside:
            out.append(b)
    return parts[1], (out or None)


def fill_markers(src, ch, order, warn, fn):
    def f(m):
        html_parts = []
        for k, ref in enumerate(r for r in m.group(2).split(';') if r.strip()):
            title, blocks = section_blocks(ch, order, ref)
            if blocks is None:
                warn.append(f'{fn}: the docx has no section "{ref.strip()}".')
                continue
            if k > 0:
                html_parts.append(f'<h4>{html.escape(title)}</h4>')
            html_parts.append(body(blocks))
        return m.group(1) + '\n' + '\n'.join(html_parts) + '\n' + m.group(4)
    return MARK.sub(f, src)


# ---------------------------------------------------------------------------
# Terms the Basic Rules define, read straight from the docx
# ---------------------------------------------------------------------------

def rule_terms(ch, order):
    found = {norm(c): c for c in order}

    def h2s(name):
        c = found.get(norm(name))
        return [b['text'] for b in ch.get(c, []) if b['kind'] == 'h2'] if c else []

    types = set()
    for t in h2s('Damage Types'):
        for w in re.split(r',|\band\b', t):
            if w.strip():
                types.add(w.strip().lower())
    c = found.get('damage types')
    if c:
        for b in ch[c]:
            txt = b.get('text') or ''
            m = re.search(r'four types: ([^.]+)', txt)
            if m:
                for w in re.split(r',|\band\b', m.group(1)):
                    if w.strip():
                        types.add(w.strip().lower())
    types |= {'physical', 'magical'}
    schools, ranks = set(), set()
    c = found.get('martial maneuvers and spells')
    if c:
        for b in ch[c]:
            txt = b.get('text') or ''
            m = re.search(r'schools of magic are ([^.]+)', txt)
            if m:
                schools = {w.strip() for w in re.split(r',|\band\b', m.group(1)) if w.strip()}
            m = re.search(r'ranked by the mana they cost: ([^.]+)', txt)
            if m:
                ranks = {w.strip() for w in re.split(r',|\band\b', m.group(1)) if w.strip()}
    return {'types': types, 'schools': schools, 'ranks': ranks,
            'conditions': {re.sub(r'\s*\(.*\)', '', t).lower() for t in h2s('Conditions')}}


# ---------------------------------------------------------------------------
# Swaps and checks on the other pages
# ---------------------------------------------------------------------------

def _rep(m, new, keep):
    if new == 'FEET':
        n = round(float(m.group(1)) * 0.3, 1)
        return f'{n:g} meter' if m.group(2).lower() == 'foot' else f'{n:g} meters'
    if new == 'MILES':
        n = round(float(m.group(1)) * 1.6, 1)
        return f'{n:g} kilometers'
    if keep is None:
        return m.expand(new)
    if keep and m.group(0)[:1].isupper():
        return new[:1].upper() + new[1:]
    if keep:
        return new[:1].lower() + new[1:]
    return new


COMPILED = [(re.compile(p, re.I), new, keep) for p, new, keep in SWAPS]


def swap_text(t, counts):
    for rx, new, keep in COMPILED:
        def f(m, new=new, keep=keep):
            r = _rep(m, new, keep)
            if r != m.group(0):
                counts[m.group(0) + ' -> ' + r] = counts.get(m.group(0) + ' -> ' + r, 0) + 1
            return r
        t = rx.sub(f, t)
    return t


def swap_html(src, counts):
    parts = re.split(r'(<[^>]+>)', src)
    skip = False
    for i, p in enumerate(parts):
        if p.startswith('<'):
            tl = p.lower()
            if re.match(r'<(script|style|title)\b', tl):
                skip = True
            elif re.match(r'</(script|style|title)\b', tl):
                skip = False
            continue
        if not skip and p.strip():
            parts[i] = swap_text(p, counts)
    return ''.join(parts)


def swap_code(src, counts):
    # only touch text inside quotes
    return re.sub(r'"(?:[^"\\\n]|\\.)*"|\'(?:[^\'\\\n]|\\.)*\'', lambda m: swap_text(m.group(0), counts), src)


def plain(src):
    t = re.sub(r'<(script|style)\b.*?</\1>', ' ', src, flags=re.S | re.I)
    return html.unescape(re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', ' ', t)))


SPELL_LABELS = [('range', 'Range'), ('ap', 'AP Cost'), ('casting_time', 'Casting Time'), ('action_cost', 'Action Cost'),
                ('rank', 'Spell Rank'), ('school', 'Class'), ('subtype', 'Subtype'), ('requirements', 'Requirements'),
                ('duration', 'Duration'), ('concentration', 'Concentration')]


def spell_plain(md):
    # A spell file reads like its page for the checks: "Spell Rank: Adept ... Class: Pyromancy ..." then the text.
    parts = md.split('\n---\n', 1)
    vals = {}
    for line in parts[0].splitlines()[1:]:
        k, _, v = line.partition(':')
        try:
            vals[k.strip()] = json.loads(v.strip())
        except ValueError:
            vals[k.strip()] = v.strip().strip('"')
    head = ' '.join(f'{label}: {vals[key]}' for key, label in SPELL_LABELS if isinstance(vals.get(key), str))
    return head + ' ' + (parts[1] if len(parts) > 1 else '')


def check_page(fn, src, terms, issues):
    t = plain(src)
    for m in re.finditer(r'\b([A-Za-z]+) damage\b', t):
        w = m.group(1).lower()
        if w not in terms['types'] and w not in NOT_TYPES:
            issues.append((fn, f'damage type "{m.group(1)}" is not in Damage Types', t[max(0, m.start() - 50):m.end() + 30]))
    if terms['schools']:
        low = {s.lower() for s in terms['schools']}
        m = re.search(r'\bSpell Rank: \w+.{0,200}?\bClass: ([A-Z][a-z]+)', t)
        if m and m.group(1).lower() not in low:
            issues.append((fn, f'spell school "{m.group(1)}" is not in the Spells chapter list', ''))
    if terms['ranks']:
        for m in re.finditer(r'\bSpell Rank: ([A-Z][a-z]+)', t):
            if m.group(1) not in terms['ranks']:
                issues.append((fn, f'spell rank "{m.group(1)}" is not a Basic Rules rank', ''))


# ---------------------------------------------------------------------------

def run(docx_arg=None, check_only=False):
    path = find_docx(docx_arg)
    if not path or not os.path.exists(path):
        say('No Basic Rules .docx found. Save it in this folder:', HERE)
        return False
    say('Reading', os.path.basename(path))
    try:
        blocks = read_docx(path)
    except (zipfile.BadZipFile, KeyError, ET.ParseError, OSError) as e:
        say('Could not read the docx:', e, '(Is it still saving, or open in a lock file?)')
        return False
    ch, order = chapters(blocks)
    if not order:
        say('The docx has no Heading 1 chapters, so there is nothing to build.')
        return False
    d = datetime.date.fromtimestamp(os.path.getmtime(path))
    revised = f'{d:%B} {d.day}, {d.year}'
    warn = []
    pages = build_pages(ch, order, revised, warn)
    terms = rule_terms(ch, order)

    stamp = datetime.datetime.now().strftime('%Y-%m-%d_%H%M%S')
    changed = []

    def write(rel, new):
        full = os.path.join(HERE, rel)
        old = open(full, encoding='utf-8', errors='replace').read() if os.path.exists(full) else None
        if old == new:
            return
        changed.append(rel)
        if check_only:
            return
        if old is not None:
            dst = os.path.join(ARCHIVE, stamp, rel)
            os.makedirs(os.path.dirname(dst), exist_ok=True)
            shutil.copy2(full, dst)
        os.makedirs(os.path.dirname(full), exist_ok=True)
        crlf = old is not None and b'\r\n' in open(full, 'rb').read(4096)
        with open(full, 'w', encoding='utf-8', newline='\r\n' if crlf else '\n') as f:
            f.write(new)

    # 1. rules pages
    for fn, (title, label, page) in pages.items():
        write(os.path.join('Webpages', fn), page)
    # 2. menu
    hp = os.path.join(WEB, 'a-header.html')
    if os.path.exists(hp):
        hdr = open(hp, encoding='utf-8').read()
        new = build_nav(hdr, pages)
        if new is None:
            warn.append('Could not find the Basic Rules menu in a-header.html.')
        else:
            write(os.path.join('Webpages', 'a-header.html'), new)
    # 3. swaps and checks on everything else
    counts, issues = {}, []
    built = set(pages)
    for full in sorted(glob.glob(os.path.join(WEB, '*.html'))):
        fn = os.path.basename(full)
        src = open(full, encoding='utf-8', errors='replace').read()
        if fn in built or fn in SKIP_PAGES:
            continue
        new = swap_html(src, counts)
        if 'BASIC-RULES:' in new:
            new = fill_markers(new, ch, order, warn, fn)
        write(os.path.join('Webpages', fn), new)
        check_page(fn, new, terms, issues)
    # 3b. Eleventy source: page templates (with their rules boxes) and one file per spell
    for full in sorted(glob.glob(os.path.join(SRC, '**', '*.njk'), recursive=True)):
        src = open(full, encoding='utf-8', errors='replace').read()
        new = swap_html(src, counts)
        if 'BASIC-RULES:' in new:
            new = fill_markers(new, ch, order, warn, os.path.basename(full))
        write(os.path.relpath(full, HERE), new)
    for full in sorted(glob.glob(os.path.join(SRC, 'spells', '*.md'))):
        src = open(full, encoding='utf-8', errors='replace').read()
        new = swap_html(src, counts)
        write(os.path.relpath(full, HERE), new)
        check_page(os.path.basename(full), spell_plain(new), terms, issues)
    for rel in EXTRA_FILES:
        full = os.path.join(HERE, rel)
        if os.path.exists(full):
            src = open(full, encoding='utf-8', errors='replace').read()
            write(rel, swap_code(src, counts))

    # 4. report
    lines = [f'Sparks rules check, {datetime.datetime.now():%B %d, %Y %H:%M}', f'Docx: {path}', '']
    lines.append(f'Pages built from the docx: {len(pages)}')
    lines.append(f'Files {"to change" if check_only else "changed"}: {len(changed)}')
    lines += ['   ' + c for c in changed]
    if counts:
        lines += ['', 'Wording fixed to match the Basic Rules:']
        lines += [f'   {n} x  {k}' for k, n in sorted(counts.items(), key=lambda x: -x[1])]
    if warn:
        lines += ['', 'Warnings:'] + ['   ' + w for w in warn]
    if issues:
        lines += ['', 'Still out of line with the Basic Rules (fix the page, or add the term to the docx):']
        grouped = {}
        for fn, what, ctx in issues:
            grouped.setdefault(what, []).append((fn, ctx))
        for what, lst in sorted(grouped.items()):
            files = sorted({f for f, c in lst})
            lines.append(f'   {what}: {len(files)} page(s): ' + ', '.join(files[:12]) + (' ...' if len(files) > 12 else ''))
            ctx = next((c for f, c in lst if c), '')
            if ctx:
                lines.append(f'      e.g. "...{ctx.strip()}..."')
    else:
        lines += ['', 'No other conflicts found.']
    rep = '\n'.join(lines) + '\n'
    with open(REPORT, 'w', encoding='utf-8') as f:
        f.write(rep)
    say(f'  {len(pages)} rules pages, {len(changed)} file(s) {"would change" if check_only else "updated"}.')
    if changed and not check_only:
        say(f'  Old copies saved in _archive/auto/{stamp}/')
    if warn:
        for w in warn:
            say('  Warning:', w)
    say(f'  {len({w for f, w, c in issues})} kind(s) of leftover conflict. Details in rules-report.txt')
    return True


def watch(docx_arg=None):
    say('Watching for docx changes. Leave this window open. Close it or press Ctrl+C to stop.')
    last = None
    while True:
        try:
            path = find_docx(docx_arg)
            sig = (path, os.path.getmtime(path), os.path.getsize(path)) if path and os.path.exists(path) else None
            if sig and sig != last:
                time.sleep(1.5)  # let Word finish saving
                sig2 = (path, os.path.getmtime(path), os.path.getsize(path))
                if sig2 == sig:
                    say('')
                    say(datetime.datetime.now().strftime('%H:%M:%S'), 'change found, rebuilding...')
                    run(docx_arg)
                    last = sig
        except Exception as e:  # keep watching even if one save was caught half-written
            say('  Could not rebuild this time:', e)
        time.sleep(2)


if __name__ == '__main__':
    try:
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    except Exception:
        pass
    args = sys.argv[1:]
    docx = None
    if '--docx' in args:
        docx = args[args.index('--docx') + 1]
    else:
        docx = next((a for a in args if a.lower().endswith('.docx')), None)
    if '--watch' in args:
        try:
            watch(docx)
        except KeyboardInterrupt:
            say('Stopped.')
    else:
        ok = run(docx, check_only='--check' in args)
        sys.exit(0 if ok else 1)
