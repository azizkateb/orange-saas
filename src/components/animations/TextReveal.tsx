'use client';

import { useEffect } from 'react';
import { gsap, ScrollTrigger, SplitText } from '@/lib/gsap';

// Block-level text containers we reveal site-wide. We intentionally skip
// the navbar (must stay visible/clickable) and interactive buttons/links,
// and anything marked with [data-no-split].
const SELECTOR = 'h1, h2, h3, h4, h5, h6, p, li, blockquote, .overline';

export default function TextReveal() {
  useEffect(() => {
    const splits: SplitText[] = [];
    let cancelled = false;

    const run = () => {
      if (cancelled) return;

      // In RTL (Arabic) we split by WORDS, never characters: splitting an
      // Arabic word into glyphs breaks the cursive letter shaping/ligatures.
      // Word-splitting keeps each word intact, so Arabic renders correctly.
      const isRtl = document.documentElement.dir === 'rtl';
      const splitType = isRtl ? 'words' : 'chars';

      const viewportH = window.innerHeight;
      const els = Array.from(
        document.querySelectorAll<HTMLElement>(SELECTOR)
      ).filter((el) => {
        if (el.dataset.split) return false;
        if (!el.textContent || el.textContent.trim().length === 0) return false;
        if (el.closest('nav')) return false;
        if (el.closest('.navbar')) return false;
        if (el.closest('[data-no-split]')) return false;
        // Skip above-fold elements — they're already visible, splitting is
        // wasted DOM/ScrollTrigger overhead that causes scroll jank.
        const rect = el.getBoundingClientRect();
        if (rect.top < viewportH && rect.bottom > 0) return false;
        return true;
      });

      els.forEach((el) => {
        el.dataset.split = 'true';
        try {
          const split = SplitText.create(el, { type: splitType });
          splits.push(split);
          const targets = isRtl ? split.words : split.chars;
          gsap.set(el, { opacity: 1 });
          gsap.from(targets, {
            // Entrance adapts to direction: glyphs/words slide in from the
            // reading-origin side (right in RTL, left in LTR).
            x: isRtl ? -20 : 20,
            yPercent: -50,
            opacity: 0,
            stagger: isRtl ? 0.04 : 0.02,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          });
        } catch {
          // If SplitText is unavailable for any reason, leave the text visible.
          gsap.set(el, { opacity: 1 });
        }
      });

      ScrollTrigger.refresh();
    };

    // Wait for web fonts so the split measures correctly,
    // but never block the reveal for long.
    if (typeof document !== 'undefined' && document.fonts && document.fonts.ready) {
      document.fonts.ready.then(run);
    } else {
      run();
    }

    return () => {
      cancelled = true;
      splits.forEach((s) => s.revert());
    };
  }, []);

  return null;
}
