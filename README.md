# Concepts Need a Place（概念需要位置）

**A Personal RU Tree for Reading, Thinking, and Action**  
*By Lin Mi*

A practical Quarto book on **concept placement（概念安置）**: how to build a personal **RU Tree（可指称单位树）**, locate concepts across eight life domains, diagnose messy problems by separating misplacements, and turn reading into callable language.

## Book Structure

- **Front Matter**: `index.qmd`, `chapter-00-foreword.qmd`
- **Part 1 — Method and Map** (`chapter-01` – `chapter-04`): Subject Gain Principle, Referable Unit (RU), Four-Layer Structure, Eight-Theme Map
- **Part 2 — Body and Mind** (`chapter-05` – `chapter-06`)
- **Part 3 — Language and Work** (`chapter-07` – `chapter-08`)
- **Part 4 — Relationship and Society** (`chapter-09` – `chapter-10`)
- **Part 5 — Technology and Value** (`chapter-11` – `chapter-12`)
- **Part 6 — Use and Training** (`chapter-13` – `chapter-15`): Placing a New Concept, Diagnosing with the RU Tree, Maintaining & Training the System
- **Appendices** (`appendix-a` – `appendix-d`): RU Tree Master Table, Concept Placement Card, Daily Training, Stress Test
- **References**: `references.qmd` + `references.bib`

## Repository Layout

```text
.
├── _quarto.yml                 # Quarto book configuration (HTML + PDF)
├── index.qmd                   # Book landing page
├── chapter-00..15-*.qmd        # Foreword + 15 core chapters
├── appendix-a..d-*.qmd         # 4 practical appendices
├── references.qmd / .bib       # Curated references & conceptual lineage
├── assets/
│   ├── cover.svg               # Bespoke vector book cover
│   ├── favicon.svg             # Site favicon
│   ├── custom.css              # Light/dark adaptive editorial typography
│   ├── diagrams/               # Hand-crafted SVG conceptual diagrams
│   ├── toys.css                # Unified interactive lab stylesheet
│   ├── toys-loader.html        # Deterministic ordered script loader
│   └── toys/                   # Zero-dependency RU-Tree interactive engine & modules
│       ├── core.js             # Unified mount engine (window.RUToys)
│       ├── part1.js            # Chapters 01–04 interactive labs
│       ├── part2.js            # Chapters 05–06 interactive labs
│       ├── part3.js            # Chapters 07–08 interactive labs
│       ├── part4.js            # Chapters 09–10 interactive labs
│       ├── part5.js            # Chapters 11–12 interactive labs
│       ├── part6.js            # Chapters 13–15 interactive labs
│       └── appendices.js       # Appendices interactive labs
├── scripts/
│   └── verify_book.py          # Automated structural, link, diagram & lab validator
├── docs/                       # Internal authoring notes, style guide, old drafts
└── .github/workflows/
    └── publish.yml             # CI verification & GitHub Pages deployment
```

## Build & Verification

Run the automated integrity check before rendering:

```bash
python3 scripts/verify_book.py
```

Preview or render the book locally with Quarto:

```bash
quarto preview
quarto render --to html
```
