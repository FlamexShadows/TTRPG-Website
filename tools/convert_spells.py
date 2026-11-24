"""One-time converter used on November 24, 2026: old spell pages (Webpages/*.html) -> src/spells/<slug>.md.
Kept for the record. Usage: python tools/convert_spells.py Webpages src/spells"""
import glob, html, json, os, re, sys
SRC, OUT = sys.argv[1], sys.argv[2]
STAT = {  # old label -> front matter key, in display order
    'Range': 'range', 'AP Cost': 'ap', 'Casting Time': 'casting_time', 'Action Cost': 'action_cost',
    'Spell Rank': 'rank', 'Class': 'school', 'Subtype': 'subtype', 'Requirements': 'requirements',
    'Duration': 'duration', 'Concentration': 'concentration'}
ORDER = ['name', 'range', 'ap', 'casting_time', 'action_cost', 'rank', 'school', 'subtype', 'requirements', 'duration', 'concentration']
NAME_FIX = {'Vile ray': 'Vile Ray'}
UNLISTED = {'healing-sap'}
COMPLEX = re.compile(r'<\s*(b|strong|h3|h4|ul|ol|li|table)\b', re.I)
report = {'converted': 0, 'html_bodies': [], 'name_fixes': [], 'title_fixes': [], 'unlisted': []}

def clean(v):
    return re.sub(r'\s+', ' ', html.unescape(v)).strip()

def md_escape(p):
    p = p.replace('\\', '\\\\').replace('*', '\\*').replace('`', '\\`')
    p = re.sub(r'^(\d+)\.(\s)', r'\1\\.\2', p)
    p = re.sub(r'^([-+#>])', r'\\\1', p)
    return p

def body_md(rest):
    if COMPLEX.search(rest):
        lines = [l.strip() for l in rest.strip().splitlines()]
        inner = '\n'.join(l for l in lines if l)
        return '<div class="spell-text-html">\n' + inner + '\n</div>\n', True
    t = re.sub(r'<p\b[^>]*>|</p>', '\n\n', rest, flags=re.I)
    t = re.sub(r'(?:<br\s*/?>\s*){2,}', '\n\n', t, flags=re.I)
    t = re.sub(r'<br\s*/?>\s*', '<br>\u0000', t, flags=re.I)
    paras = []
    for chunk in re.split(r'\n\s*\n', t):
        p = re.sub(r'\s+', ' ', chunk).strip().replace('<br>\u0000', '<br>\n').replace('\u0000', '')
        p = p.replace('<br>\n ', '<br>\n')
        if p:
            paras.append('\n'.join(md_escape(l) for l in p.split('\n')))
    return '\n\n'.join(paras) + '\n', False

for path in sorted(glob.glob(os.path.join(SRC, '*.html'))):
    fn = os.path.basename(path)
    s = open(path, encoding='utf-8').read()
    if 'Spell Rank:' not in s or fn == 'spells-complete.html':
        continue
    slug = fn[:-5]
    body = re.search(r'<div class="content-panel"[^>]*>(.*?)</div>\s*</div>\s*</body>', s, re.S).group(1)
    h2 = re.search(r'<h2>(.*?)</h2>', body, re.S)
    raw_name = clean(re.sub(r'<[^>]+>', '', h2.group(1)))
    name = re.sub(r'^Name:\s*', '', raw_name)
    name = NAME_FIX.get(name, name)
    if name != raw_name:
        report['name_fixes'].append((fn, raw_name, name))
    t = re.search(r'<title>(.*?)</title>', s, re.S)
    old_title = clean(t.group(1)) if t else None
    if old_title != f'Sparks | {name}':
        report['title_fixes'].append((fn, old_title, f'Sparks | {name}'))
    rest = body[h2.end():]
    rest = re.sub(r'^\s*<br\s*/?>', '', rest)
    data = {'name': name}
    while True:
        m = re.match(r'\s*<b>([^<]+?)\s*:?\s*</b>\s*:?(.*?)<br\s*/?>', rest, re.S)
        if not m or m.group(1).strip() not in STAT:
            break
        data[STAT[m.group(1).strip()]] = clean(m.group(2))
        rest = rest[m.end():]
    rest = re.sub(r'^(?:\s*<br\s*/?>)+', '', rest)  # stray line breaks left after the stats
    text, is_html = body_md(rest)
    if is_html:
        report['html_bodies'].append(fn)
    fm = ['---'] + [f'{k}: {json.dumps(data[k], ensure_ascii=False)}' for k in ORDER if k in data]
    if slug in UNLISTED:
        fm.append('unlisted: true')
        report['unlisted'].append(fn)
    fm.append('---')
    with open(os.path.join(OUT, slug + '.md'), 'w', encoding='utf-8', newline='\n') as f:
        f.write('\n'.join(fm) + '\n' + text)
    report['converted'] += 1

json.dump(report, open('convert-report.json', 'w'), indent=1)
print('converted', report['converted'], '| html bodies', len(report['html_bodies']), '| name fixes', len(report['name_fixes']), '| title fixes', len(report['title_fixes']))
