'use client';

import Reveal from '@/components/animations/Reveal';
import { useI18n } from '@/i18n/I18nProvider';

export default function Problem() {
  const { locale } = useI18n();
  const ar = locale === 'ar';
  const pain = ar
    ? ['كابل طويل يتشابك في الحقيبة', 'باوربانك ضخم وثقيل', 'قطع إضافية تنساها وقت الحاجة']
    : ['A long cable tangling in your bag', 'A bulky, heavy power bank', 'Extra pieces you forget when needed'];

  return (
    <section id="problem" className="problem">
      <div className="container problem-grid">
        <Reveal className="problem-copy" direction="right">
          <span className="overline">{ar ? 'المشكلة التي يحلها' : 'THE PROBLEM IT SOLVES'}</span>
          <h2>{ar ? <>الشحن المتنقل<br />صار يحمل <em>أكثر مما يحل.</em></> : <>Portable charging<br />carries <em>more than it solves.</em></>}</h2>
          <p>{ar ? 'قبل Mini Orange، تحتاج باوربانك وكابل ومساحة إضافية في حقيبتك. ثلاث قطع لحل مشكلة واحدة.' : 'Before Mini Orange, you needed a power bank, a cable and extra bag space. Three things to solve one problem.'}</p>
        </Reveal>
        <Reveal className="problem-visual" direction="left">
          <div className="problem-cable" aria-hidden="true" />
          <ol>{pain.map((item, i) => <li key={item}><b>{`0${i + 1}`}</b><span>{item}</span></li>)}</ol>
          <div className="problem-answer"><img src="/assets/mini-orange-cutout.png" alt="Mini Orange" width="1000" height="1000" /><span>{ar ? 'قطعة واحدة. بدون سلك.' : 'One piece. No cable.'}</span></div>
        </Reveal>
      </div>
    </section>
  );
}
