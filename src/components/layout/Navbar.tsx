'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useI18n } from '@/i18n/I18nProvider';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import { scrollToSection } from '@/lib/scrollTo';

type NavLink = { href: string; label: string };

export default function Navbar() {
  const { t, tArr } = useI18n();
  const links = tArr<NavLink>('nav.links');
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 40);
          ticking = false;
        });
        ticking = true;
      }
    };
    setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (ref.current) {
      gsap.fromTo(ref.current, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' });
    }
  }, []);

  const go = (href: string) => {
    setOpen(false);
    scrollToSection(href);
  };

  return (
    <nav ref={ref} className={`nav${scrolled ? ' is-scrolled' : ''}`}>
      <div className="nav-inner container">
        <div className="nav-links">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={(e) => { e.preventDefault(); go(l.href); }}>
              {l.label}
            </a>
          ))}
        </div>
        <a className="brand" href="#home" onClick={(e) => { e.preventDefault(); go('#home'); }}>
          <img className="brand-logo" src="/assets/orange-logo.png" alt="ORANGE" width="850" height="168" />
        </a>
        <div className="nav-right">
          <div className="nav-addr">{t('nav.addressLine1')}<br />{t('nav.addressLine2')}</div>
           <a className="nav-menu-btn" href="https://orange-sa.com/ar/mini-orange/p675834151">
             {t('nav.menuButton')}
           </a>
          <LanguageSwitcher />
          <button className="nav-burger" aria-label={t('nav.toggleMenu')} onClick={() => setOpen((v) => !v)}>
            <span /><span /><span />
          </button>
        </div>
      </div>
      {open && (
        <div className="nav-mobile">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={(e) => { e.preventDefault(); go(l.href); }}>
              {l.label}
            </a>
          ))}
           <a href="https://orange-sa.com/ar/mini-orange/p675834151">{t('nav.menuButton')}</a>
        </div>
      )}
    </nav>
  );
}
