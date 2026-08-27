'use client';

import { useEffect, useRef } from 'react';
import Reveal from '@/components/animations/Reveal';
import { useI18n } from '@/i18n/I18nProvider';
import { gsap } from '@/lib/gsap';

export default function Problem() {
  const { locale } = useI18n();
  const ar = locale === 'ar';
  const sectionRef = useRef<HTMLElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const root = sectionRef.current;
    const image = imageRef.current;
    if (!root || !image) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(image, { scale: 1.08 }, {
          scale: 1,
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: 1 },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="problem" className="problem problem-story" ref={sectionRef}>
      <div className="container problem-story-grid">
        <Reveal className="problem-story-copy" direction="right">
          <span className="overline">{ar ? 'المشكلة التي يحلها' : 'THE PROBLEM IT SOLVES'}</span>
          <small>{ar ? 'قطعة واحدة فقط' : 'ONE PIECE ONLY'}</small>
          <h2>{ar ? <>لا أسلاك<br /><em>بعد الآن.</em></> : <>No more<br /><em>cables.</em></>}</h2>
          <p>{ar
            ? 'لا تحتاج باوربانك وكابل وقطع إضافية. Mini Orange وحده يتصل مباشرة بجهازك ويمنحك الطاقة وقت الحاجة.'
            : 'No power bank, cable and extra pieces. Mini Orange alone plugs directly into your device whenever you need power.'}</p>
          <ul>
            <li>{ar ? 'موصل مدمج' : 'Built-in connector'}</li>
            <li>{ar ? 'حجم يدخل جيبك' : 'Pocket-size body'}</li>
            <li>{ar ? 'قطعة واحدة بدل ثلاث' : 'One piece instead of three'}</li>
          </ul>
        </Reveal>

        <Reveal className="problem-featured" direction="left">
          <div className="problem-featured-image">
            <img ref={imageRef} src="/assets/how-step-04.webp" alt={ar ? 'Mini Orange يشحن الهاتف مباشرة بدون سلك' : 'Mini Orange charging a phone directly without a cable'} width="1000" height="666" loading="lazy" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
