import os
import re
from pathlib import Path


def read_text(path: Path) -> str:
    try:
        return path.read_text(encoding="utf-8")
    except UnicodeDecodeError:
        return path.read_text(encoding="latin-1")


def write_text(path: Path, content: str) -> None:
    path.write_text(content, encoding="utf-8", newline="\n")


def extract_display_name(html: str, fallback_name: str) -> str:
    # Try <h2> or <h3>
    m = re.search(r"<h[23][^>]*>([^<]+)</h[23]>", html, re.IGNORECASE)
    if m:
        name = m.group(1).strip()
        if name:
            return name
    # Try Name: lines
    m = re.search(r"Name:\s*([^<\n]+)", html, re.IGNORECASE)
    if m:
        name = m.group(1).strip()
        if name:
            return name
    # Fallback to filename
    return fallback_name


def ensure_single_head(html: str) -> str:
    # Collapse accidental nested <head><head>
    html = re.sub(r"<head>\s*<head>", "<head>", html, flags=re.IGNORECASE)
    html = re.sub(r"</head>\s*</head>", "</head>", html, flags=re.IGNORECASE)
    return html


def upsert_in_head(html: str, insertions: str) -> str:
    # Insert content just before </head>
    if re.search(r"</head>", html, flags=re.IGNORECASE):
        return re.sub(r"</head>", insertions + "\n</head>", html, count=1, flags=re.IGNORECASE)
    # If no head, create one after <html ...>
    if re.search(r"<html[^>]*>", html, flags=re.IGNORECASE):
        return re.sub(r"(<html[^>]*>)", r"\1\n<head>\n" + insertions + "\n</head>", html, count=1, flags=re.IGNORECASE)
    # Otherwise, prepend a head
    return "<head>\n" + insertions + "\n</head>\n" + html


def normalize_title(html: str, display_name: str) -> str:
    desired = f"<title>Sparks | {display_name}</title>"
    if re.search(r"<title>.*?</title>", html, flags=re.IGNORECASE | re.DOTALL):
        return re.sub(r"<title>.*?</title>", desired, html, count=1, flags=re.IGNORECASE | re.DOTALL)
    # Add into head
    return upsert_in_head(html, desired)


def ensure_assets(html: str) -> str:
    inserts = []
    if not re.search(r"A-Nav-bar\.css", html, flags=re.IGNORECASE):
        inserts.append('<link rel="stylesheet" type="text/css" href="A-Nav-bar.css"/>')
    if not re.search(r"ajax\.googleapis\.com/ajax/libs/jquery/", html, flags=re.IGNORECASE):
        inserts.append('<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>')
    if not re.search(r"\$\(function\(\)\{\s*\$\(\"header\"\)\.load\(\"A-Header\.html\"", html, flags=re.IGNORECASE):
        inserts.append(
            """
<script>
$(function(){
  $("header").load("A-Header.html");
});
</script>
""".strip()
        )
    if inserts:
        html = upsert_in_head(html, "\n".join(inserts))
    return html


def normalize_header(html: str) -> str:
    # Replace any header contents with an empty header to be filled by JS
    if re.search(r"<header[\s\S]*?>[\s\S]*?</header>", html, flags=re.IGNORECASE):
        html = re.sub(r"<header[\s\S]*?>[\s\S]*?</header>", "<header>\n</header>", html, count=1, flags=re.IGNORECASE)
    else:
        # If no header, insert after <body>
        html = re.sub(r"(<body[^>]*>)", r"\1\n<header>\n</header>", html, count=1, flags=re.IGNORECASE)
    # Remove stray <object data="A-Header.html" ...> if any lingering
    html = re.sub(r"<object[^>]*A-Header\.html[^>]*></object>", "", html, flags=re.IGNORECASE)
    return html


def ensure_main_content(html: str) -> str:
    # Ensure .main-content wrapper exists
    if not re.search(r"<div[^>]*class=\"[^\"]*main-content", html, flags=re.IGNORECASE):
        # Wrap body contents after header in main-content
        def _wrap(match: re.Match) -> str:
            before = match.group(1)
            after = match.group(2)
            return f"{before}\n<div class=\"main-content\">\n{after}\n</div>"

        html = re.sub(r"(<header>\s*</header>)([\s\S]*?</body>)", _wrap, html, count=1, flags=re.IGNORECASE)
    return html


def is_spell_or_maneuver(html: str) -> bool:
    patterns = [
        r"\bAP\s*Cost\b",
        r"\bSpell\s*Rank\b",
        r"\bSubtype\b",
        r"\bConcentration\b",
        r"\bAP:\s*\d",
        r"\bType:\b",
        r"\bRange:\b",
        r"\bDuration:\b",
    ]
    return any(re.search(p, html, flags=re.IGNORECASE) for p in patterns)


def process_html_file(path: Path) -> bool:
    original = read_text(path)
    html = original

    # Quick filter: only adjust likely spell/maneuver pages
    if not is_spell_or_maneuver(html):
        return False

    display_name = extract_display_name(html, path.stem)

    html = ensure_single_head(html)
    html = normalize_title(html, display_name)
    html = ensure_assets(html)
    html = normalize_header(html)
    html = ensure_main_content(html)

    # Minor polish: normalize "Sparks|" -> "Sparks |"
    html = re.sub(r"Sparks\|", "Sparks |", html)

    if html != original:
        write_text(path, html)
        return True
    return False


def main() -> None:
    repo_root = Path(__file__).parent
    targets = [repo_root / "Webpages", repo_root / "spells"]

    changed = 0
    scanned = 0

    for target in targets:
        if not target.exists():
            continue
        for path in target.rglob("*.html"):
            scanned += 1
            try:
                if process_html_file(path):
                    changed += 1
                    print(f"Updated: {path}")
            except Exception as exc:
                print(f"Error processing {path}: {exc}")

    print(f"Scanned {scanned} HTML files. Updated {changed}.")


if __name__ == "__main__":
    main()



