#!/usr/bin/env python3
"""
Retire the old hand-made spell pages once Eleventy builds them from src/spells/.

1. Checks that you built the site (npm run build, or Build Site.bat).
2. Compares every built spell page with the old page in Webpages/: the name, each stat, and the text.
   It stops if any spell differs, so nothing moves until the new pages match.
3. Asks before it moves anything, then moves the old pages and the old spell list to
   _archive/pre-eleventy/Webpages/. Nothing is deleted.

Run it from the TTRPG Website folder:  python tools/retire_old_spell_pages.py
Add --check to compare only.
"""
import glob, html, os, re, shutil, sys

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
WEB = os.path.join(HERE, 'Webpages')
SITE = os.path.join(HERE, '_site')
SPELLS = os.path.join(HERE, 'src', 'spells')
ARCHIVE = os.path.join(HERE, '_archive', 'pre-eleventy', 'Webpages')
STAT = ['Range', 'AP Cost', 'Casting Time', 'Action Cost', 'Spell Rank', 'Class', 'Subtype',
        'Requirements', 'Duration', 'Concentration']
NAME_FIX = {'Vile ray': 'Vile Ray'}  # fixed during the move to Eleventy


def plain(h):
    h = re.sub(r'<(script|style)\b.*?</\1>', ' ', h, flags=re.S)
    return re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', ' ', h))).strip()


def old_page(text):
    body = re.search(r'<div class="content-panel"[^>]*>(.*?)</div>\s*</div>\s*</body>', text, re.S).group(1)
    name = plain(re.search(r'<h2>(.*?)</h2>', body, re.S).group(1))
    name = re.sub(r'^Name:\s*', '', name)
    rest = re.sub(r'^\s*<br\s*/?>', '', body[body.index('</h2>') + 5:])
    stats = {}
    while True:
        m = re.match(r'\s*<b>([^<]+?)\s*:?\s*</b>\s*:?(.*?)<br\s*/?>', rest, re.S)
        if not m or m.group(1).strip() not in STAT:
            break
        stats[m.group(1).strip()] = plain(m.group(2))
        rest = rest[m.end():]
    return NAME_FIX.get(name, name), stats, plain(rest)


def new_page(text):
    art = re.search(r'<article class="content-panel spell">(.*?)</article>', text, re.S).group(1)
    name = plain(re.search(r'<h2>(.*?)</h2>', art, re.S).group(1))
    stats = {plain(k): plain(v) for k, v in re.findall(r'<dt>(.*?)</dt><dd>(.*?)</dd>', art, re.S)}
    body = re.search(r'<div class="spell-text">(.*?)</div>\s*(?:<p class="spell-back">|$)', art, re.S).group(1)
    return name, stats, plain(body)


def main():
    check_only = '--check' in sys.argv
    if not os.path.isdir(SITE):
        print('Build the site first: double-click Build Site.bat (or run "npm run build"), then run this again.')
        return 1
    slugs = sorted(os.path.basename(p)[:-3] for p in glob.glob(os.path.join(SPELLS, '*.md')))
    to_move, differ, missing = [], [], []
    for slug in slugs:
        old_path = os.path.join(WEB, slug + '.html')
        new_path = os.path.join(SITE, slug + '.html')
        if not os.path.exists(old_path):
            continue  # already retired, or a spell added after the move
        if not os.path.exists(new_path):
            missing.append(slug)
            continue
        old = old_page(open(old_path, encoding='utf-8', errors='replace').read())
        new = new_page(open(new_path, encoding='utf-8', errors='replace').read())
        if old != new:
            differ.append((slug, [label for label, a, b in zip(('name', 'stats', 'text'), old, new) if a != b]))
        to_move.append(old_path)
    print(f'{len(slugs)} spell files, {len(to_move)} old pages still in Webpages.')
    if missing:
        print('These spells did not build. Run the build again and look for errors:', ', '.join(missing))
    if differ:
        print('These built pages do not match the old ones yet:')
        for slug, what in differ:
            print(f'   {slug}: {", ".join(what)} differ')
    if missing or differ:
        return 1
    print('Every built spell page matches its old page.')
    old_list = os.path.join(WEB, 'spells-complete.html')
    if os.path.exists(old_list):
        to_move.append(old_list)
    if check_only or not to_move:
        return 0
    answer = input(f'Move {len(to_move)} old files to _archive/pre-eleventy/Webpages/? Type yes to go ahead: ')
    if answer.strip().lower() != 'yes':
        print('Nothing moved.')
        return 0
    os.makedirs(ARCHIVE, exist_ok=True)
    for path in to_move:
        shutil.move(path, os.path.join(ARCHIVE, os.path.basename(path)))
    print(f'Moved {len(to_move)} files. Edit spells in src/spells/ from now on.')
    return 0


if __name__ == '__main__':
    sys.exit(main())
