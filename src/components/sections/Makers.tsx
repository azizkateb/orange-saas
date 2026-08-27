'use client';

import Reveal from '@/components/animations/Reveal';
import { useI18n } from '@/i18n/I18nProvider';
import { Star } from '@/components/ui/Decor';

export default function Makers() {
  const { t } = useI18n();

  return (
    <section id="makers" className="makers makers-text-only">
      <div className="container">
        <Reveal className="makers-text-panel">
          <span className="overline">{t('makers.title1')}</span>
          <h2 className="makers-title"><span className="makers-accent">{t('makers.title2')}</span></h2>
          <p>{t('makers.text')}</p>
          <div className="makers-proof" aria-label={t('makers.stampText')}>
            <strong>+10K</strong>
            <span>{t('makers.badgeLabel')}</span>
          </div>
          <Star className="makers-text-star" />
        </Reveal>
      </div>
    </section>
  );
}
