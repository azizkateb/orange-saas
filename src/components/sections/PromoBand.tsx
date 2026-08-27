'use client';

import Reveal from '@/components/animations/Reveal';
import { useI18n } from '@/i18n/I18nProvider';
import { scrollToSection } from '@/lib/scrollTo';

export default function PromoBand() {
  const { t } = useI18n();

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
      </div>
    </section>
  );
}
