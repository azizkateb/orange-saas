'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import Reveal from '@/components/animations/Reveal';
import { useI18n } from '@/i18n/I18nProvider';
import { scrollToSection } from '@/lib/scrollTo';

export default function PromoBand() {
  const { t, dir } = useI18n();
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const isRtl = dir === 'rtl';
    const fromX = isRtl ? -200 : 200;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          frame,
          { xPercent: fromX, opacity: 0 },
          {
            xPercent: 0,
            opacity: 1,
            duration: 3.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: frame,
              start: 'top 80%',
              once: true,
            },
            clearProps: 'transform,opacity',
          }
        );

      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.fromTo(
          frame,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.6,
            scrollTrigger: { trigger: frame, start: 'top 85%', once: true },
            clearProps: 'opacity',
          }
        );
      });
    }, frame);

    return () => ctx.revert();
  }, [dir]);

  return (
    <section id="promo" className="promo">
      <div className="container promo-grid">
        <Reveal className="promo-copy">
          <h2 className="sec-title">{t('promo.titleLine1')}<br />{t('promo.titleLine2')}</h2>
          <p>{t('promo.text')}</p>
          <a className="btn-lime" href="#how" onClick={(e) => { e.preventDefault(); scrollToSection('#how'); }}>
            {t('promo.viewMenu')}
          </a>
        </Reveal>
        <div ref={frameRef} className="promo-media">
          <img src="/assets/mini-orange-cutout.png" alt={t('promo.imageAlt')} width="1024" height="1024" loading="lazy" />
        </div>
      </div>
    </section>
  );
}
