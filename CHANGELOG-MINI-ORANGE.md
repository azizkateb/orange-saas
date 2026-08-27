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

## Client conversion sequence
- Removed the `Recipes / تجارب حقيقية` section, component, locale content and unused asset data.
- Added `Problem` immediately after the hero to establish the cable/bulk problem before explaining the solution.
- Added an accessible Mini Orange vs traditional power-bank comparison.
- Added a selectable 1/2/3-piece offer and quantity section with live total and Salla checkout CTA.
- Added an eight-question FAQ section using native accessible `details` elements.
- Updated navbar and footer labels to Comparison, Offers and FAQ.

## Final client direction
- Converted every live page section to a continuous black canvas with off-white copy and Orange emphasis.
- Removed `Menu / اختر استخدامك` from the page, component tree, locale data and asset data.
- Added an explicit `مناسب للطائرة والسفر` feature to the product checklist.
- Added a prominent four-layer protection callout naming heat, current, overcharge and short-circuit protection.
- Removed the unlabeled charging-method video from WhyWellfed and replaced it with a text-only `لا أسلاك بعد الآن` composition.
- Updated Hero and Why CTA targets from the removed `#menu` to `#offers`.

## Cinematic safety section
- Added a dedicated Safety section after WhyWellfed, matching the earlier high-quality protection presentation.
- Added the `يشحن. ويراقب.` headline, Thermistor explanation, and four detailed systems: overheating, overcharge, overcurrent, and short-circuit protection.
- Uses the existing real-use Mini Orange image as a full-bleed dark background with GSAP parallax and staggered system reveals.
- Removed the small duplicate safety callout from WhyWellfed.
- Removed the orphaned `Menu.tsx` that caused Vercel TypeScript failure.
- Added explicit Sharp approval/configuration for reproducible Vercel installs.

## Compact dual-video presentation
- Removed the oversized phone mockup from HowItWorks.
- Added two compact side-by-side video cards inside the same section: `كيف تستخدمه؟` and `كيف تشحنه؟`.
- Kept the four-step staircase immediately below the videos.
- Both clips play only near the viewport and pause offscreen.
- The two-column composition stays side by side on phones to match the client sketch.

## Client final requirements (20:12–20:19)
- Replaced the old Problem card with a new cable-free story at the top of the page, plus a featured real-use product image.
- Kept the `لماذا Mini Orange؟` content and removed the PlayStation-hands image without substituting another photo.
- Changed the charging label from USB to `من خلال أي منفذ Type-C` in Arabic and English.
- Made the Offers product canvas transparent and reduced the quantity-list spacing while preserving tap targets.
- Reduced the dead space after Offers and pulled `قبل أن تطلب` / FAQ upward.
- Removed the orphan Menu component, menu locale data, menu asset data, and unused menu CSS.
- Kept explicit Sharp 0.34.5 approval in package.json and the root lockfile dependency list for Vercel.

## Client video QA fixes
- Removed the duplicated `لا أسلاك بعد الآن` card from WhyWellfed; the section is now a balanced full-width text/checklist composition.
- Fixed both HowItWorks videos by rendering the actual interactive VideoCard component, enabling muted autoplay near the viewport, offscreen pause, and tap-to-play/pause.
- Replaced the testimonial carousel with a Salla-style review list: stars, verified-purchase labels, first 3 reviews visible, and a `المزيد من التقييمات` control for the remaining reviews.
- Reworked mobile Comparison into stacked two-option rows with no horizontal scrolling.
- Reworked mobile navigation into a compact overlay panel and made footer links functional/compact.
- Updated footer desktop layout to fit all five groups in one row.
- Preserved Type-C wording, airplane compatibility, safety section, Offers, FAQ, Sharp approval, GSAP and Lenis.

## Salla-style footer
- Deleted the previous multi-column dark footer component.
- Replaced it with a centered Salla-style warm-white footer: Orange logo, store description, freelance-license block, contact controls, social icons, Salla attribution and payment badges.
- Added a purpose-built compact mobile arrangement matching the supplied Salla reference.

## Footer logo sizing fix
- Excluded the Salla footer logo from the global ImageReveal DOM wrapper.
- Added `data-no-reveal` to the logo and a defensive max-size rule.
- Fixes the giant cropped ORANGE wordmark without changing the footer layout.

## Current-version white chip removal
- Removed only the white `problem-product-chip` from the current Problem section.
- Removed its selectors and reserved bottom spacing.
- Preserved Safety, Reviews, compact video duo, Comparison, Offers, FAQ, Salla footer and all current-version work.
