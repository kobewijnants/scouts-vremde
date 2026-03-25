# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Website for Scouts Vremde (https://www.scoutsvremde.be) — a Belgian scouts group. No tech stack or code has been set up yet; the repo currently contains only design documentation.

## Design System

The design system is documented in `DESIGN.md` and follows an "Editorial Adventure / Guided Expedition" aesthetic. Key constraints:

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
