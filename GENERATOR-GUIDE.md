# Generator Guide

The spell pages and the spell list are now built by [Eleventy](https://www.11ty.dev/), a static site generator. Every other page is copied to the site exactly as it was. This guide explains how the build works so you can change it and explain it.

## What changed

| Before | Now |
|---|---|
| 367 hand-made HTML files, each with its own copy of the page layout | 367 small Markdown files with only the spell's stats and text |
| The spell list was a separate hand-edited page | The spell list is generated from the spell files |
| Every page loaded the header with jQuery after opening | Built pages include the header during the build |
| Stats were bold text and line breaks | Stats are a description list (`<dl>`), real markup for label and value pairs |

The conversion also fixed problems that came from keeping the same fact in two places:

- Three spell pages carried another spell's browser title (Healing Sap said "Healing Touch", Razor Talon said "Plague Cloud", Sever Life said "Transfer Vitality").
- Fifteen pages had no "Sparks |" in their title, and three had "Name:" stuck to the front of the spell name.
- False Miracle's Casting Time line was missing its colon.

Each fact now lives in one file, so these mistakes can't come back.

## How a build works

Run `npm run build` (or double-click `Build Site.bat`). Eleventy then:

1. Reads `eleventy.config.js`.
2. Copies every file in `Webpages/` to `_site/`, except the pages it now builds. This is called **passthrough copy**.
3. Reads each file in `src/spells/`. The part between the `---` lines is **front matter**: the spell's data. The rest is the description, written in Markdown.
4. Merges in the settings from `src/spells/spells.11tydata.js`, which apply to every spell: the layout, the page address, the browser title, and the list of stats. Eleventy calls this merging the **data cascade**.
5. Turns the Markdown into HTML and places it in the **layout** `spell.njk`, which places that in `base.njk`, which adds the head and the header.
6. Gathers every spell into a **collection** called `spells`, sorted A to Z.
7. Builds `spells-complete.html` from `spells-complete.njk`, which groups the collection by school and rank with the `bySchool` **filter**.
8. Writes everything to `_site/`. That folder is the finished website.

`npm start` (or `Preview Site.bat`) does the same, then serves `_site/` at http://localhost:8080 and rebuilds whenever you save.

## File tour

| File | What it does |
|---|---|
| `package.json` | Names the project, lists Eleventy as its one dependency, and defines `npm start` and `npm run build`. |
| `package-lock.json` | Pins the exact version of every package so every computer builds the same site. Never edit it by hand. |
| `eleventy.config.js` | The build settings: passthrough copy, the header shortcode, the spells collection, and the `bySchool` filter. |
| `src/spells/*.md` | One file per spell. |
| `src/spells/spells.11tydata.js` | Settings every spell shares. `STATS` decides which stats show and in what order. |
| `src/_includes/layouts/base.njk` | The outer page: head, stylesheet, header, and any extra styles or scripts a page asks for. |
| `src/_includes/layouts/spell.njk` | The inside of a spell page: name, stat list, text, and a link back to its school on the spell list. |
| `src/spells-complete.njk` | The spell list template. |
| `src/static/spells-list.css`, `spells-list.js` | Styles and the sidebar highlight for the spell list. The script no longer needs jQuery. |
| `Webpages/` | Everything not converted yet. Copied as it is. |
| `tools/retire_old_spell_pages.py` | Checks the built spell pages against the old ones, then moves the old ones to the archive. |
| `tools/convert_spells.py` | The one-time script that turned the old spell pages into Markdown files. Kept for the record. |
| `.github/workflows/pages.yml` | The publishing steps GitHub runs on every push. |

## Add a spell

Copy any file in `src/spells/` and rename it. The file name becomes the page address, so `chain-lightning.md` becomes `chain-lightning.html`.

```markdown
---
name: "Chain Lightning"
range: "30 Meters"
ap: "6"
rank: "Major"
school: "Aeromancy"
subtype: "Lightning"
requirements: "Words of Power, Sigils"
duration: "Instant"
concentration: "No"
---
Lightning leaps from your hand to a creature in range, then to up to three more creatures within 5 meters of the last one.

Each creature makes an Evasion save or takes 8d6 air damage.
```

- Keep the quotes around each value.
- Use `casting_time` instead of `ap` for spells that take minutes. Use `action_cost` for the three spells that use that label.
- Leave a stat line out and the page leaves it out too.
- Leave a blank line between paragraphs.
- Add `unlisted: true` to build the page without listing it. Healing Sap has this, because no other page linked to it before.

## Change every spell page at once

Edit `src/_includes/layouts/spell.njk` for the markup, or the "SPELL PAGES" section at the bottom of `Webpages/styles.css` for the look. The next build updates all 367 pages.

## The rules updater

`update_rules.py` still keeps the site in line with the Basic Rules docx. It now also:

- Fixes old wording in the spell files and templates in `src/`.
- Refills the rules box in `src/spells-complete.njk`.
- Checks spell files for unknown schools, ranks, and damage types.

Rebuild the site after it runs, or leave `Preview Site.bat` open and it rebuilds on its own.

## Retire the old spell pages

The old spell pages are still in `Webpages/`. The build ignores them, so editing them changes nothing. To clean them up:

1. Double-click `Build Site.bat`.
2. Double-click `Retire Old Spell Pages.bat`. It compares all 367 built pages with the old ones (name, every stat, and the full text) and stops if any differ.
3. Type `yes`. It moves the old pages and the old spell list to `_archive/pre-eleventy/Webpages/`. Nothing is deleted.

`generate_spells.py` writes old-style pages, so don't use it for spells anymore. Add a Markdown file instead.

## Publishing

On every push, GitHub runs `.github/workflows/pages.yml`:

1. Downloads the repository.
2. Installs Node.js 22.
3. Runs `npm ci`, a clean install from `package-lock.json`.
4. Runs `npm run build`.
5. Publishes `_site/` to GitHub Pages.

Building on GitHub instead of uploading `_site/` means the published site always matches the source in the repository. This pattern is called **continuous deployment**.

## Questions an interviewer might ask

**Why a static site generator instead of a framework like React?**
The site is reading material. Nothing changes per visitor, so every page builds once into plain HTML. That loads fast, works without JavaScript, and hosts for free. The character sheet and shops keep their JavaScript because they're interactive.

**Why Markdown with front matter instead of one big JSON file?**
One file per spell gives small, readable changes in git history. Two people editing different spells never conflict. The front matter keeps the stats structured enough for the spell list to group them.

**How did you avoid breaking 367 pages?**
The converter was checked by a script that compares the name, each stat, and the full text of every old page with its built page. It ran until zero pages differed. The retire script runs the same check again before it moves anything.

**Why keep the old URLs?**
Other pages, the character sheet, and any bookmarks link to them. The `permalink` setting keeps `fireball.md` at `fireball.html`.

**Why convert only spells first?**
It's the biggest group with the most regular structure, so it proves the approach with the least risk. Unconverted pages keep working through passthrough copy, so the site never has to be half-broken.

**What would you do next?**
Convert maneuvers (about 100 pages) and feats (61) the same way. Build the character sheet's spell list from the same spell files, so the sheet and the site can't disagree. Add a link check to the publishing workflow.
