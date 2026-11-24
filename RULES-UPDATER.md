# Rules updater

The Basic Rules .docx is the source of truth. The website follows it.

- **Update Rules.bat**: double-click after you save the docx. Rebuilds the rules pages and fixes old wording on every other page.
- **Watch Rules.bat**: leave it open while you edit. It rebuilds on every save.
- Drag any .docx onto either .bat to use that file. Otherwise it uses the newest .docx in this folder with "Basic Rules" in its name.

What it touches
- Builds these pages from the docx: common-terms, combat, conditions, creature-types, languages, leveling, magic-items, maneuvers-and-spells, sheet-formulas, skills, statistics, race. Do not hand-edit them. Edit the docx.
- A new Heading 1 chapter in the docx gets its own page and a Basic Rules menu link.
- Rebuilds the Basic Rules menu in Webpages/a-header.html (between the RULES-NAV comments).
- Refreshes any `<!-- BASIC-RULES: Chapter / Section -->` ... `<!-- /BASIC-RULES -->` box. The spell list template (src/spells-complete.njk) and the maneuvers list page use these.
- Swaps old wording for Basic Rules wording on all other pages, the spell files in src/spells/, the templates in src/, generate_spells.py, character-sheet-data.js and shops-data.js. The list is SWAPS at the top of update_rules.py.
- Checks the spell files too: an unknown school, rank, or damage type shows up in rules-report.txt.
- After it runs, rebuild the site (Build Site.bat, or the open Preview Site window does it on its own) so the spell pages pick up the changes.
- Writes rules-report.txt: what changed, and anything still out of line.
- Backs up every changed file to _archive/auto/<date_time>/ first.

Needs Python 3.8+ only. `python update_rules.py --check` reports without changing anything.
