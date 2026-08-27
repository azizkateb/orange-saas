'use client';

import { useEffect, useRef } from 'react';
import { useI18n } from '@/i18n/I18nProvider';
import { Star } from '@/components/ui/Decor';
import { scrollToSection } from '@/lib/scrollTo';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export default function WhyWellfed() {
  const { t, tArr } = useI18n();
  const checklist = tArr<string>('why.checklist');
  const sectionRef = useRef<HTMLElement | null>(null);
  const archRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Cinematic arch reveal: rises from below the screen and unmasks
      // bottom-to-top into its normal position (keeps the arch shape).
      if (archRef.current) {
        gsap.fromTo(
          archRef.current,
          {
            clipPath: 'inset(100% 0% 0% 0% round 24px 24px 300px 300px)',
            yPercent: 18,
            scale: 1.06,
          },
          {
            clipPath: 'inset(0% 0% 0% 0% round 24px 24px 300px 300px)',
            yPercent: 0,
            scale: 1,
            duration: 2.9,
            ease: 'expo.out',
            scrollTrigger: { trigger: archRef.current, start: 'top 85%', once: true },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="why" ref={sectionRef}>
      <div className="container why-grid">
        <div className="why-copy">
          <span className="overline overline--light">{t('why.overline')}</span>
          <h2 className="why-title">
            <em>{t('why.titleEm1')}</em> <strong>{t('why.titleStrong')}</strong> <em>{t('why.titleEm2')}</em>
          </h2>
          <p className="why-lead">{t('why.lead')}</p>
          <ul className="why-check">
            {checklist.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          <div className="why-actions">
            <a className="btn-lime" href="#menu" onClick={(e) => { e.preventDefault(); scrollToSection('#menu'); }}>
              {t('why.viewMenu')}
            </a>
            <a className="btn-ghost" href="#how" onClick={(e) => { e.preventDefault(); scrollToSection('#how'); }}>
              {t('why.howItWorks')}
            </a>
          </div>
        </div>
        <div className="why-media">
          <div className="why-plate food" ref={archRef}>
            <video
              className="why-video"
              poster="/assets/charging-anywhere-poster.jpg"
              muted
              autoPlay
              loop
              playsInline
              preload="metadata"
            >
              <source src="/assets/charging-anywhere.mp4" type="video/mp4" />
            </video>
          </div>
          <Star className="why-star why-star--plate" />
        </div>
      </div>
    </section>
  );
}
