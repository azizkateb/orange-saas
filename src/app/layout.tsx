import type { Metadata } from 'next';
import { Tajawal } from 'next/font/google';
import LenisProvider from '@/components/animations/LenisProvider';
import TextReveal from '@/components/animations/TextReveal';
import ImageReveal from '@/components/animations/ImageReveal';
import LocaleScope from '@/components/animations/LocaleScope';
import { I18nProvider } from '@/i18n/I18nProvider';
import './globals.css';

const tajawal = Tajawal({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '700', '800'],
  variable: '--font-tajawal',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://lp.orange-sa.com'),
  title: 'Mini Orange — Big power, pocket size',
  description: '5000mAh portable charger with 20W fast charging and no cable.',
  alternates: {
    canonical: '/',
    languages: {
      en: '/',
      ar: '/',
      'x-default': '/',
    },
  },
  openGraph: {
    title: 'Mini Orange — Big power, pocket size',
    description: 'Portable power for your phone and daily devices, small enough for your pocket.',
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['ar_AR'],
  },
};

// Runs before paint: applies the saved locale's dir/lang so there is no
// flash or layout shift (CLS) when Arabic was previously selected.
const localeBootstrap = {
  __html:
    "(function(){try{var l=localStorage.getItem('locale')||'ar';document.documentElement.lang=l;document.documentElement.dir=l==='ar'?'rtl':'ltr';}catch(e){document.documentElement.lang='ar';document.documentElement.dir='rtl';}})();",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      suppressHydrationWarning
      className={`${tajawal.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={localeBootstrap} />
      </head>
      <body>
        <I18nProvider>
          <LocaleScope>
            <LenisProvider>{children}</LenisProvider>
            <TextReveal />
            <ImageReveal />
          </LocaleScope>
        </I18nProvider>
      </body>
    </html>
  );
}
