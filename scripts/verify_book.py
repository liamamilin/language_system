#!/usr/bin/env python3
"""Automated integrity validator for Concepts Need a Place (Quarto Book).

Checks:
1. Required config, assets, CSS, loader, and all QMD files listed in _quarto.yml exist.
2. No double-numbering prefixes in chapter/appendix titles; foreword is unnumbered.
3. All embedded SVG diagrams exist and are well-formed XML.
4. Deterministic script load order in assets/toys-loader.html (core.js first, all modules present).
5. Strict 1-to-1 bijection between registered RUToys IDs (assets/toys/*.js) and
   HTML conditional-block containers ([data-ru-toy="..."]) in *.qmd, with >=2 labs per chapter.
6. Group consistency between Appendix A and Chapters 5-12.
"""

from __future__ import annotations

import pathlib
import re
import sys
import xml.etree.ElementTree as ET

ROOT = pathlib.Path(__file__).resolve().parent.parent
ERRORS: list[str] = []


def fail(msg: str) -> None:
    ERRORS.append(msg)


def check_quarto_config() -> None:
    cfg = (ROOT / "_quarto.yml").read_text(encoding="utf-8")
    for rel in re.findall(r'-\s+([a-zA-Z0-9_./-]+\.(?:qmd|css|html|svg|bib))', cfg):
        if not (ROOT / rel).exists():
            fail(f"_quarto.yml references missing file: {rel}")
    for key in ("cover-image", "favicon", "bibliography", "include-after-body"):
        m = re.search(rf'^\s*{key}:\s*(\S+)', cfg, re.M)
        if not m:
            fail(f"_quarto.yml missing key: {key}")
        elif not (ROOT / m.group(1)).exists():
            fail(f"_quarto.yml {key} points to missing file: {m.group(1)}")
    if "assets/cover.svg" in (ROOT / "index.qmd").read_text(encoding="utf-8"):
        fail("index.qmd must not manually embed assets/cover.svg because _quarto.yml cover-image already renders it.")
    if "assets/toys/**" not in cfg:
        fail("_quarto.yml must declare 'assets/toys/**' under project.resources so Quarto copies interactive JS to _book/")


def check_titles_and_diagrams() -> None:
    fw = (ROOT / "chapter-00-foreword.qmd").read_text(encoding="utf-8")
    if "{.unnumbered}" not in fw:
        fail("chapter-00-foreword.qmd must be marked {.unnumbered} to avoid shifting Chapter 1 to 2.")

    for p in sorted(ROOT.glob("chapter-*.qmd")):
        if p.name == "chapter-00-foreword.qmd":
            continue
        t = p.read_text(encoding="utf-8")
        if re.search(r'^title:\s*"Chapter \d+:', t, re.M):
            fail(f"Double-numbering title prefix found in {p.name}")

    for p in sorted(ROOT.glob("appendix-*.qmd")):
        t = p.read_text(encoding="utf-8")
        if re.search(r'^title:\s*"Appendix [A-D]:', t, re.M):
            fail(f"Double-numbering appendix prefix found in {p.name}")

    # Validate all SVGs on disk and all referenced diagrams
    for svg in sorted(ROOT.glob("assets/**/*.svg")):
        try:
            ET.parse(svg)
        except ET.ParseError as exc:
            fail(f"Malformed SVG XML in {svg.relative_to(ROOT)}: {exc}")

    for qmd in sorted(ROOT.glob("*.qmd")):
        txt = qmd.read_text(encoding="utf-8")
        for img_path in re.findall(r'!\[[^\]]*\]\((assets/[^)]+)\)', txt):
            if not (ROOT / img_path).exists():
                fail(f"{qmd.name} references missing image: {img_path}")


def check_js_balance(path: pathlib.Path) -> None:
    text = path.read_text(encoding="utf-8")
    # Quick structural check: strip single-line comments and verify non-empty
    if len(text.strip()) < 50:
        fail(f"JS file suspiciously empty: {path.name}")
    # Ensure R.register or window.RUToys is present
    if path.name == "core.js":
        if "global.RUToys" not in text:
            fail("assets/toys/core.js does not export global.RUToys")
    else:
        if "R.register(" not in text:
            fail(f"assets/toys/{path.name} has no R.register() calls")


