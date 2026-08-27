'use client';

import Reveal from '@/components/animations/Reveal';
import { useI18n } from '@/i18n/I18nProvider';
import { makersAssets } from '@/data/content';
import { Star } from '@/components/ui/Decor';

const PI2 = 2 * Math.PI;

export default function Makers() {
  const { t, dir } = useI18n();
  const isRtl = dir === 'rtl';
  const stampText = isRtl ? t('makers.stampText') + t('makers.stampText') : t('makers.stampText');

  return (
    <section id="makers" className="makers">
      <div className="container makers-grid">
        <Reveal direction="left" className="makers-media">
          <div className="food makers-photo"><img src={makersAssets.image} alt={t('makers.imageAlt')} width="400" height="400" loading="lazy" /></div>
          <div className="makers-stamp">
            <svg className="makers-stamp-ring" viewBox="0 0 120 120" aria-hidden>
              <defs>
                <path id="makersArc" d="M60 16 A44 44 0 1 1 59.9 16" />
              </defs>
              <text direction={isRtl ? 'rtl' : undefined} unicodeBidi={isRtl ? 'plaintext' : undefined}>
                <textPath href="#makersArc" startOffset={isRtl ? '50%' : '0%'} textAnchor={isRtl ? 'middle' : undefined} textLength={isRtl ? PI2 * 44 : undefined} lengthAdjust={isRtl ? 'spacingAndGlyphs' : undefined}>
                  {stampText}
                </textPath>
              </text>
            </svg>
            <span className="makers-stamp-center"><strong>{makersAssets.badge}</strong><small>{t('makers.badgeLabel')}</small></span>
          </div>
          <Star className="makers-star" />
        </Reveal>
        <Reveal direction="right" className="makers-copy">
          <h2 className="makers-title">{t('makers.title1')}<br /><span className="makers-accent">{t('makers.title2')}</span></h2>
          <p>{t('makers.text')}</p>
          <div className="socials">
            <a aria-label={t('makers.social.facebook')} href="#" onClick={(e) => e.preventDefault()}>
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M13.5 21v-7h2.3l.4-2.8h-2.7V9.4c0-.8.2-1.3 1.4-1.3H16V5.6c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.1H7.8V14h2.3v7h3.4z"/></svg>
            </a>
            <a aria-label={t('makers.social.instagram')} href="#" onClick={(e) => e.preventDefault()}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="3.6"/><circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none"/></svg>
            </a>
            <a aria-label={t('makers.social.twitter')} href="#" onClick={(e) => e.preventDefault()}>
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M22 5.8c-.7.3-1.5.5-2.3.6a4 4 0 001.7-2.2c-.8.5-1.7.8-2.6 1a4 4 0 00-6.8 3.7A11.3 11.3 0 013 4.9a4 4 0 001.2 5.3c-.6 0-1.2-.2-1.7-.5v.1c0 1.9 1.4 3.5 3.2 3.9-.6.1-1.2.2-1.8.1a4 4 0 003.7 2.7A8 8 0 012 18.6a11.3 11.3 0 006.1 1.8c7.3 0 11.3-6 11.3-11.3v-.5c.8-.6 1.5-1.3 2-2.1z"/></svg>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
