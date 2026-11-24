"""
normalize_all.py  –  Comprehensive HTML normalizer for the Sparks TTRPG website.

Processes ALL .html files under Webpages/ and spells/ (skipping A-Header.html
and Header.html themselves).  For each file it applies:

 1. Fix nested <head> tags
 2. Ensure <!DOCTYPE html> and <html> wrapper
 3. Remove <object data="A-Header.html"> fallback tags
 4. Replace A-Nav-bar.css → styles.css  (with correct relative path for spells/)
 5. Standardize jQuery to 3.7.1
 6. Replace common inline content-panel style with class="content-panel"
 7. Remove inline header { width: 100%; } style blocks
 8. Replace inline table cell styles with .class-table class on class pages
 9. Fix duplicate id="centered-text-middle" → class="section-title"
10. Fix duplicate id="centered-text" → class="subsection-title"
11. Normalize "Sparks|" → "Sparks |"

Run:  python normalize_all.py
       (or)  python normalize_all.py --dry-run
"""
import os
import re
import sys
from pathlib import Path

DRY_RUN = "--dry-run" in sys.argv

# ---------------------------------------------------------------------------
# I/O helpers
# ---------------------------------------------------------------------------

def read_text(path: Path) -> str:
    try:
        return path.read_text(encoding="utf-8")
    except UnicodeDecodeError:
        return path.read_text(encoding="latin-1")


def write_text(path: Path, content: str) -> None:
    if DRY_RUN:
        return
    path.write_text(content, encoding="utf-8")


# ---------------------------------------------------------------------------
# Determine if the file is inside the spells/ directory
# ---------------------------------------------------------------------------

def is_in_spells_dir(path: Path, repo_root: Path) -> bool:
    try:
        rel = path.relative_to(repo_root / "spells")
        return True
    except ValueError:
        return False


# ---------------------------------------------------------------------------
# Individual transformations
# ---------------------------------------------------------------------------

def fix_nested_head(html: str) -> str:
    """Collapse <head><head> → <head> and </head></head> → </head>."""
    html = re.sub(r"<head>\s*<head>", "<head>", html, flags=re.IGNORECASE)
    html = re.sub(r"</head>\s*</head>", "</head>", html, flags=re.IGNORECASE)
    return html


def ensure_doctype(html: str) -> str:
    """Add <!DOCTYPE html> if missing."""
    if not re.search(r"<!DOCTYPE\s+html", html, flags=re.IGNORECASE):
        html = "<!DOCTYPE html>\n" + html
    return html


def ensure_html_wrapper(html: str) -> str:
    """Wrap content in <html lang='en'>…</html> if missing."""
    if not re.search(r"<html", html, flags=re.IGNORECASE):
        # Insert <html> after DOCTYPE if present, otherwise at start
        if re.search(r"<!DOCTYPE[^>]*>", html, flags=re.IGNORECASE):
            html = re.sub(
                r"(<!DOCTYPE[^>]*>)",
                r'\1\n<html lang="en">',
                html, count=1, flags=re.IGNORECASE
            )
        else:
            html = '<html lang="en">\n' + html
        # Append </html> if we added the opening tag
        if not re.search(r"</html>", html, flags=re.IGNORECASE):
            html = html.rstrip() + "\n</html>\n"
    return html


def remove_object_header(html: str) -> str:
    """Remove <object data="A-Header.html" ...></object> tags."""
    html = re.sub(
        r'<object[^>]*A-Header\.html[^>]*>\s*</object>',
        '', html, flags=re.IGNORECASE
    )
    # Also remove self-closing variant
    html = re.sub(
        r'<object[^>]*A-Header\.html[^>]*/?>',
        '', html, flags=re.IGNORECASE
    )
    return html


def fix_css_reference(html: str, is_spell: bool) -> str:
    """Replace A-Nav-bar.css with styles.css (adjusting path for spells/)."""
    if is_spell:
        # spells/ pages need ../Webpages/styles.css
        html = re.sub(
            r'href="[^"]*A-Nav-bar\.css"',
            'href="../Webpages/styles.css"',
            html, flags=re.IGNORECASE
        )
        # Also fix any that already reference styles.css but with wrong path
        html = re.sub(
            r'href="styles\.css"',
            'href="../Webpages/styles.css"',
            html, flags=re.IGNORECASE
        )
    else:
        html = re.sub(
            r'href="[^"]*A-Nav-bar\.css"',
            'href="styles.css"',
            html, flags=re.IGNORECASE
        )
    return html


def fix_jquery_version(html: str) -> str:
    """Standardize jQuery to 3.7.1."""
    html = re.sub(
        r'(ajax\.googleapis\.com/ajax/libs/jquery/)[\d.]+(/jquery\.min\.js)',
        r'\g<1>3.7.1\2',
        html
    )
    return html


