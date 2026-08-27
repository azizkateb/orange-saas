'use client';

import { useI18n } from '@/i18n/I18nProvider';

function MailIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18v12H3z"/><path d="m3 7 9 7 9-7"/></svg>; }
function PhoneIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="7" y="2" width="10" height="20" rx="2"/><path d="M10 18h4"/></svg>; }
function WhatsAppIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11.5a8 8 0 0 1-11.8 7l-4.2 1 1.1-4a8 8 0 1 1 14.9-4.5z"/><path d="M8.5 8.3c.4 2.6 2.4 4.7 5.1 5.2"/></svg>; }
function InstagramIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg>; }
function TikTokIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3v11.2a4.5 4.5 0 1 1-3.8-4.4"/><path d="M14 3c.8 2.8 2.7 4.4 5 4.7"/></svg>; }

export default function Footer() {
  const { locale } = useI18n();
  const ar = locale === 'ar';

  return (
    <footer className="salla-footer" id="footer">
      <div className="container salla-footer-main">
        <img className="salla-footer-logo" data-no-reveal src="/assets/orange-logo.png" alt="ORANGE" width="928" height="168" />

        <p className="salla-footer-about">
          {ar
            ? 'متجرنا يهتم بتقديم منتجات عالية الجودة تناسب احتياجاتك اليومية، مع ضمان الراحة والسهولة في التسوق.'
            : 'Our store offers quality products for everyday needs, with a comfortable and easy shopping experience.'}
        </p>

        <a className="salla-license" href="#footer" onClick={(e) => e.preventDefault()} aria-label={ar ? 'وثيقة العمل الحر FL-461315925' : 'Freelance license FL-461315925'}>
          <span>{ar ? 'وثيقة العمل الحر' : 'Freelance license'}</span>
          <strong>FL-461315925</strong>
          <i aria-hidden="true">عمل<br/>حر</i>
        </a>

        <div className="salla-contact" aria-label={ar ? 'وسائل التواصل' : 'Contact methods'}>
          <button type="button"><MailIcon />{ar ? 'البريد الإلكتروني' : 'Email'}</button>
          <button type="button"><PhoneIcon />{ar ? 'الجوال' : 'Mobile'}</button>
          <button type="button"><WhatsAppIcon />{ar ? 'واتساب' : 'WhatsApp'}</button>
        </div>

        <div className="salla-social" aria-label={ar ? 'الشبكات الاجتماعية' : 'Social networks'}>
          <a href="#footer" onClick={(e) => e.preventDefault()} aria-label="TikTok"><TikTokIcon /></a>
          <a href="#footer" onClick={(e) => e.preventDefault()} aria-label="Instagram"><InstagramIcon /></a>
        </div>

        <p className="salla-crafted">{ar ? <>صنع بإتقان على | 2026 منصة سلة</> : <>Crafted with care | 2026 Salla</>}</p>

        <div className="salla-payments" aria-label={ar ? 'وسائل الدفع المدعومة' : 'Supported payments'}>
          <span className="pay tabby">tabby</span><span className="pay apple">● Pay</span><span className="pay stc">stc <b>Bank</b></span><span className="pay visa">VISA</span><span className="pay mada">مدى<br/>mada</span>
        </div>
      </div>
    </footer>
  );
}
