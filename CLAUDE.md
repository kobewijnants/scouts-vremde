# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Website for Scouts & Gidsen Sint-Jan in d'Olie Vremde (https://www.scoutsvremde.be) — a Belgian scouts group.

Static HTML site using Tailwind CSS via CDN, no build tools. All pages share a Tailwind config (`public/js/tailwind.config.js`) and custom CSS (`public/css/styles.css`).

Apache `DocumentRoot` points to `public/` — only files inside `public/` are served. Dev/config files at the repo root (CLAUDE.md, DESIGN.md, TODO.md, etc.) are never accessible to visitors.

## File Structure

```
scouts-vremde/
├── CLAUDE.md                         # (not served)
├── DESIGN.md                         # (not served)
├── README.md                         # (not served)
├── TODO.md                           # (not served)
├── .github/                          # (not served)
└── public/                           # ← DocumentRoot
    ├── .htaccess                     # Security headers, caching, compression
    ├── index.html                    # Homepage
    ├── favicon.ico
    ├── robots.txt
    ├── sitemap.xml
    ├── css/
    │   └── styles.css                # Shared custom CSS
    ├── js/
    │   └── tailwind.config.js        # Shared Tailwind config with design tokens
    ├── img/
    │   └── homepage.jpg              # Homepage hero image
    ├── includes/
    │   ├── nav.html                  # Shared navigation (loaded via JS)
    │   └── footer.html               # Shared footer (loaded via JS)
    ├── errors/
    │   ├── 404.html                  # Custom 404 page
    │   └── 500.html                  # Custom 500 page
    ├── pages/
    │   ├── takken.html               # Takken overview
    │   ├── tak-kapoenen.html         # Kapoenen detail page
    │   ├── janneman.html             # Events + per-tak PDF viewer with tabs
    │   ├── contact.html              # Contact info, groepsleiding, location
    │   └── verhuur.html              # Material rental page
    ├── docs/                         # Public documents (privacy policy, etc.)
    └── uploads/                      # Uploaded content
```

## Navigation

- Nav links: Home, Takken, Janneman, Contact, Verhuur
- Desktop: horizontal links in navbar
- Mobile: hamburger menu toggling a dropdown
- Active page highlighted in green (`#3b6934`) with bottom border
- Nav and footer are loaded via `includes.js` from `/includes/nav.html` and `/includes/footer.html`
- All internal links use clean URLs (e.g., `/contact`, `/takken`, `/tak-kapoenen`)
- Apache mod_rewrite maps clean URLs to `/pages/*.html` files internally
- Old `/pages/*.html` URLs are 301-redirected to their clean equivalents

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
