'use client';

import { useI18n } from '@/i18n/I18nProvider';

export default function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale, t } = useI18n();
  const next = locale === 'en' ? 'ar' : 'en';
  const label = next === 'ar' ? t('language.switchToAr') : t('language.switchToEn');

  return (
    <button
      type="button"
      className={`lang-switch${className ? ' ' + className : ''}`}
      onClick={() => setLocale(next)}
      aria-label={label}
      title={label}
    >
      {next === 'ar' ? '\u0639\u0631\u0628\u064a' : 'EN'}
    </button>
  );
}
