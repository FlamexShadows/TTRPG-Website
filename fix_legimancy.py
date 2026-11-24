import os, re

WEBPAGES = r"c:\Users\kylep\OneDrive\Desktop\TTRPG Website\Webpages"
SC = os.path.join(WEBPAGES, "spells-complete.html")

with open(SC, "r", encoding="utf-8") as f:
    html = f.read()

# ── 1. Remove Legimancy entries from Enchantment ────────────────────────────
remove = [
    '                        <div class="spell-item"><a href="gag-order.html">Gag Order</a></div>\n',
    '                        <div class="spell-item"><a href="oath.html">Oath</a></div>\n',
    '                        <div class="spell-item"><a href="confiscation.html">Confiscation</a></div>\n',
    '                        <div class="spell-item"><a href="death-sentence.html">Death Sentence</a></div>\n',
]
for entry in remove:
    if entry in html:
        html = html.replace(entry, "")
        print(f"  Removed: {entry.strip()}")
    else:
        # Try without trailing newline
        entry2 = entry.rstrip('\n')
        if entry2 in html:
            html = html.replace(entry2, "")
            print(f"  Removed (no-nl): {entry2.strip()}")
        else:
            print(f"  NOT FOUND: {entry.strip()}")

# ── 2. Add Legimancy school section before closing schools-grid div ─────────
legimancy_section = '''
            <!-- Legimancy -->
            <div class="school-section" id="legimancy">
                <div class="school-title">Legimancy</div>

                <div class="rank-section">
                    <div class="rank-title">Minor</div>
                    <div class="spell-list">
                        <div class="spell-item"><a href="gag-order.html">Gag Order</a></div>
                    </div>
                </div>

                <div class="rank-section">
                    <div class="rank-title">Adept</div>
                    <div class="spell-list">
                        <div class="spell-item"><a href="oath.html">Oath</a></div>
                        <div class="spell-item"><a href="confiscation.html">Confiscation</a></div>
                    </div>
                </div>

                <div class="rank-section">
                    <div class="rank-title">Major</div>
                    <div class="spell-list">
                        <div class="spell-item"><a href="death-sentence.html">Death Sentence</a></div>
                    </div>
                </div>

                <div class="rank-section">
                    <div class="rank-title">Grand</div>
                    <div class="spell-list">
                        <div class="no-spells">No spells yet</div>
                    </div>
                </div>
            </div>
'''

# Insert just before the closing </div> of schools-grid
# The schools-grid close is the last </div> before </div> <!-- /.page-layout -->
marker = '    </div> <!-- /.page-layout -->'
if marker in html:
    html = html.replace(marker, legimancy_section + marker)
    print("  Legimancy section added to schools-grid")
else:
    print("  WARNING: could not find page-layout close marker")

# ── 3. Add Legimancy to sidebar nav (alphabetically after Hydromancy) ───────
if 'href="#legimancy"' not in html:
    html = html.replace(
        '<li><a href="#nature">Nature</a></li>',
        '<li><a href="#legimancy">Legimancy</a></li>\n            <li><a href="#nature">Nature</a></li>'
    )
    print("  Added Legimancy to sidebar nav")

with open(SC, "w", encoding="utf-8") as f:
    f.write(html)
print("spells-complete.html saved")

# ── 4. Update the 4 spell pages to say Class: Legimancy ─────────────────────
pages = [
    ("gag-order.html", "Enchantment"),
    ("oath.html", "Enchantment"),
    ("confiscation.html", "Enchantment"),
    ("death-sentence.html", "Enchantment"),
]
for fn, old_class in pages:
    path = os.path.join(WEBPAGES, fn)
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    new_content = content.replace(
        f"<b>Class:</b> {old_class}",
        "<b>Class:</b> Legimancy"
    )
    if new_content != content:
        with open(path, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"  Updated {fn}: Class -> Legimancy")
    else:
        print(f"  No change needed in {fn}")

print("Done.")
