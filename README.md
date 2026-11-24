# Sparks of Dynasty

A fantasy tabletop role-playing game of magic, swordsmanship, and archery. This repository holds the game's website, the rules documents it comes from, and the scripts that keep them in sync.

## Folders

| Path | What it holds |
|---|---|
| `Webpages/` | The website. Every page, the stylesheet, the character sheet, and the shops. |
| `Webpages/index.html` | The home page with the closed book that opens on scroll (`tome.css`, `tome.js`). |
| `Images/` | Art and reference images. |
| `_archive/` | Older versions of pages and scripts, kept for reference. |
| `.vscode/Programs/` | Earlier spell and page tools in Python, PowerShell, and C++. |
| `Sparks Basic Rules.docx` | The Basic Rules. `update_rules.py` copies changes from here into the website. |
| `Sparks (New).xlsx`, `Shops.xlsx` | The original character sheet and shop lists. |

## Preview the site on your computer

The pages load a shared header with jQuery, so open them through a local web server instead of double-clicking the file.

```
cd Webpages
python -m http.server 8000
```

Then visit http://localhost:8000 in your browser. The Live Server extension in VS Code works too.

## Update the rules

Edit `Sparks Basic Rules.docx`, then run `Update Rules.bat`. `RULES-UPDATER.md` explains what it changes.

## Publish

Every push publishes `Webpages/` to GitHub Pages through `.github/workflows/pages.yml`.

## Guides

- `CHARACTER-SHEET-NOTES.md`: how the character sheet works and which rules it follows.
- `ITEM-EFFECTS.md`: how to write effects so magic items and class features apply bonuses on the sheet.
- `RULES-UPDATER.md`: how the rules updater works.
