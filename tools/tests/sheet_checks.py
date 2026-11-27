"""Helpers shared by the theme tests."""

def set_theme(page, theme_id):
    page.select_option("#f-theme", theme_id)
    page.wait_for_timeout(200)


def css(page, selector, prop, pseudo=None):
    return page.eval_on_selector(selector, "(e, a) => getComputedStyle(e, a[1]).getPropertyValue(a[0]).trim()", [prop, pseudo])


def tab_ids(page):
    return page.eval_on_selector_all(".cs-wrap:not(.cs-builder) .cs-tab", "els => els.map(e => e.dataset.tab)")


CONTRAST_JS = r"""
(scopeSel) => {
  const parse = c => { const h = c && c.trim().match(/^#([0-9a-f]{6})$/i);
    if (h) return { r: parseInt(h[1].slice(0, 2), 16), g: parseInt(h[1].slice(2, 4), 16), b: parseInt(h[1].slice(4, 6), 16), a: 1 };
    const m = c && c.match(/rgba?\(([^)]+)\)/); if (!m) return null;
    const p = m[1].split(/[ ,\/]+/).filter(Boolean).map(Number); return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 }; };
  const lum = c => { const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
    return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b); };
  const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
  const bgOf = el => {
    const framed = el.matches('.cs-vital-num, .cs-q > .cs-val.big');
    if (framed) { const f = parse(getComputedStyle(el).getPropertyValue('--cs-frame-fill').trim()); if (f && f.a > 0.9) return f; }
    if (el.closest('.cs-seal')) { const f = parse(getComputedStyle(el).getPropertyValue('--cs-seal-fill').trim()); if (f && f.a > 0.9) return f; }
    for (let n = el; n && n.nodeType === 1; n = n.parentElement) {
      const cs = getComputedStyle(n), c = parse(cs.backgroundColor);
      if (c && c.a > 0.9) return c;
      const stops = (cs.backgroundImage.match(/rgba?\([^)]+\)/g) || []).map(parse).filter(x => x && x.a > 0.9);
      if (stops.length) return { r: stops.reduce((s, x) => s + x.r, 0) / stops.length, g: stops.reduce((s, x) => s + x.g, 0) / stops.length, b: stops.reduce((s, x) => s + x.b, 0) / stops.length, a: 1 };
    }
    return { r: 255, g: 255, b: 255, a: 1 };
  };
  const out = [];
  document.querySelectorAll(scopeSel).forEach(root => root.querySelectorAll('*').forEach(el => {
    if (!el.getClientRects().length || el.closest('[hidden]') || el.disabled) return;
    const st = getComputedStyle(el); if (st.visibility === 'hidden' || +st.opacity < 0.9) return;
    const own = [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim()) || (/^(INPUT|SELECT|TEXTAREA)$/.test(el.tagName) && el.type !== 'checkbox' && (el.value || '').trim());
    if (!own) return;
    const fg = parse(st.color); if (!fg) return;
    const r = ratio(fg, bgOf(el));
    if (r < 4.5) out.push(`${el.tagName.toLowerCase()}.${[...el.classList].join('.')} "${(el.value || el.textContent).trim().slice(0, 24)}" ${r.toFixed(2)}`);
  }));
  return out;
}
"""


def luminance_of(page, selector, prop="background-color"):
    return page.eval_on_selector(selector, """(e, p) => { const m = getComputedStyle(e).getPropertyValue(p).match(/\\d+(\\.\\d+)?/g).map(Number);
      const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
      return 0.2126 * f(m[0]) + 0.7152 * f(m[1]) + 0.0722 * f(m[2]); }""", prop)


def check_theme(page, row, phone=None, classic_print=None):
    """Return a list of problems for theme row {'id','ground':'dark'|'light','font'}; empty means pass."""
    probs = []
    set_theme(page, row["id"])
    wrap = ".cs-wrap:not(.cs-builder)"
    lum = luminance_of(page, wrap)
    if row["ground"] == "dark" and lum >= 0.06:
        probs.append(f"ground luminance {lum:.3f} is not dark (< 0.06)")
    if row["ground"] == "light" and lum <= 0.55:
        probs.append(f"ground luminance {lum:.3f} is not light (> 0.55)")
    fam = css(page, f"{wrap} .cs-name", "font-family")
    if row["font"] not in fam:
        probs.append(f"name font {fam!r} lacks {row['font']!r}")
    for sel in (f"{wrap} .cs-vital", f"{wrap} .cs-q"):
        if css(page, sel, "--cs-frame") in ("", "none"):
            probs.append(f"{sel} has no --cs-frame")
    for t in tab_ids(page):
        page.click(f"#cs-tab-{t}"); page.wait_for_timeout(150)
        probs += [f"contrast [{t}] {x}" for x in page.evaluate(CONTRAST_JS, f"{wrap}")]
    page.click("#cs-tab-" + tab_ids(page)[0])
    page.click("#cs-dice-fab"); page.wait_for_timeout(250)
    probs += [f"rolls contrast {x}" for x in page.evaluate(CONTRAST_JS, ".cs-rolls")]
    page.click("#cs-dice-fab")
    page.click(f'{wrap} [data-break="ac"]'); page.wait_for_timeout(250)
    probs += [f"pop contrast {x}" for x in page.evaluate(CONTRAST_JS, ".cs-pop")]
    page.keyboard.press("Escape")
    for sel in (f"{wrap} .cs-tools .cs-btn", f"{wrap} .cs-tab"):
        page.keyboard.press("Shift"); page.focus(sel)
        style, width = css(page, sel, "outline-style"), css(page, sel, "outline-width")
        if style == "none" or float(width.replace("px", "") or 0) < 2:
            probs.append(f"focus outline on {sel}: {style} {width}")
    if phone is not None:
        set_theme(phone, row["id"])
        w = phone.evaluate("document.scrollingElement.scrollWidth")
        if w > 391:
            probs.append(f"phone width scrolls sideways: {w}px")
    if classic_print is not None:
        page.emulate_media(media="print")
        shot = page.screenshot(full_page=True)
        page.emulate_media(media="screen")
        r = classic_print(shot)
        if r >= 0.001:
            probs.append(f"print differs from Classic print: {r:.4%}")
    return probs