def replace_inline_content_panel(html: str) -> str:
    """Replace common inline style with class='content-panel'.
    
    Handles variants with and without extra properties like 'font-size: larger;'
    """
    # Exact match of the most common inline style
    html = re.sub(
        r'style="margin-top:\s*100px;\s*background-color:\s*rgba\(0,\s*0,\s*0,\s*0\.5\);\s*border-radius:\s*10px;\s*padding:\s*20px;\s*color:\s*white;"',
        'class="content-panel"',
        html, flags=re.IGNORECASE
    )
    # Variant with font-size: larger
    html = re.sub(
        r'style="margin-top:\s*100px;\s*background-color:\s*rgba\(0,\s*0,\s*0,\s*0\.5\);\s*border-radius:\s*10px;\s*padding:\s*20px;\s*color:\s*white;\s*font-size:\s*larger;"',
        'class="content-panel" style="font-size: larger;"',
        html, flags=re.IGNORECASE
    )
    return html


def remove_header_width_style(html: str) -> str:
    """Remove inline <style> blocks containing only 'header { width: 100%; }'."""
    html = re.sub(
        r'<style>\s*header\s*\{\s*width:\s*100%;\s*\}\s*</style>',
        '', html, flags=re.IGNORECASE
    )
    return html


def fix_class_table_styles(html: str) -> str:
    """Add class='class-table' to tables with inline cell styles and remove
    the per-cell inline style attributes on class pages that have progression tables."""
    # Only process if this looks like a class page with styled table cells
    if not re.search(r'<table\s+style="width:\s*100%;\s*border-collapse:\s*collapse;"', html, flags=re.IGNORECASE):
        return html
    
    # Replace table opening tag
    html = re.sub(
        r'<table\s+style="width:\s*100%;\s*border-collapse:\s*collapse;">',
        '<table class="class-table">',
        html, flags=re.IGNORECASE
    )
    
    # Remove inline style from th cells
    html = re.sub(
        r'<th\s+style="padding:\s*8px;\s*text-align:\s*left;">',
        '<th>',
        html, flags=re.IGNORECASE
    )
    
    # Remove inline style from td cells
    html = re.sub(
        r'<td\s+style="padding:\s*8px;\s*text-align:\s*left;">',
        '<td>',
        html, flags=re.IGNORECASE
    )
    
    return html


def fix_duplicate_ids(html: str) -> str:
    """Replace duplicate id='centered-text-middle' with class='section-title'
    and id='centered-text' with class='subsection-title'."""
    html = re.sub(
        r'id="centered-text-middle"',
        'class="section-title"',
        html
    )
    html = re.sub(
        r'id="centered-text"',
        'class="subsection-title"',
        html
    )
    return html


def normalize_title_spacing(html: str) -> str:
    """Normalize 'Sparks|' → 'Sparks |'."""
    html = re.sub(r'Sparks\|', 'Sparks |', html)
    return html


# ---------------------------------------------------------------------------
# Main processing
# ---------------------------------------------------------------------------

SKIP_FILES = {"A-Header.html", "Header.html", "Template Copypasta.html", "Test.html"}

def process_file(path: Path, repo_root: Path) -> bool:
    """Apply all transformations to a single HTML file.
    Returns True if the file was modified."""
    if path.name in SKIP_FILES:
        return False

    original = read_text(path)
    html = original
    is_spell = is_in_spells_dir(path, repo_root)

    # Apply all transformations in order
    html = fix_nested_head(html)
    html = ensure_doctype(html)
    html = ensure_html_wrapper(html)
    html = remove_object_header(html)
    html = fix_css_reference(html, is_spell)
    html = fix_jquery_version(html)
    html = replace_inline_content_panel(html)
    html = remove_header_width_style(html)
    html = fix_class_table_styles(html)
    html = fix_duplicate_ids(html)
    html = normalize_title_spacing(html)

    if html != original:
        write_text(path, html)
        return True
    return False


def main() -> None:
    repo_root = Path(__file__).resolve().parent
    targets = [repo_root / "Webpages", repo_root / "spells"]

    changed = 0
    scanned = 0
    errors = 0

    for target in targets:
        if not target.exists():
            continue
        for path in sorted(target.rglob("*.html")):
            scanned += 1
            try:
                if process_file(path, repo_root):
                    changed += 1
                    print(f"{'[DRY RUN] Would update' if DRY_RUN else 'Updated'}: {path.name}")
            except Exception as exc:
                errors += 1
                print(f"ERROR processing {path.name}: {exc}")

    print(f"\n{'DRY RUN — ' if DRY_RUN else ''}Scanned {scanned} HTML files. "
          f"{'Would update' if DRY_RUN else 'Updated'} {changed}. Errors: {errors}.")


if __name__ == "__main__":
    main()
