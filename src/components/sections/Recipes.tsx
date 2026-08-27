'use client';

import { useEffect, useRef } from 'react';
import Stagger from '@/components/animations/Stagger';
import { useI18n } from '@/i18n/I18nProvider';
import { recipeAssets } from '@/data/content';
import { Squiggle } from '@/components/ui/Decor';
import { gsap } from '@/lib/gsap';

type RecipeItem = { tag: string; name: string };

export default function Recipes() {
  const { t, tArr } = useI18n();
  const items = tArr<RecipeItem>('recipes.items');
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cta = ctaRef.current;
    if (!cta) return;

    const ctx = gsap.context(() => {
      const content = cta.querySelector('.recipes-cta-content');
      const button = cta.querySelector('.recipes-buy');
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          [content, button],
          { y: 34, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: { trigger: cta, start: 'top 82%', once: true },
          }
        );
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set([content, button], { opacity: 1, y: 0 });
      });
    }, cta);

    return () => ctx.revert();
  }, []);

  return (
    <section id="recipes" className="recipes">
      <div className="container">
        <Squiggle className="recipes-squiggle" />
        <h2 className="sec-title">{t('recipes.title')}</h2>
        <Stagger className="recipe-grid">
          {recipeAssets.map((r, i) => (
            <article key={i} data-stagger className="recipe-card">
              <div className="food recipe-food"><img src={r.image} alt={items[i]?.name ?? ''} width="400" height="360" loading="lazy" /></div>
              <span className="tag">{items[i]?.tag}</span>
              <h3>{items[i]?.name}</h3>
            </article>
          ))}
        </Stagger>
        <div className="recipes-buy-wrap" ref={ctaRef}>
          <div className="recipes-cta" aria-labelledby="recipes-cta-title">
            <video className="recipes-cta-video" autoPlay muted loop playsInline preload="metadata" aria-hidden="true">
              <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260815_030633_1712fc71-4979-4e14-98f9-9f95702ab3da.mp4" type="video/mp4" />
            </video>
            <div className="recipes-cta-overlay" />
            <div className="recipes-cta-content" data-no-split>
              <span className="recipes-cta-kicker">Mini Orange</span>
              <h3 id="recipes-cta-title">{t('recipes.ctaTitle')}</h3>
              <p>{t('recipes.ctaText')}</p>
            </div>
            <a className="recipes-buy" href="https://orange-sa.com/ar/mini-orange/p675834151">
              <span>{t('recipes.buyNow')}</span>
              <span className="recipes-buy-arrow" aria-hidden="true">&#8599;</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
