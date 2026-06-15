---
name: Akrista's Rockery
description: A digital garden built on solid foundations - Obsidian and Quartz
colors:
  primary: "#CC241D"
  primary-dark: "#F22B02"
  secondary: "#D79921"
  secondary-dark: "#FABD2F"
  neutral-bg: "#FBF1C7"
  neutral-bg-dark: "#282828"
  neutral-ink: "#282828"
  neutral-ink-dark: "#EBDBB2"
  neutral-muted: "#928374"
  neutral-border: "#EBDBB2"
  neutral-border-dark: "#3C3836"
typography:
  display:
    fontFamily: "Schibsted Grotesk, sans-serif"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Source Sans Pro, sans-serif"
    fontSize: "1.1rem"
    fontWeight: 400
    lineHeight: 1.65
  code:
    fontFamily: "IBM Plex Mono, monospace"
    fontSize: "0.9em"
rounded:
  sm: "4px"
  md: "8px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
components:
  link:
    textColor: "{colors.primary}"
  link-hover:
    textColor: "{colors.secondary}"
---

# Design System: Akrista's Rockery

## 1. Overview

**Creative North Star: "The Basalt Scriptorium"**

Akrista's Rockery is a digital garden designed around the metaphor of enduring stone and mineral structures. The aesthetic is clean, grounded, and rustic yet modern. It values typographic durability and comfortable reading above all else. 

This design system rejects the ephemeral, over-decorated visual grammar of standard SaaS landing pages, avoiding unnecessary floating cards, artificial glassmorphism blurs, and decorative text gradients. Instead, it relies on solid typographic hierarchy and clear structural organization.

**Key Characteristics:**
- **Mineral Grounding**: Grounded structures using raw, mineral-inspired background levels.
- **Typographic Resilience**: Strong display letterforms paired with readable, spacious humanist body text.
- **Tonal Depth**: Layering defined by color contrast steps rather than artificial shadows.
- **Deliberate Accents**: High-chroma accents used only to guide the eye and denote links.

## 2. Colors

The color system is built on a "Clay and Basalt" palette, heavily inspired by the warm, organic tones of Gruvbox.

### Primary
- **Terracotta Red** (`#CC241D` / `#F22B02` in dark mode): Used exclusively for primary interactive links, headings of high importance, and strong semantic accents.

### Secondary
- **Ochre Gold** (`#D79921` / `#FABD2F` in dark mode): Used for hover states, selection states, and secondary interactive feedback.

### Neutral
- **Clay Light Background** (`#FBF1C7`): The default page background in light mode, evoking sun-baked clay.
- **Basalt Dark Background** (`#282828`): The default page background in dark mode and default text color in light mode.
- **Earth Gray** (`#928374`): The universal color for metadata, borders, and muted elements.
- **Sand Dust Border** (`#EBDBB2`): The border and divider color in light mode.
- **Charcoal Border** (`#3C3836`): The border and divider color in dark mode.

### Named Rules
**The Rarity of Red Rule.** Terracotta Red is used on ≤10% of any given screen. Its rarity is what makes it an effective call to attention.

## 3. Typography

**Display Font:** Schibsted Grotesk (sans-serif)
**Body Font:** Source Sans Pro (sans-serif)
**Code Font:** IBM Plex Mono (monospace)

The typographic pairing contrasts a bold, compact, grotesque display face with a highly legible, flowing humanist sans body face.

### Hierarchy
- **Display** (Bold (700), `clamp(2rem, 5vw, 3rem)`, `lineHeight: 1.1`): Used for main page titles (`h1`).
- **Headline** (Semi-bold (600), `clamp(1.5rem, 4vw, 2.2rem)`, `lineHeight: 1.2`): Used for subheadings (`h2`).
- **Title** (Semi-bold (600), `1.3rem`, `lineHeight: 1.3`): Used for section titles (`h3`).
- **Body** (Regular (400), `1.1rem`, `lineHeight: 1.65`): Used for all long-form prose and content. Capped at a maximum line length of `75ch`.
- **Label** (Regular (400) or Semi-bold (600), `0.9rem`, uppercase where appropriate): Used for metadata, breadcrumbs, tags, and small utility text.

### Named Rules
**The 75ch Ceiling.** Long-form prose must never exceed `75ch` in width to ensure optimal readability and eye-tracking.

## 4. Elevation

Akrista's Rockery completely rejects the use of drop shadows. Depth and elevation are conveyed exclusively through tonal layering—shifting background colors to create containment and structure.

### Named Rules
**The Flat Grounding Rule.** All containers, dialogs, and cards are flat at rest. Overlays and hover states differentiate themselves using background step shifts (e.g. from Clay Background `#FBF1C7` to Sand Dust `#EBDBB2`) and solid borders, never shadows.

## 5. Components

### Links
- **Shape:** Inline text, no radius.
- **Primary:** Terracotta Red (`#CC241D` / `#F22B02` in dark mode).
- **Hover / Focus:** Ochre Gold (`#D79921` / `#FABD2F` in dark mode) with a smooth transition (`color 0.2s ease`).

### Tags (Chips)
- **Style:** Small rounded boxes with a border. Background is transparent or a light tint of Earth Gray.
- **Shape:** Rounded-sm (`4px` border radius).
- **Text:** Label typography (`0.9rem`).

### Search Bar
- **Style:** Clean border outline without shadows. Inside background is Clay Light (`#FBF1C7`) or Basalt Dark (`#282828`).
- **Focus:** Outlined with a solid Terracotta Red (`#CC241D`) border.

### Callouts (Alerts)
- **Style:** Thick solid borders on all sides or a solid block background. 
- **Shape:** Rounded-sm (`4px` border radius).
- **Text:** Standard body typography with appropriate color tint matching the callout type (e.g., yellow tint for warnings, red for errors).

### Explorer Tree
- **Style:** Flat directory structure with subtle left borders on nested levels.
- **Hover:** Ochre Gold (`#D79921`) color change on folder names.

## 6. Do's and Don'ts

### Do:
- **Do** limit Terracotta Red accents to ≤10% of page area.
- **Do** ensure all text hits a contrast ratio of at least 4.5:1 against its background.
- **Do** constrain long-form reading columns to a maximum of 75 characters (`75ch`).
- **Do** use background tonal steps (`#FBF1C7` vs `#EBDBB2`) to indicate structure.

### Don't:
- **Don't** use border-left or border-right greater than 1px as a colored stripe on callouts or cards (use complete borders instead).
- **Don't** use gradient text (`background-clip: text` with a gradient) for headings.
- **Don't** use glassmorphism, blurs, or drop shadows for visual styling.
- **Don't** put a tiny, tracked uppercase eyebrow above every section title.
- **Don't** use standard default Quartz styling without Gruvbox-inspired Clay/Basalt overrides.
