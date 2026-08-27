# be Wellfed — Healthy Meal Delivery (Landing Page)

A starter landing page that recreates the **be Wellfed** design system in a modern
Next.js stack. Built from a reverse-engineered analysis: deep forest green + electric
lime accent + cream editorial bands, elegant serif headings, organic image masks, and
smooth scroll-driven motion.

## Stack

- **Next.js** (App Router) + **TypeScript**
- **Tailwind config** present, but styling is authored in plain CSS (`globals.css`) with design tokens
- **GSAP** + **ScrollTrigger** for scroll reveals & stagger
- **Lenis** for smooth inertia scrolling
- **next/font** — Playfair Display (serif) + Inter (sans)

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Design tokens

| Token | Hex | Role |
|---|---|---|
| green-800 | `#115F22` | Hero / headings / primary brand |
| green-600 | `#5CA150` | Secondary green / accents |
| lime | `#C8F990` | CTAs, badges, borders, stars |
| cream | `#EDE9DF` | Editorial bands |
| cream-2 | `#E0DEDA` | Footer / promo band |
| gray-100 | `#E2E2E0` | Menu section background |
| ink | `#1F201A` | Body text |

All tokens live in `:root` in `src/app/globals.css`.

## Structure

```text
src/
  app/            layout.tsx, page.tsx, globals.css
  components/
    layout/       Navbar.tsx
    sections/     Hero, HowItWorks, Menu, Makers, PromoBand, Recipes, Footer
    animations/   LenisProvider, Reveal, Stagger
    ui/           Decor (Star, Squiggle)
  data/           content.ts  (all copy & menu data)
  lib/            scrollTo.ts (smooth-scroll helper)
```

## Notes

- Food imagery uses emoji + gradient placeholders so the project runs with **zero asset
  dependencies**. Swap the `.food` blocks in each section for real `<Image>` photos when ready.
- Section anchors: `#home`, `#how`, `#menu`, `#makers`, `#recipes`.
- This is a visual recreation from a screen recording — fonts and exact spacing are close
  approximations; fine-tune against the real design.
