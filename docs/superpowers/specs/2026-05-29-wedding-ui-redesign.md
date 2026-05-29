# Wedding Site UI Redesign — Design Spec
**Date:** 2026-05-29  
**Project:** Lewis & Nicole Wedding Site  
**Stack:** Next.js 14, TypeScript, Tailwind CSS, Supabase

---

## Overview

Transform the existing minimal wedding site into a cinematic-romantic landing page. The aesthetic is warm parchment — like holding a physical wedding invitation. All work is mobile-first.

---

## Design System

### Color Palette

| Token | Value | Use |
|-------|-------|-----|
| Hero background | `#FAF7F2` | Full hero section background |
| Body background | `stone-50` | EventDetails, RSVPForm sections |
| Primary text | `#1C1917` (stone-900) | All headings and body |
| Muted text | `stone-500` | Subheadings, labels |
| Gold accent | `#B8975A` | Script "&", SVG divider, form focus glow, dividers |

### Typography

| Role | Font | Weight | Notes |
|------|------|--------|-------|
| Display (names) | Cormorant Garamond | 300/400 | Loaded via `next/font/google` |
| Script accent ("and") | Great Vibes | 400 | Loaded via `next/font/google` |
| Body / labels / form | Geist Sans | 400/500 | Already installed |

Cormorant Garamond and Great Vibes are added to `app/layout.tsx` via `next/font/google` and exposed as CSS variables.

### Botanical SVG Divider

A thin hand-drawn sprig/leaf SVG rendered inline between the names and the date in the Hero. Uses `stroke-dashoffset` animation (via Framer Motion) to "draw in" after names settle. Gold stroke `#B8975A`, no fill.

---

## Component Designs

### Hero (full redesign)

- **Background:** `#FAF7F2` full-viewport, no image
- **Layout:** vertically centered column, generous padding top/bottom (min-h-dvh)
- **Content stack (mobile, centered):**
  1. `Lewis` — Cormorant Garamond, ~52px mobile / ~96px desktop, font-light
  2. `and` — Great Vibes script, ~32px mobile / ~52px desktop, gold `#B8975A`
  3. `Nicole` — same as "Lewis"
  4. Botanical SVG divider — ~120px wide mobile / ~200px desktop
  5. `May 27, 2026` — Geist Sans, 11px, tracking-[0.22em], uppercase, stone-500
  6. Scroll cue `↓` — 16px, gold, pulsing

### Hero Animation Sequence (Framer Motion)

All animations use `ease-out`, 700ms duration, 24px y-slide-up + opacity 0→1.

| Step | Element | Delay |
|------|---------|-------|
| 1 | "Lewis" | 0ms |
| 2 | "and" (script) | 200ms |
| 3 | "Nicole" | 400ms |
| 4 | Botanical SVG draw-in | 700ms (stroke-dashoffset) |
| 5 | Date | 1100ms |
| 6 | Scroll cue | 1600ms (pulse loop) |

`prefers-reduced-motion`: wrap all variants in a check — if reduced motion, all elements render at full opacity/position immediately with no transition.

### EventDetails

- Section background: `stone-50`
- Cards: keep border/rounded-xl pattern but warm slightly — `stone-100` background, `stone-200` border
- Add Framer Motion `whileInView` fade-up (opacity 0→1, y: 20→0, duration 500ms, `once: true`) to each card with a 100ms stagger between them
- Section heading "The Wedding" gets same scroll-triggered fade-up

### RSVPForm (21st.dev component)

Fetch a premium card-based form from 21st.dev MCP. Requirements for the component:
- Card surface: white with subtle warm shadow, rounded-2xl
- Input focus: gold glow ring (`#B8975A` at 40% opacity)
- Card hover/idle: very subtle shimmer or inner glow effect
- Fields: Full Name, Email, Phone, Plus-one (toggle/checkbox), Dietary Restrictions (textarea)
- Submit button: stone-900 background, full-width, tracks pending/success states
- Mobile-first: all inputs min-height 52px, full-width stacked

On success, the form section transitions (Framer Motion `AnimatePresence`) to the "See You There" confirmation with a fade.

### Footer

- Background: `stone-100`
- Border-top: `stone-200`
- Text: gold accent `#B8975A` for "·" separator, stone-400 for the rest

---

## Implementation Notes

### Packages to Install
- `framer-motion` — animations throughout

### Font Loading
Add to `app/layout.tsx`:
```ts
import { Cormorant_Garamond, Great_Vibes } from "next/font/google"
```
Expose as `--font-cormorant` and `--font-great-vibes` CSS variables. Add to `tailwind.config.ts` as `fontFamily.display` and `fontFamily.script`.

### 21st.dev MCP Usage
Use `mcp__magic__21st_magic_component_builder` to fetch an interactive card-based form component. Adapt it to match the gold focus glow and warm shadow design tokens. Replace the existing RSVPForm internals while keeping the server action wiring (`submitRSVP`).

### File Changes
| File | Change |
|------|--------|
| `app/layout.tsx` | Add Cormorant Garamond + Great Vibes fonts |
| `tailwind.config.ts` | Add display + script font families |
| `components/Hero.tsx` | Full rewrite — parchment bg, typography, botanical SVG, Framer sequence |
| `components/EventDetails.tsx` | Warm background/card tones + scroll-triggered animations |
| `components/RSVPForm.tsx` | Replace with 21st.dev premium card component + AnimatePresence success transition |
| `components/Footer.tsx` | Warm tones + gold accent |
| `app/globals.css` | Any global animation or font resets |

---

## Constraints

- Mobile-first at every breakpoint (375px base, 768px tablet, 1024px desktop)
- `prefers-reduced-motion` respected — all Framer animations check this
- No layout shift from font loading (use `font-display: swap` via next/font defaults)
- Preserve all existing Supabase RSVP server action wiring unchanged
- No new pages — single-page redesign only
