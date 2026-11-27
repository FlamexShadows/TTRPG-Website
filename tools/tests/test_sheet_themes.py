"""Character sheet class theme tests (plan: docs/superpowers/plans/2026-11-27-class-themes.md)."""
import os
from pathlib import Path

import pytest
from PIL import Image, ImageChops

from conftest import open_sheet
from sheet_checks import check_theme, css, set_theme, tab_ids

BASELINE = Path(__file__).parent / "baseline"


def classic_shots(browser, base_url):
    """Yield (name, png_bytes) for every Classic view the baseline covers."""
    for width in (1280, 390):
        pg = open_sheet(browser, base_url, width=width)
        for t in tab_ids(pg):
            pg.click(f"#cs-tab-{t}")
            pg.wait_for_timeout(250)
            yield f"{width}-tab-{t}", pg.screenshot(full_page=True)
        pg.click("#cs-tab-" + tab_ids(pg)[0])
        pg.click("#cs-dice-fab")
        pg.wait_for_timeout(300)
        yield f"{width}-rolls", pg.screenshot(full_page=True)
        pg.click("#cs-dice-fab")
        pg.click('[data-act="new"]')
        pg.wait_for_timeout(500)
        yield f"{width}-builder", pg.screenshot(full_page=True)
        pg.context.close()


@pytest.mark.skipif(os.environ.get("MAKE_BASELINE") != "1", reason="run with MAKE_BASELINE=1 to (re)capture")
def test_make_baseline(browser, base_url):
    BASELINE.mkdir(exist_ok=True)
    n = 0
    for name, png in classic_shots(browser, base_url):
        (BASELINE / f"{name}.png").write_bytes(png)
        n += 1
    print(f"{n} PNGs written")


def _diff_ratio(a_png, b_path):
    import io
    a = Image.open(io.BytesIO(a_png)).convert("RGB")
    b = Image.open(b_path).convert("RGB")
    if a.size != b.size:
        return 1.0
    diff = ImageChops.difference(a, b).convert("L").point(lambda v: 255 if v > 8 else 0)
    return diff.histogram()[255] / (a.size[0] * a.size[1])


@pytest.mark.skipif(not BASELINE.is_dir() or not any(BASELINE.glob('*.png')), reason='no baseline; run MAKE_BASELINE=1 on a known-good Classic first')
def test_classic_unchanged(browser, base_url):
    bad = []
    for name, png in classic_shots(browser, base_url):
        r = _diff_ratio(png, BASELINE / f"{name}.png")
        if r >= 0.001:
            bad.append(f"{name}: {r:.4%} of pixels differ")
    assert not bad, "\n".join(bad)


def test_theme_on_app(page):
    set_theme(page, "mage")
    assert page.eval_on_selector("#cs-app", "e => e.dataset.theme") == "mage"


def test_builder_stays_classic(page):
    set_theme(page, "mage")
    page.click('[data-act="new"]')
    page.wait_for_timeout(400)
    assert css(page, "#cs-builder", "background-color") == "rgb(251, 245, 229)"


def test_no_image_files():
    import re
    text = (Path(__file__).resolve().parents[2] / "Webpages" / "character-sheet-themes.css").read_text(encoding="utf-8")
    urls = re.findall(r"url\(\s*['\"]?([^'\")]+)", text)
    assert all(u.startswith("data:image/svg+xml") for u in urls), [u[:40] for u in urls if not u.startswith("data:image/svg+xml")]


# One row per finished class theme (added by Tasks 4 to 10).
THEMES = [
    {"id": "mage", "ground": "dark", "font": "Marcellus SC"},
    {"id": "grove-keeper", "ground": "light", "font": "Alegreya SC"},
    {"id": "warrior", "ground": "dark", "font": "Grenze"},
    {"id": "hunter", "ground": "light", "font": "IM Fell English SC"},
    {"id": "phantom", "ground": "dark", "font": "Cormorant SC"},
    {"id": "priest", "ground": "light", "font": "Forum"},
    {"id": "pact-keeper", "ground": "dark", "font": "UnifrakturMaguntia"},
]


def _bytes_ratio(a_png, b_png):
    import io
    a = Image.open(io.BytesIO(a_png)).convert("RGB")
    b = Image.open(io.BytesIO(b_png)).convert("RGB")
    if a.size != b.size:
        return 1.0
    diff = ImageChops.difference(a, b).convert("L").point(lambda v: 255 if v > 8 else 0)
    return diff.histogram()[255] / (a.size[0] * a.size[1])


