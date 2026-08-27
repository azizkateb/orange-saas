'use client';

import Reveal from '@/components/animations/Reveal';
import { useI18n } from '@/i18n/I18nProvider';

export default function Comparison() {
  const { locale } = useI18n();
  const ar = locale === 'ar';
  const rows = ar ? [
    ['وش تشيل معك؟', 'قطعة وحدة وخلاص', 'باوربانك وسلكه وحوسته'],
    ['طريقة التوصيل', 'راكب في جوالك مباشرة', 'سلك مفصول يذلك'],
    ['وأنت تستخدمه بالشحن', 'فيه ستاند يفك للتثبيت', 'سلك كل شوي ينعفط ويعيقك'],
    ['النسبة وكم باقي', 'شاشة رقمية تعطيك العلم والزبده', 'لمبات تقعد تخمن منها الكمية'],
    ['الحجم والوزن', 'وزنه 98 جرام وبحجم الجيب', 'ثقيل ويحوس جيبك'],
    ['الأمان والحماية', 'حماية ذكية بأربع طبقات', 'حظك ونصيبك حسب الشركه']
  ] : [
    ['What you carry', 'One piece', 'Power bank + cable'], ['Connection', 'Direct to device', 'Separate cable'],
    ['Use while charging', 'Built-in stand', 'Cable gets in the way'], ['Battery level', 'Digital display', 'Basic indicators'],
    ['Everyday size', '98g, pocket-size', 'Larger and heavier'], ['Protection', '4 smart layers', 'Varies by alternative']
  ];
  return (
    <section id="comparison" className="comparison">
      <div className="container">
        <Reveal className="comparison-head"><span className="overline">{ar ? 'مقارنة بسيطة' : 'CLEAR COMPARISON'}</span><h2 className="sec-title">{ar ? 'أخف مما تشيل، وأقوى باللي يعطيك.' : 'Carry less. Get more.'}</h2><p>{ar ? 'نفس شغلة الشواحن الكبيرة، بس بلا أسلاك ولا حوسة الحجم الثقيل.' : 'The same portable-power job, without the usual bulk and cables.'}</p></Reveal>
        <Reveal className="comparison-table" delay={0.1}>
          <div className="comparison-row comparison-labels"><span>{ar ? 'المعيار' : 'Feature'}</span><strong>Mini Orange</strong><b>{ar ? 'الحل التقليدي' : 'Traditional'}</b></div>
          {rows.map(row => <div className="comparison-row" key={row[0]}><span>{row[0]}</span><strong data-label="Mini Orange"><i>✓</i>{row[1]}</strong><b data-label={ar ? 'الحل التقليدي' : 'Traditional'}><i>×</i>{row[2]}</b></div>)}
        </Reveal>
      </div>
    </section>
  );
}
