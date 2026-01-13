# Design System & UI Kit

## Core Principles
**"Serene, Minimal, and Accessible"**
This design system prioritizes clarity and spiritual calmness. It avoids clutter and heavy embellishments, focusing on the content (prayer and supplications).

## Color Palette
| Color | Hex | Role |
|-------|-----|------|
| **Noble Green** | `#1a5d3a` | Primary actions, headers, emphasis. Represents nature and peace. |
| **Sage Green** | `#2d8a5b` | Hover states, secondary accents. |
| **Muted Gold** | `#c5a059` | Highlights, navigation active states. |
| **Pure White** | `#ffffff` | Card backgrounds, cleaner content areas. |
| **Off-White** | `#fafafa` | Global background to reduce eye strain compared to pure white. |
| **Deep Grey** | `#333333` | Primary text for high readability. |

## Typography
1.  **Headings & UI**: `Outfit` (Sans-serif). Clean, geometric, modern.
2.  **Arabic Text**: `Amiri` (Serif). A classic Naskh style font optimized for screen reading.
    - *Size Policy*: Arabic text is always at least `2rem` for legibility.

## Components

### Buttons
- **Primary**: Pill-shaped (`border-radius: 50px`), Noble Green background, shadow.
    - *Touch Target*: Minimum 44px height.
- **Secondary**: Outline style, uses Primary color for border.

### Cards
- **Style**: Minimal elevation (`box-shadow: 0 2px 10px`), rounded corners (`12px`).
- **Interaction**: Subtle lift on hover (`transform: translateY(-5px)`).

### Navigation
- **Mobile**: Collapsible "Burger" menu (Hidden by default, slides down).
- **Desktop**: Horizontal link list with underline indicator.

## Accessibility
- High contrast (Dark Grey on White).
- Semantic HTML tags (`<nav>`, `<main>`, `<section>`, `<h1>`).
- Focus states for keyboard navigation (Standard browser default or enhanced).
