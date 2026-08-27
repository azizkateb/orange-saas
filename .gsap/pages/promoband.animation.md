# PromoBand — Animation Spec

## Image Wipe Reveal
- **Element**: `.promo-media` (div containing `<img>`)
- **Type**: Horizontal wipe from start-of-reading edge.
- **Trigger**: ScrollTrigger, `start: 'top 85%'`, `once: true`.

### LTR
- Wrapper starts at `xPercent: 100` (shifted right), wipes to `xPercent: 0`.
- Inner image does not need opposing movement — the frame wipe alone creates the reveal.

### RTL
- Wrapper starts at `xPercent: -100` (shifted left), wipes to `xPercent: 0`.

### After Complete
- `clearProps: 'transform'` to remove inline transform, preventing hover/layout side-effects.
- `overflow: hidden` remains on `.promo-media` (structural, not animation-specific).

### Reduced Motion
- Skip xPercent tween; only fade opacity 0→1.
