'use client';

import { Fragment, ReactNode } from 'react';
import { useI18n } from '@/i18n/I18nProvider';

// Remounts its subtree whenever the locale changes. This gives the
// scroll-reveal effects (which mutate the DOM via GSAP SplitText) a clean
// slate on every language switch — no stale split markup is left behind when
// English <-> Arabic swap, and entrance animations replay in the new
// direction. The Fragment key is the only thing that changes; layout is
// untouched, so there is no visual/spacing impact.
export default function LocaleScope({ children }: { children: ReactNode }) {
  const { locale } = useI18n();
  return <Fragment key={locale}>{children}</Fragment>;
}
