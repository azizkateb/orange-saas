'use client';

import { useI18n } from '@/i18n/I18nProvider';

function MailIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18v12H3z"/><path d="m3 7 9 7 9-7"/></svg>; }
function PhoneIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="7" y="2" width="10" height="20" rx="2"/><path d="M10 18h4"/></svg>; }
function WhatsAppIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11.5a8 8 0 0 1-11.8 7l-4.2 1 1.1-4a8 8 0 1 1 14.9-4.5z"/><path d="M8.5 8.3c.4 2.6 2.4 4.7 5.1 5.2"/></svg>; }
function InstagramIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg>; }
function TikTokIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3v11.2a4.5 4.5 0 1 1-3.8-4.4"/><path d="M14 3c.8 2.8 2.7 4.4 5 4.7"/></svg>; }

// Official Salla payment logos, reused exactly as the storefront <salla-payments>
// component requests them (cdn.salla.network for most; cdn.assets.salla.network
// + /static/ for tabby_installment & emkan_installment). Salla exposes Visa and
// Mastercard only as a combined "credit_card" asset, so they are shown together.
const CDN = 'https://cdn.salla.network/cdn-cgi/image/fit=scale-down,width=120,height=120,onerror=redirect,format=auto/images/payment';
const ASSETS_CDN = 'https://cdn.assets.salla.network/cdn-cgi/image/fit=scale-down,width=120,height=120,onerror=redirect,format=auto/static/images/payment';

type Payment = { slug: string; src: string; altAr: string; altEn: string };

const PAYMENTS: Payment[] = [
  { slug: 'mada', src: `${CDN}/mada_mini.png`, altAr: 'مدى', altEn: 'mada' },
  { slug: 'credit_card', src: `${CDN}/credit_card_mini.png`, altAr: 'فيزا وماستركارد', altEn: 'Visa and Mastercard' },
  { slug: 'stc_pay', src: `${CDN}/stc_pay_mini.png`, altAr: 'STC بنك', altEn: 'STC Bank' },
  { slug: 'apple_pay', src: `${CDN}/apple_pay_mini.png`, altAr: 'آبل باي', altEn: 'Apple Pay' },
  { slug: 'tabby_installment', src: `${ASSETS_CDN}/tabby_installment_mini.png`, altAr: 'تابي', altEn: 'Tabby' },
  { slug: 'tamara_installment', src: `${CDN}/tamara_installment_mini.png`, altAr: 'تمارا', altEn: 'Tamara' },
  { slug: 'emkan_installment', src: `${ASSETS_CDN}/emkan_installment_mini.png`, altAr: 'إمكان', altEn: 'Emkan' },
  { slug: 'wallet', src: `${CDN}/customer_wallet_mini.png`, altAr: 'المحفظة', altEn: 'Wallet payment' },
  { slug: 'cod', src: `${CDN}/cod_mini.png`, altAr: 'الدفع عند الاستلام', altEn: 'Cash on delivery' },
];

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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="salla-license-badge" src="/assets/freelance.png" alt={ar ? 'شعار العمل الحر' : 'Freelance badge'} width="74" height="50" loading="lazy" decoding="async" />
        </a>

        <div className="salla-contact" aria-label={ar ? 'وسائل التواصل' : 'Contact methods'}>
          <a href="mailto:orangeworld.sa@gmail.com"><MailIcon />{ar ? 'البريد الإلكتروني' : 'Email'}</a>
          <a href="tel:966541578001"><PhoneIcon />{ar ? 'الجوال' : 'Mobile'}</a>
          <a href="https://wa.me/966541578001" target="_blank" rel="noopener noreferrer"><WhatsAppIcon />{ar ? 'واتساب' : 'WhatsApp'}</a>
        </div>

        <div className="salla-social" aria-label={ar ? 'الشبكات الاجتماعية' : 'Social networks'}>
          <a href="https://www.tiktok.com/@orangeworld.sa" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><TikTokIcon /></a>
          <a href="https://www.instagram.com/orangeworld.sa" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><InstagramIcon /></a>
        </div>

        <p className="salla-crafted">{ar ? <>صنع بإتقان على | 2026 منصة سلة</> : <>Crafted with care | 2026 Salla</>}</p>

        <div className="salla-payments" aria-label={ar ? 'وسائل الدفع المدعومة' : 'Supported payments'}>
          {PAYMENTS.map((p) => (
            <span className="pay-logo" key={p.slug}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.src}
                alt={ar ? p.altAr : p.altEn}
                width={58}
                height={58}
                loading="lazy"
                decoding="async"
              />
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
