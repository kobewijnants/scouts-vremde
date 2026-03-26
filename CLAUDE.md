# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Website for Scouts & Gidsen Sint-Jan in d'Olie Vremde (https://www.scoutsvremde.be) — a Belgian scouts group.

Static HTML site using Tailwind CSS via CDN, no build tools. All pages share a Tailwind config (`js/tailwind.config.js`) and custom CSS (`css/styles.css`).

## File Structure

```
scouts-vremde/
├── index.html                    # Homepage
├── CLAUDE.md
├── DESIGN.md
├── README.md
├── css/
│   └── styles.css                # Shared custom CSS
├── js/
│   └── tailwind.config.js        # Shared Tailwind config with design tokens
├── img/
│   └── homepage.jpg              # Homepage hero image
├── jannemannen/
│   └── janneman.pdf              # Full Janneman PDF
│   # Per-tak PDFs go here: kapoenen.pdf, welpen.pdf, etc.
└── pages/
    ├── takken.html               # Takken overview (8 tak cards)
    ├── tak-kapoenen.html         # Kapoenen detail page
    ├── janneman.html             # Events + per-tak PDF viewer with tabs
    ├── contact.html              # Contact info, groepsleiding, location with Maps
    └── verhuur.html              # Material rental page
```

## Navigation

- Nav links: Home, Takken, Janneman, Contact, Verhuur
- Desktop: horizontal links in navbar
- Mobile: hamburger menu toggling a dropdown
- Active page highlighted in green (`#3b6934`) with bottom border
- Each page has its own nav/footer (no templating — static site)
- `index.html` uses `pages/` prefix for links; subpages use relative paths

## Key Info

- **Full name**: Scouts & Gidsen Sint-Jan in d'Olie Vremde
- **Address**: Broechemsesteenweg 100, 2531 Boechout
- **Facebook**: https://www.facebook.com/groups/783501543832521/
- **Groepsleiding email**: groepsleiding@scoutsvremde.be
- **Materiaal verhuur email**: materiaal@scoutsvremde.be
- **Takken**: Kapoenen, Welpen, Kabouters, Jong-Verkenners, Jong-Gidsen, Verkenners, Gidsen, Jins

## Design System

**Always follow the design choices documented in `DESIGN.md`.** It is the single source of truth for all visual and layout decisions. The summary below highlights key constraints, but when in doubt, consult `DESIGN.md` directly.

The design system follows an "Editorial Adventure / Guided Expedition" aesthetic. Key constraints:

- **No 1px borders** for sectioning — use tonal surface transitions instead
- **No pure black** (`#000000`) — always use `on-background` (`#1c1c16`)
- **No standard drop shadows** — use tonal layering; when shadows are needed, use ultra-diffused shadows tinted from `on-surface`
- **No dividers** between list items — use vertical whitespace
- **Buttons** use `rounded-full`; chips ("Scout Badges") use `rounded-md`
- **Cards** have no borders, use `surface-container-low` with `rounded-xl`
- **Typography**: Plus Jakarta Sans for display/headlines, Manrope for body/labels
- **Colors**: Primary `#5a2e00` (brown), Secondary `#3b6934` (forest green), Accent warm orange-yellow (`#ffb273`, `#7c4100`) for CTAs
- **Surface hierarchy**: surface → surface-container-low → surface-container-highest (nest one step at a time)
- **Glassmorphism** for floating nav/mobile menus: `surface` at 80% opacity + 20px backdrop-blur
- **Input focus state**: 2px solid `primary` border
