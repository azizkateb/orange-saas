'use client';

import Reveal from '@/components/animations/Reveal';
import { useI18n } from '@/i18n/I18nProvider';

export default function Comparison() {
  const { locale } = useI18n();
  const ar = locale === 'ar';
  const rows = ar ? [
    ['ما تحتاج حمله', 'قطعة واحدة', 'باوربانك + كابل'], ['الاتصال', 'مباشر بالجهاز', 'كابل منفصل'],
    ['الاستخدام أثناء الشحن', 'ستاند مدمج', 'سلك يعيق الحركة'], ['معرفة النسبة', 'شاشة رقمية', 'مؤشرات غير دقيقة'],
    ['الحجم اليومي', '98g بحجم الجيب', 'أكبر وأثقل'], ['الحماية', '4 طبقات ذكية', 'تختلف حسب البديل']
  ] : [
    ['What you carry', 'One piece', 'Power bank + cable'], ['Connection', 'Direct to device', 'Separate cable'],
    ['Use while charging', 'Built-in stand', 'Cable gets in the way'], ['Battery level', 'Digital display', 'Basic indicators'],
    ['Everyday size', '98g, pocket-size', 'Larger and heavier'], ['Protection', '4 smart layers', 'Varies by alternative']
  ];
  return (
    <section id="comparison" className="comparison">
      <div className="container">
        <Reveal className="comparison-head"><span className="overline">{ar ? 'مقارنة واضحة' : 'CLEAR COMPARISON'}</span><h2 className="sec-title">{ar ? 'أقل مما تحمله. أكثر مما تحصل عليه.' : 'Carry less. Get more.'}</h2><p>{ar ? 'نفس وظيفة الشحن المتنقل، لكن بدون الحجم والأسلاك المعتادة.' : 'The same portable-power job, without the usual bulk and cables.'}</p></Reveal>
        <Reveal className="comparison-table" delay={0.1}>
          <div className="comparison-row comparison-labels"><span>{ar ? 'المعيار' : 'Feature'}</span><strong>Mini Orange</strong><b>{ar ? 'الحل التقليدي' : 'Traditional'}</b></div>
          {rows.map(row => <div className="comparison-row" key={row[0]}><span>{row[0]}</span><strong data-label="Mini Orange"><i>✓</i>{row[1]}</strong><b data-label={ar ? 'الحل التقليدي' : 'Traditional'}><i>×</i>{row[2]}</b></div>)}
        </Reveal>
      </div>
    </section>
  );
}
