import os, re

WEBPAGES = r"c:\Users\kylep\OneDrive\Desktop\TTRPG Website\Webpages"

def inject_spells(html, school_id, rank_name, new_items):
    school_marker = f'id="{school_id}"'
    school_pos = html.find(school_marker)
    if school_pos == -1:
        print(f"  WARNING: school not found: {school_id}")
        return html
    m = re.search(re.escape(">" + rank_name), html[school_pos:])
    if not m:
        print(f"  WARNING: rank not found: {rank_name} in {school_id}")
        return html
    rank_pos = school_pos + m.start()
    sl_marker = 'class="spell-list">'
    sl_pos = html.find(sl_marker, rank_pos)
    if sl_pos == -1:
        print(f"  WARNING: spell-list not found for {school_id} {rank_name}")
        return html
    content_start = sl_pos + len(sl_marker)
    depth = 1
    pos = content_start
    while pos < len(html) and depth > 0:
        next_open = html.find("<div", pos)
        next_close = html.find("</div>", pos)
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
    print(f"  WARNING: could not find end for {school_id} {rank_name}")
    return html

missed = {
    ("pyromancy","Minor"): [("cinder-snap.html","Cinder Snap")],
    ("pyromancy","Grand"): [("phoenix-heart.html","Phoenix Heart"),("caldera.html","Caldera")],
    ("tenemancy","Minor"): [("gloom-veil.html","Gloom Veil"),("dark-whisper.html","Dark Whisper")],
    ("tenemancy","Adept"): [("umbral-hand.html","Umbral Hand"),("nights-mantle.html","Night's Mantle")],
    ("tenemancy","Grand"): [("kingdom-of-shadow.html","Kingdom of Shadow")],
    ("transmutation","Adept"): [("quicksilver-body.html","Quicksilver Body"),("leaden-bones.html","Leaden Bones"),("perfect-edge.html","Perfect Edge")],
    ("transmutation","Grand"): [("philosophers-decree.html","Philosopher's Decree")],
}

sc_path = os.path.join(WEBPAGES, "spells-complete.html")
with open(sc_path, "r", encoding="utf-8") as f:
    html = f.read()

for (sid, rank), items in missed.items():
    to_add = [(fn, name) for fn, name in items if fn not in html]
    if not to_add:
        print(f"  already present: {sid} {rank}")
        continue
    html = inject_spells(html, sid, rank, to_add)
    print(f"  + {sid} {rank}: {[n for _,n in to_add]}")

with open(sc_path, "w", encoding="utf-8") as f:
    f.write(html)
print("Done.")
