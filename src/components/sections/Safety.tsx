'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import Reveal from '@/components/animations/Reveal';
import { useI18n } from '@/i18n/I18nProvider';

export default function Safety() {
  const { locale } = useI18n();
  const ar = locale === 'ar';
  const sectionRef = useRef<HTMLElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const systems = ar ? [
    ['01', 'ارتفاع الحرارة', 'يراقب الحرارة ويفصل عند الارتفاع غير الطبيعي.'],
    ['02', 'الشحن الزائد', 'يوقف تدفق الطاقة عند اكتمال الشحن.'],
    ['03', 'التيار الزائد', 'ينظّم التيار ويحمي جهازك من الاندفاع المفاجئ.'],
    ['04', 'القصر الكهربائي', 'يفصل الدائرة فور اكتشاف أي خلل كهربائي.'],
  ] : [
    ['01', 'Overheating', 'Monitors temperature and disconnects if it rises abnormally.'],
    ['02', 'Overcharging', 'Stops the power flow when charging is complete.'],
    ['03', 'Overcurrent', 'Regulates current and protects against sudden spikes.'],
    ['04', 'Short circuit', 'Disconnects the circuit immediately when a fault is detected.'],
  ];

  const icons = [
    <svg key="heat" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 14.5V5a2 2 0 1 0-4 0v9.5a4 4 0 1 0 4 0Z" /><path d="M12 9v6" /></svg>,
    <svg key="charge" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="8" width="15" height="9" rx="2" /><path d="M22 11v3" /><path d="M6.5 11v3M10 11v3M13.5 11v3" /></svg>,
    <svg key="current" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M11 21l1-7H8l5-11-1 7h4l-5 11z" /></svg>,
    <svg key="short" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M11 21l1-7H8l5-11-1 7h4l-5 11z" /><path d="M3 3l18 18" /></svg>,
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    if (!section || !image) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(image, { scale: 1.09 }, {
          scale: 1,
          ease: 'none',
          scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1.1 },
        });
        gsap.fromTo('.safety-system', { y: 24, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: .85,
          stagger: .1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.safety-systems', start: 'top 82%', once: true },
        });
      });
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(['.safety-system', image], { opacity: 1, y: 0, scale: 1 });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="safety" className="safety" ref={sectionRef}>
      <div className="safety-media" aria-hidden="true">
        <img ref={imageRef} src="/assets/how-step-04.webp" alt="" width="1000" height="666" loading="lazy" />
      </div>
      <div className="safety-shade" aria-hidden="true" />

      <div className="container safety-content">
        <Reveal className="safety-copy" direction="right">
          <span className="safety-kicker">{ar ? 'حماية تعمل في الخلفية' : 'PROTECTION IN THE BACKGROUND'}</span>
          <h2>{ar ? <>يشحن.<br /><em>ويراقب.</em></> : <>Charges.<br /><em>And watches.</em></>}</h2>
          <p>{ar
            ? 'حساس Thermistor يراقب حرارة Mini Orange باستمرار، ويفصل تلقائيًا عند أي ارتفاع غير طبيعي، مع أربعة أنظمة حماية مستقلة تعمل في الخلفية.'
            : 'A Thermistor continuously monitors Mini Orange temperature and disconnects automatically if it rises abnormally, backed by four independent protection systems.'}</p>
        </Reveal>

        <div className="safety-systems">
          {systems.map(([number, title, text], i) => (
            <article className="safety-system" key={number}>
              <span className="safety-icon" aria-hidden="true">{icons[i]}</span>
              <div>
                <div className="safety-system-head"><b>{number}</b><h3>{title}</h3></div>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
