'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import en from '@/locales/en.json';
import ar from '@/locales/ar.json';

export type Locale = 'en' | 'ar';
export type Dir = 'ltr' | 'rtl';

// Add new languages here — the rest of the app adapts automatically.
const dictionaries: Record<Locale, unknown> = { en, ar };
const RTL_LOCALES: Locale[] = ['ar'];
const STORAGE_KEY = 'locale';

function getByPath(obj: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object') return (acc as Record<string, unknown>)[key];
    return undefined;
  }, obj);
}

type I18nValue = {
  locale: Locale;
  dir: Dir;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
  tArr: <T = unknown>(key: string) => T[];
};

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  // Always start from the default locale so SSR and the first client render
  // match (avoids hydration mismatches). The stored locale is applied right
  // after mount, and an inline script in <head> sets dir/lang before paint.
  const [locale, setLocaleState] = useState<Locale>('en');

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (stored && (stored === 'en' || stored === 'ar')) setLocaleState(stored);
    } catch {
      /* localStorage unavailable */
    }
  }, []);

  const dir: Dir = RTL_LOCALES.includes(locale) ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
    try {
      localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      /* ignore */
    }
  }, [locale, dir]);

  const setLocale = useCallback((l: Locale) => setLocaleState(l), []);

  const t = useCallback(
    (key: string): string => {
      const value = getByPath(dictionaries[locale], key);
      if (typeof value === 'string') return value;
      const fallback = getByPath(dictionaries.en, key);
      return typeof fallback === 'string' ? fallback : key;
    },
    [locale]
  );

  const tArr = useCallback(
    <T = unknown,>(key: string): T[] => {
      const value = getByPath(dictionaries[locale], key);
      if (Array.isArray(value)) return value as T[];
      const fallback = getByPath(dictionaries.en, key);
      return Array.isArray(fallback) ? (fallback as T[]) : [];
    },
    [locale]
  );

  const value = useMemo<I18nValue>(() => ({ locale, dir, setLocale, t, tArr }), [locale, dir, setLocale, t, tArr]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
