---
name: Akrista's Rockery Design System
description: A digital garden aligned with the notakrista.com visual style system
colors:
  bg: "oklch(0.270 0.005 65)"
  surface: "oklch(0.320 0.005 65)"
  surface-raised: "oklch(0.380 0.008 60)"
  ink: "oklch(0.910 0.030 88)"
  muted: "oklch(0.650 0.020 80)"
  primary: "oklch(0.700 0.180 50)"
  accent: "oklch(0.760 0.090 145)"
  border: "oklch(0.380 0.008 60)"
  bg-business: "oklch(0.955 0.030 95)"
  surface-business: "oklch(0.905 0.030 90)"
  ink-business: "oklch(0.230 0.005 70)"
  muted-business: "oklch(0.530 0.013 65)"
  primary-business: "oklch(0.490 0.180 45)"
  accent-business: "oklch(0.510 0.080 150)"
  border-business: "oklch(0.810 0.040 85)"
typography:
  display:
    fontFamily: "Instrument Sans, sans-serif"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Instrument Sans, sans-serif"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Instrument Sans, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  code:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
    fontSize: "0.875rem"
rounded:
  sm: "4px"
  md: "8px"
  lg: "12px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
components:
  link:
    textColor: "{colors.primary}"
  link-hover:
    textColor: "{colors.accent}"
---

# Design System: Akrista's Rockery

## 1. Overview

**Creative North Star: "The Working Bench"**

Akrista's Rockery visual system is aligned with the core **notakrista.com** design principles, themed around **Gruvbox** in OKLCH: warm, earthy, terminal-native colors.

This design system is flat by default with depth represented through tonal steps. It values typographic clarity, comfortable reading, and strict compliance with the **Gruvbox Rule**.

**Key Characteristics:**

- **Gruvbox Palette**: Warm tones with chromas calibrated for terminal-native, tactile grounding.
- **Instrument Sans Typography**: Precise grotesque display tracking paired with legible, tightly tracked headlines and body copy.
- **Flat Elevation**: Depth created by tonal layers, completely rejecting drop shadows at rest.
- **Clean Interactions**: Distinctive moss-aqua accents for hover and two-ring orange focus outlines.

## 2. Colors

The color system is divided into a default Personal View (dark) and a Business View (light) tonal shift.

### Personal View (Gruvbox Dark - Default)

- **Background (`bg`)**: `oklch(0.270 0.005 65)`
- **Surface (`surface`)**: `oklch(0.320 0.005 65)`
- **Surface Raised (`surface-raised`)**: `oklch(0.380 0.008 60)`
- **Ink (`ink`)**: `oklch(0.910 0.030 88)` (Primary text)
- **Muted (`muted`)**: `oklch(0.650 0.020 80)` (Metadata, secondary text)
- **Primary (`primary`)**: `oklch(0.700 0.180 50)` (Signal Orange - links, core accents)
- **Accent (`accent`)**: `oklch(0.760 0.090 145)` (Moss Aqua - link hover)
- **Border (`border`)**: `oklch(0.380 0.008 60)`

### Business View (Gruvbox Light - Tonal Shift)

- **Background (`bg-business`)**: `oklch(0.955 0.030 95)`
- **Surface (`surface-business`)**: `oklch(0.905 0.030 90)`
- **Ink (`ink-business`)**: `oklch(0.230 0.005 70)`
- **Muted (`muted-business`)**: `oklch(0.530 0.013 65)`
- **Primary (`primary-business`)**: `oklch(0.490 0.180 45)` (Signal Orange)
- **Accent (`accent-business`)**: `oklch(0.510 0.080 150)` (Moss Aqua)
- **Border (`border-business`)**: `oklch(0.810 0.040 85)`

### Named Rules

- **The Gruvbox Rule**: Use ONLY off-palette colors from this specific Gruvbox set. No generic Tailwind colors.
- **The One Orange Rule**: **Signal Orange** is the only saturated color allowed for filled CTAs.
- **Same-Hue Neutrals**: Neutrals carry a chroma of `0.005–0.030` towards the brand hue for warm tones.

## 3. Typography

- **Sans Family**: **Instrument Sans**
- **Monospace Stack**: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`

### Text Styles

- **Display (H1)**: Instrument Sans 600, `fontSize: clamp(2.5rem, 6vw, 4.5rem)`, letter-spacing: `-0.025em`, line-height: `1.05`.
- **Headline (H2)**: Instrument Sans 600, `fontSize: clamp(1.75rem, 3vw, 2.5rem)`, letter-spacing: `-0.02em`.
- **Title (H3)**: Instrument Sans 500, `1.25rem`.
- **Body**: Instrument Sans 400, `1rem`, line-height: `1.6`, cap line length at 65–75ch.
- **Label**: Instrument Sans 600, `0.75rem`, uppercase, letter-spacing: `0.08em`.
- **Mono**: System Monospace, `0.875rem`. Used for dates, times, counts, versions, statuses.

### Named Rules

- **The 75ch Ceiling**: Long-form prose columns must never exceed 75 characters in width (targeted to 70ch).

## 4. Elevation

Depth is represented strictly through tonal steps. Surfaces are flat with no box shadows at rest.

- **Focus Rings**: Focused elements use a custom two-ring pattern: `box-shadow: 0 0 0 2px var(--bg), 0 0 0 4px var(--primary)`.
- **Borders & Corners**: Gently rounded edges (`rounded-md` = 8px, `rounded-lg` = 12px max). No full pills for buttons.

## 5. Components

### Links

- **Primary**: Signal Orange (`oklch(0.700 0.180 50)` / `oklch(0.490 0.180 45)`).
- **Hover / Focus**: Moss Aqua (`oklch(0.760 0.090 145)` / `oklch(0.510 0.080 150)`).

### Tags (Chips)

- **Style**: Small pill-shaped outline tags.
- **Shape**: Full pill (`border-radius: 9999px`).
- **Typography**: Label typography.

### Search Bar

- **Style**: Flat outlined search container.
- **Focus**: Signal Orange outline focus ring.

### Callouts (Alerts)

- **Style**: Solid complete border with 8px rounded corners.
- **Shadow**: No shadow.
- **Typography**: Standard body text.

## 6. Do's and Don'ts

### Do:

- **Do** stick exclusively to the Gruvbox OKLCH values.
- **Do** ensure contrast meets ≥4.5:1 for body copy.
- **Do** use full pill border-radius ONLY for status/category tags.
- **Do** use tonal shifts (surface/surface-raised) to represent containment.

### Don't:

- **Don't** use box shadows at rest on buttons, inputs, or pre blocks.
- **Don't** use pills for buttons (reserve for tags).
- **Don't** allow long-form text blocks to stretch past 75ch.
- **Don't** use standard default Quartz fonts or hex styling.
