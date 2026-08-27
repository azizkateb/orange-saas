# Mini Orange content pass

The WellFed codebase is preserved exactly. Only these content/media files changed:

- `public/assets/friesCTA.png`
- `public/assets/fries-campagne.png`
- `public/assets/fries-section-bg.png`
- `public/assets/fries-process-bg.png`
- `public/assets/logo.svg`
- `src/locales/ar.json`
- `src/locales/en.json`
- Literal brand/metadata text in `layout.tsx`, `Navbar.tsx`, `Footer.tsx`
- Literal price/badge content in `src/data/content.ts`

No CSS, GSAP plan, Lenis provider, animation component, section structure, page order, responsive behavior, or dependency was changed.

## Hero refinement
- Added the supplied ORANGE wordmark as `public/assets/orange-logo.png`.
- Navbar and footer now render that image instead of the text-built Wellfed mark.
- Replaced the three food icons with fast-charge, built-in connector, and digital-display/stand icons.
- No section structure, GSAP, Lenis, layout, breakpoint or existing animation was changed.

## How it works video
- Added the supplied 21.4s portrait MP4 to the original HowItWorks section.
- Preserved the section heading, four-step diagonal layout, leaf decoration and Reveal animation.
- Video autoplays muted only near the viewport, pauses offscreen, loops, and keeps controls available.

## How-it-works step imagery
- Step 01 keeps the existing approved image.
- Step 02 uses the supplied PlayStation-controller image.
- Step 03 uses the supplied upright-phone charging image.
- Step 04 uses the supplied real-use phone charging image.
- Existing section layout, diagonal path, GSAP Reveal timing and video remain unchanged.

## Promo section video
- Replaced only the PromoBand image with the supplied charging demonstration video.
- Preserved the original WellFed grid, copy, section styling, responsive behavior, Reveal, and 3.5s GSAP slide-in.
- Video plays muted near the viewport, pauses offscreen, loops, and retains controls.

## Promo correction
- No section was added. The video directly replaces the existing PromoBand image.
- It keeps the original media slot, square footprint, grid, copy and GSAP slide-in.

## Promo video placement corrected
- Removed the separate video block from `HowItWorks`; that section is back to its original four-step layout.
- Replaced the image inside the existing `PromoBand` media container with the supplied portrait video.
- Kept the existing container shape and GSAP slide-in; changed only its aspect ratio from square to 4:5 so it is slightly taller.

## PromoBand restored
- Restored the existing PromoBand in its original position between Makers and Recipes.
- Preserved its original component, two-column layout, responsive stacking, and 3.5s GSAP slide-in.
- Replaced only the potato-box image with `mini-orange-cutout.png`.
