"""Shared fixtures for the character sheet theme tests.

Serves a copy of Webpages/ (SHEET_DIR, default ../../Webpages) on a local port and
opens the character sheet in Chrome with the example character.
"""
import functools
import http.server
import os
import threading
from pathlib import Path

import pytest
from playwright.sync_api import sync_playwright

SHEET_DIR = Path(os.environ.get("SHEET_DIR", Path(__file__).resolve().parents[2] / "Webpages"))
CHROME = os.environ.get("CHROME", "/usr/bin/google-chrome")


class _Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a):
        pass


@pytest.fixture(scope="session")
def base_url():
    srv = http.server.ThreadingHTTPServer(("127.0.0.1", 0), functools.partial(_Quiet, directory=str(SHEET_DIR)))
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    yield f"http://127.0.0.1:{srv.server_address[1]}"
    srv.shutdown()


@pytest.fixture(scope="session")
def browser():
    with sync_playwright() as p:
        b = p.chromium.launch(executable_path=CHROME)
        yield b
        b.close()


def open_sheet(browser, base_url, width=1280, reduced_motion="no-preference"):
    ctx = browser.new_context(viewport={"width": width, "height": 1000}, reduced_motion=reduced_motion)
    pg = ctx.new_page()
    pg.errors = []
    pg.on("pageerror", lambda e: pg.errors.append(str(e)))
    # jQuery (site header) and web fonts are blocked so every run renders the same way.
    for pat in ("**/ajax.googleapis.com/**", "**/fonts.googleapis.com/**", "**/fonts.gstatic.com/**"):
        pg.route(pat, lambda r: r.abort())
    pg.goto(base_url + "/character-sheet.html")
    pg.wait_for_selector("#cs-name")
    pg.wait_for_timeout(600)
    return pg


@pytest.fixture
def page(browser, base_url):
    pg = open_sheet(browser, base_url)
    yield pg
    pg.context.close()


@pytest.fixture
def phone(browser, base_url):
    pg = open_sheet(browser, base_url, width=390)
    yield pg
    pg.context.close()
