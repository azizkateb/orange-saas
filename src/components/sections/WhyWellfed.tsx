'use client';

import { useI18n } from '@/i18n/I18nProvider';

export default function WhyWellfed() {
  const { t, tArr } = useI18n();
  const checklist = tArr<string>('why.checklist');


  return (
    <section id="why" className="why why-text-only">
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
        </div>

      </div>
    </section>
  );
}
