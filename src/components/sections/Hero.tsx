'use client';

import { useEffect, useRef } from 'react';
import { useI18n } from '@/i18n/I18nProvider';
import { scrollToSection } from '@/lib/scrollTo';
import { gsap } from '@/lib/gsap';

function IconFastCharge() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="#d65b00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M27 5 14 27h10l-3 16 13-23H24z" />
    </svg>
  );
}

function IconConnector() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="#d65b00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="9" y="17" width="30" height="20" rx="7" />
      <path d="M20 17V9h8v8M18 27h12M21 32h6" />
    </svg>
  );
}

function IconDisplayStand() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="#d65b00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="12" y="7" width="24" height="30" rx="5" />
      <path d="M20 13h8M17 43h14M24 37v6" />
      <path d="M18 24h12" strokeDasharray="2.5 3" />
    </svg>
  );
}

const icons = [<IconFastCharge key="charge" />, <IconConnector key="connector" />, <IconDisplayStand key="display" />];

export default function Hero() {
  const { t, tArr } = useI18n();
  const features = tArr<string>('hero.features');
  const copyRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const copy = copyRef.current;
    const image = imageRef.current;
    if (!copy || !image) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

        timeline
          .fromTo(copy, { y: 34, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 })
          .fromTo(
            image,
            { y: 70, opacity: 0, scale: 0.92 },
            { y: 0, opacity: 1, scale: 1, duration: 1.25, ease: 'expo.out' },
            '-=0.58'
          );
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set([copy, image], { clearProps: 'all' });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="home" className="hero-cream">
      <svg className="hero-cream-squiggle hero-cream-squiggle--tl" viewBox="0 0 200 200" fill="none" aria-hidden>
        <path d="M10 180 Q30 140 50 160 T90 140 T130 160 T170 140" stroke="#d65b00" strokeWidth="2" opacity=".15" />
        <path d="M30 200 Q50 160 70 180 T110 160 T150 180 T190 160" stroke="#d65b00" strokeWidth="1.5" opacity=".12" />
      </svg>
      <svg className="hero-cream-squiggle hero-cream-squiggle--br" viewBox="0 0 200 200" fill="none" aria-hidden>
        <path d="M30 20 Q50 60 70 40 T110 60 T150 40 T190 60" stroke="#d65b00" strokeWidth="2" opacity=".15" />
        <path d="M10 0 Q30 40 50 20 T90 40 T130 20 T170 40" stroke="#d65b00" strokeWidth="1.5" opacity=".12" />
      </svg>
      <div className="container hero-cream-grid">
        <div className="hero-cream-copy" ref={copyRef}>
          <h1 className="hero-cream-title">
            {t('hero.titlePre')}<strong>{t('hero.titleStrong')}</strong><br />
            {t('hero.titleLine2')} <strong>{t('hero.titleStrong2')}</strong>
          </h1>
          <div className="hero-cream-features">
            {features.map((text, i) => (
              <div key={i} className="hero-cream-feature">
                <span className="hero-cream-feature-icon">{icons[i]}</span>
                <span>{text}</span>
              </div>
            ))}
          </div>
          <a className="btn-order" href="#offers" onClick={(e) => { e.preventDefault(); scrollToSection('#offers'); }}>
            {t('hero.order')}
          </a>
        </div>
        <div className="hero-cream-media">
          <div className="hero-cream-arch food"><img ref={imageRef} src="/assets/friesCTA.png" alt={t('hero.imageAlt')} width="770" height="924" fetchPriority="high" /></div>
        </div>
      </div>
    </section>
  );
}
