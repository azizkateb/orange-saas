'use client';

import { useCallback } from 'react';
import gsap from 'gsap';
import Stagger from '@/components/animations/Stagger';
import { useI18n } from '@/i18n/I18nProvider';
import { menuAssets } from '@/data/content';
import { scrollToSection } from '@/lib/scrollTo';

type MenuItem = { name: string; tag: string };

const tweenMap = new WeakMap<Element, gsap.core.Tween>();

function animateImg(card: HTMLElement, scale: number) {
  const img = card.querySelector<HTMLImageElement>('.menu-food img');
  if (!img) return;
  tweenMap.get(img)?.kill();
  tweenMap.set(img, gsap.to(img, { scale, duration: 0.6, ease: 'power2.out', overwrite: 'auto' }));
}

export default function Menu() {
  const { t, tArr } = useI18n();
  const items = tArr<MenuItem>('menu.items');

  const handleEnter = useCallback((e: React.PointerEvent<HTMLElement>) => {
    animateImg(e.currentTarget, 1.2);
  }, []);

  const handleLeave = useCallback((e: React.PointerEvent<HTMLElement>) => {
    animateImg(e.currentTarget, 1);
  }, []);

  return (
    <section id="menu" className="menu">
      <div className="container">
        <div className="menu-head">
          <h2 className="sec-title">{t('menu.title')}</h2>
          <a className="btn-lime" href="#comparison" onClick={(e) => { e.preventDefault(); scrollToSection('#comparison'); }}>
            {t('menu.viewMenu')}
          </a>
        </div>
        <Stagger className="menu-grid">
          {menuAssets.map((m, i) => (
            <article
              key={i}
              data-stagger
              className="menu-card"
              onPointerEnter={handleEnter}
              onPointerLeave={handleLeave}
            >
              <div className="food menu-food">
                <img src={m.image} alt={items[i]?.name ?? ''} width="400" height="400" loading="lazy" />
                <span className="price">{m.price}</span>
              </div>
              <h3>{items[i]?.name}</h3>
              <a className="order" href="#menu" onClick={(e) => e.preventDefault()}>
                {t('menu.order')} <span className="dir-arrow" aria-hidden>&rarr;</span>
              </a>
            </article>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