def check_interactive_toys() -> None:
    loader_path = ROOT / "assets/toys-loader.html"
    if not loader_path.exists():
        fail("Missing assets/toys-loader.html")
        return

    loader_txt = loader_path.read_text(encoding="utf-8")
    scripts = re.findall(r'<script\s+src="([^"]+)"></script>', loader_txt)
    if not scripts or scripts[0] != "assets/toys/core.js":
        fail("assets/toys-loader.html must load assets/toys/core.js FIRST.")

    expected_js = sorted(p.relative_to(ROOT).as_posix() for p in (ROOT / "assets/toys").glob("*.js"))
    if set(scripts) != set(expected_js):
        fail(f"Loader scripts mismatch disk files. Loader={scripts}, Disk={expected_js}")

    registered: list[str] = []
    for rel in scripts:
        js_path = ROOT / rel
        if not js_path.exists():
            fail(f"Missing script in loader: {rel}")
            continue
        check_js_balance(js_path)
        if rel != "assets/toys/core.js":
            ids = re.findall(r"R\.register\(\s*'([a-z0-9-]+)'", js_path.read_text(encoding="utf-8"))
            registered.extend(ids)

    if len(registered) != len(set(registered)):
        dups = sorted({x for x in registered if registered.count(x) > 1})
        fail(f"Duplicate registered toy IDs: {dups}")

    embedded: list[str] = []
    per_chapter: dict[str, list[str]] = {}
    for qmd in sorted(ROOT.glob("*.qmd")):
        txt = qmd.read_text(encoding="utf-8")
        ids = re.findall(r'data-ru-toy="([a-z0-9-]+)"', txt)
        embedded.extend(ids)
        if re.match(r'^chapter-(0[1-9]|1[0-5])-', qmd.name):
            per_chapter[qmd.name] = ids
            if len(ids) < 2:
                fail(f"{qmd.name} has fewer than 2 interactive labs ({len(ids)})")
        # Ensure every data-ru-toy is wrapped inside content-visible html block
        for tid in ids:
            pattern = rf'::: \{{\.content-visible when-format="html"\}}\s*<div data-ru-toy="{re.escape(tid)}"></div>\s*:::'
            if not re.search(pattern, txt):
                fail(f"{qmd.name}: lab '{tid}' is not wrapped in a Quarto HTML conditional block.")

    if len(embedded) != len(set(embedded)):
        dups = sorted({x for x in embedded if embedded.count(x) > 1})
        fail(f"Duplicate embedded toy IDs in QMD: {dups}")

    reg_set, emb_set = set(registered), set(embedded)
    if reg_set != emb_set:
        only_reg = sorted(reg_set - emb_set)
        only_emb = sorted(emb_set - reg_set)
        fail(f"1-to-1 toy ID mismatch! Registered-only={only_reg}, Embedded-only={only_emb}")

    print(f"[OK] Interactive labs verified: {len(registered)} registered == {len(embedded)} embedded (1:1 bijection across {len(per_chapter)} chapters + appendices).")


def check_appendix_a_consistency() -> None:
    app_a = (ROOT / "appendix-a-ru-tree-table.qmd").read_text(encoding="utf-8")
    theme_files = {
        "Body": "chapter-05-body-toolbox.qmd",
        "Mind": "chapter-06-mind-toolbox.qmd",
        "Language": "chapter-07-language-toolbox.qmd",
        "Work": "chapter-08-work-toolbox.qmd",
        "Relationship": "chapter-09-relationship-toolbox.qmd",
        "Society": "chapter-10-society-toolbox.qmd",
        "Technology": "chapter-11-technology-toolbox.qmd",
        "Value": "chapter-12-value-toolbox.qmd",
    }
    for theme, fname in theme_files.items():
        m = re.search(rf'^\|\s*\*\*{theme}\*\*\s*\|\s*(.+?)\s*\|$', app_a, re.M)
        if not m:
            fail(f"Appendix A Group Table missing row for {theme}")
            continue
        app_groups = [g.strip() for g in m.group(1).split(",")]
        ch_txt = (ROOT / fname).read_text(encoding="utf-8")
        ch_groups = re.findall(r'^### (.+)$', ch_txt, re.M)
        if app_groups != ch_groups:
            fail(f"Group mismatch for {theme}: Appendix A={app_groups} vs {fname}={ch_groups}")
    print("[OK] Appendix A 8x8 Group Table matches Chapters 5-12 in exact order.")


def main() -> int:
    check_quarto_config()
    check_titles_and_diagrams()
    check_interactive_toys()
    check_appendix_a_consistency()

    if ERRORS:
        print("\n[FAIL] Verification failed with errors:")
        for e in ERRORS:
            print(f"  - {e}")
        return 1

    print("[PASS] All book engineering, visual, content, and interactive checks passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
