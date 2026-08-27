# Animation Plan

## Project: be Wellfed

## Current Phase: promo-reveal
- Adding horizontal wipe reveal to PromoBand image.
- Previously excluded from global ImageReveal (vertical opposing-slide).

## Scope
- Single image in PromoBand section (`<div class="promo-media">`).
- No other sections or components affected.

## Technique
- Horizontal clip/wipe via `xPercent` animation on a wrapper with `overflow: hidden`.
- LTR: wipe from right edge (xPercent: 100 → 0).
- RTL: wipe from left edge (xPercent: -100 → 0).
- `clearProps: 'transform'` on complete to avoid hover/layout interference.
- Duration: 1.3s, ease: `expo.inOut`.
- Trigger: `start: 'top 85%', once: true`.

## RTL
- Detected via `document.documentElement.dir === 'rtl'`.
- Direction flips to enter from start-of-reading side.

## Mobile / Reduced Motion
- Respects `prefers-reduced-motion` — static reveal (opacity 0→1, no translation) if reduced motion preferred.
- No breakpoint gating needed; works across viewports.
