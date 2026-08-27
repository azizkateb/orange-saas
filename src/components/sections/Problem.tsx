'use client';

import Reveal from '@/components/animations/Reveal';
import { useI18n } from '@/i18n/I18nProvider';
import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

export default function Problem() {
  const { locale } = useI18n();
  const ar = locale === 'ar';
  const pain = ar
    ? ['كابل طويل يتشابك في الحقيبة', 'باوربانك ضخم وثقيل', 'قطع إضافية تنساها وقت الحاجة']
    : ['A long cable tangling in your bag', 'A bulky, heavy power bank', 'Extra pieces you forget when needed'];

  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    const copy = root.querySelector('.problem-answer-copy');
    if (!copy) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(copy, { opacity: 0, y: 14 }, {
          opacity: 1, y: 0, duration: 0.9, ease: 'expo.out',
          scrollTrigger: { trigger: root, start: 'top 80%', once: true },
        });
      });
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(copy, { opacity: 1, y: 0 });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="problem" className="problem" ref={sectionRef}>
      <div className="container problem-grid">
        <Reveal className="problem-copy" direction="right">
          <span className="overline">{ar ? 'المشكلة التي يحلها' : 'THE PROBLEM IT SOLVES'}</span>
          <h2>{ar ? <>الشحن المتنقل<br />صار يحمل <em>أكثر مما يحل.</em></> : <>Portable charging<br />carries <em>more than it solves.</em></>}</h2>
          <p>{ar ? 'قبل Mini Orange، تحتاج باوربانك وكابل ومساحة إضافية في حقيبتك. ثلاث قطع لحل مشكلة واحدة.' : 'Before Mini Orange, you needed a power bank, a cable and extra bag space. Three things to solve one problem.'}</p>
        </Reveal>
        <Reveal className="problem-visual" direction="left">
          <div className="problem-cable" aria-hidden="true" />
          <ol>{pain.map((item, i) => <li key={item}><b>0{i + 1}</b><span>{item}</span></li>)}</ol>
          <div className="problem-answer">
            <div className="problem-product-scale">
              <img className="problem-product-image" src="/assets/mini-orange-cutout.png" alt="Mini Orange" width="1000" height="1000" />
            </div>
            <span className="problem-answer-copy">
              {ar
                ? <><span className="ln">قطعة واحدة.</span><br /><em className="ln hl">بدون سلك.</em></>
                : <><span className="ln">One piece.</span><br /><em className="ln hl">No cable.</em></>}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
