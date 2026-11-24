# Sparks of Dynasty

A fantasy tabletop role-playing game of magic, swordsmanship, and archery. This repository holds the game's website, the rules documents it comes from, and the scripts that keep them in sync.

## Folders

| Path | What it holds |
|---|---|
| `src/spells/` | One Markdown file per spell. Eleventy turns each into a page. |
| `src/_includes/layouts/` | The templates every built page shares. |
| `src/spells-complete.njk` | The spell list, generated from the spell files. |
| `Webpages/` | Every page not converted yet, plus the stylesheet, character sheet, and shops. Copied to the site as they are. |
| `Webpages/index.html` | The home page with the closed book that opens on scroll (`tome.css`, `tome.js`). |
| `tools/` | The spell converter and the script that retires the old spell pages. |
| `_site/` | The built website. Made by Eleventy, never edited by hand, and kept off GitHub. |
| `Images/` | Art and reference images. |
| `_archive/` | Older versions of pages and scripts, kept for reference. |
| `.vscode/Programs/` | Earlier spell and page tools in Python, PowerShell, and C++. |
| `Sparks Basic Rules.docx` | The Basic Rules. `update_rules.py` copies changes from here into the website. |
| `Sparks (New).xlsx`, `Shops.xlsx` | The original character sheet and shop lists. |

## Preview the site on your computer

Install Node.js (the LTS version from nodejs.org) once. Then double-click `Preview Site.bat`, or run:

```
npm install
npm start
```

Your browser opens http://localhost:8080 and refreshes every time you save a file. `Build Site.bat` (or `npm run build`) builds the site into `_site/` once.

## Add or change a spell

Copy any file in `src/spells/`, rename it (the file name becomes the page address), and edit it. The spell list picks it up on the next build. `GENERATOR-GUIDE.md` explains how the build works.

## Update the rules

Edit `Sparks Basic Rules.docx`, then run `Update Rules.bat`. `RULES-UPDATER.md` explains what it changes.

## Publish

Every push builds the site with Eleventy and publishes `_site/` to GitHub Pages through `.github/workflows/pages.yml`.

## Guides

- `GENERATOR-GUIDE.md`: how the Eleventy build works, file by file.
- `CHARACTER-SHEET-NOTES.md`: how the character sheet works and which rules it follows.
- `ITEM-EFFECTS.md`: how to write effects so magic items and class features apply bonuses on the sheet.
- `RULES-UPDATER.md`: how the rules updater works.
