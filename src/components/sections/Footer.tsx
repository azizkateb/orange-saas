'use client';

import { useI18n } from '@/i18n/I18nProvider';

type FooterCol = { title: string; links: string[] };

export default function Footer() {
  const { t, tArr } = useI18n();
  const cols = tArr<FooterCol>('footer.cols');

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <a className="brand" href="#home">
            <img className="brand-logo brand-logo--footer" src="/assets/orange-logo.png" alt="ORANGE" width="850" height="168" />
          </a>
          <p>{t('footer.tagline')}</p>
          <div className="store">
            <span className="store-badge">{t('footer.store.appStore')}</span>
            <span className="store-badge">{t('footer.store.googlePlay')}</span>
          </div>
        </div>
        {cols.map((c) => (
          <div key={c.title} className="footer-col">
            <h4>{c.title}</h4>
            {c.links.map((l) => (
              <a key={l} href="#" onClick={(e) => e.preventDefault()}>{l}</a>
            ))}
          </div>
        ))}
        <div className="footer-col">
          <h4>{t('footer.callToOrder')}</h4>
          <strong className="footer-phone">{t('footer.phone')}</strong>
          <p className="footer-addr">{t('footer.addressLine1')}<br />{t('footer.addressLine2')}</p>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>{t('footer.copyright')}</span>
        <span>{t('footer.builtWith')}</span>
      </div>
    </footer>
  );
}