@pytest.mark.parametrize("row", THEMES, ids=[r["id"] for r in THEMES])
def test_theme(page, phone, row):
    page.emulate_media(media="print")
    classic = page.screenshot(full_page=True)
    page.emulate_media(media="screen")
    probs = check_theme(page, row, phone=phone, classic_print=lambda shot: _bytes_ratio(shot, classic))
    assert not probs, "\n".join(probs)


TEST_FRAME = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 10'%3E%3Crect width='10' height='10'/%3E%3C/svg%3E\")"
FRAMED = [".cs-wrap:not(.cs-builder) .cs-frame", ".cs-wrap:not(.cs-builder) .cs-q > .cs-val.big"]


def _set_test_frame(page):
    page.evaluate("f => { const a = document.getElementById('cs-app').style; a.setProperty('--cs-frame', f); a.setProperty('--cs-frame-on', '1'); }", TEST_FRAME)
    page.wait_for_timeout(100)


def _frame_images(page):
    return page.evaluate("""sels => sels.flatMap(s => [...document.querySelectorAll(s)].map(e => getComputedStyle(e, '::before').backgroundImage))""", FRAMED)


def _set_vital(page, key, value):
    page.fill(f"#cur-{key}", str(value))
    page.dispatch_event(f"#cur-{key}", "change")
    page.wait_for_timeout(200)


def test_frame_slots(page):
    _set_test_frame(page)
    imgs = _frame_images(page)
    assert len(imgs) >= 12 and all("svg" in i for i in imgs), imgs


def test_classic_has_no_frame(page):
    imgs = _frame_images(page)
    assert len(imgs) >= 12 and all(i == "none" for i in imgs), imgs


def test_long_numbers_fit(page):
    _set_test_frame(page)
    _set_vital(page, "hp", -12)
    for key in ("hp",):
        cls = page.get_attribute(f"#cur-{key}", "class")
        sw, cw = page.eval_on_selector(f"#cur-{key}", "e => [e.scrollWidth, e.clientWidth]")
        assert "cs-long" in cls and sw <= cw, (key, cls, sw, cw)
    _set_vital(page, "hp", 30)
    assert page.input_value("#cur-hp") == "30"
    assert "cs-long" not in page.get_attribute("#cur-hp", "class")


def test_six_vitals_fit_phone(phone):
    phone.select_option("#f-class0", "Mage")
    phone.wait_for_timeout(200)
    phone.select_option("#f-class1", "Warrior")
    phone.wait_for_timeout(200)
    for sel, v in (("#f-clvl0", "3"), ("#f-clvl1", "2")):
        phone.fill(sel, v)
        phone.dispatch_event(sel, "change")
        phone.wait_for_timeout(200)
    _set_test_frame(phone)
    assert phone.locator(".cs-wrap:not(.cs-builder) .cs-frame").count() == 6
    assert phone.evaluate("document.scrollingElement.scrollWidth") <= 390


def test_stat_buttons_still_work(page):
    _set_test_frame(page)
    page.click('.cs-wrap:not(.cs-builder) .cs-q [data-break="ac"]')
    page.wait_for_timeout(200)
    assert page.is_visible("#cs-pop")
    page.keyboard.press("Escape")
    before = page.locator("#cs-roll-list li:not(.cs-note)").count()
    page.click('.cs-wrap:not(.cs-builder) .cs-q [data-roll="init"]')
    page.wait_for_timeout(200)
    assert page.locator("#cs-roll-list li:not(.cs-note)").count() == before + 1


def test_theme_fonts_swap(page):
    for t in ["mage", "warrior", "mage", "classic", "grove-keeper"]:
        set_theme(page, t)
    links = page.query_selector_all("#cs-theme-fonts")
    assert len(links) == 1 and "Alegreya" in links[0].get_attribute("href")
    set_theme(page, "classic")
    assert page.query_selector("#cs-theme-fonts") is None


def test_builder_classic_under_mage(page):
    set_theme(page, "mage")
    page.click('[data-act="new"]')
    page.wait_for_timeout(400)
    assert css(page, "#cs-builder", "background-color") == "rgb(251, 245, 229)"


def test_mage_sigil_motion(page, browser, base_url):
    set_theme(page, "mage")
    hero = ".cs-wrap:not(.cs-builder) .cs-hero"
    assert css(page, hero, "animation-name", "::before") not in ("", "none")
    calm = open_sheet(browser, base_url, reduced_motion="reduce")
    set_theme(calm, "mage")
    assert css(calm, hero, "animation-name", "::before") == "none"
    calm.context.close()
