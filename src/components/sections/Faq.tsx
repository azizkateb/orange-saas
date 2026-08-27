'use client';

import { useState } from 'react';
import Reveal from '@/components/animations/Reveal';
import { useI18n } from '@/i18n/I18nProvider';

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item${open ? ' open' : ''}`}>
      <button type="button" className="faq-q" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        <span>{q}</span>
        <i>{open ? '−' : '+'}</i>
      </button>
      <div className="faq-answer"><div><p>{a}</p></div></div>
    </div>
  );
}

export default function Faq() {
  const { locale } = useI18n(); const ar = locale === 'ar';
  const items = ar ? [
    ['هل يناسب جهازي؟','يتوافق مع الأجهزة التي تستخدم منفذ Type-C، ومنها هواتف كثيرة ويد البلايستيشن والسماعات والأجهزة الصغيرة.'],
    ['كم تبلغ سعته؟','سعته 5000mAh، مناسبة لدفعة شحن يومية عملية عندما تكون خارج المنزل.'],
    ['هل أحتاج كابلًا لاستخدامه؟','لا. الموصل مدمج ويتصل مباشرة بجهازك. ويمكن شحن Mini Orange نفسه من منفذ USB.'],
    ['هل يمكن استخدام الهاتف أثناء الشحن؟','نعم. الستاند المدمج يثبت هاتفك أمامك أثناء الشحن.'],
    ['ما مدة شحن Mini Orange؟','يستغرق الشحن الكامل حوالي 40 دقيقة بحسب مصدر الطاقة المستخدم.'],
    ['هل الشحن آمن؟','نعم. يحتوي على أربع طبقات حماية من الحرارة والتيار والشحن الزائد والقصر الكهربائي.'],
    ['ما الضمان؟','ضمان لمدة سنتين ضد عيوب التصنيع، مع دعم مباشر بعد الشراء.'],
    ['هل التوصيل مجاني؟','نعم، التوصيل مجاني إلى كافة المناطق المشمولة في متجر Orange.']
  ] : [
    ['Will it fit my device?','It works with Type-C devices, including many phones, PlayStation controllers, earbuds and small electronics.'],
    ['What is its capacity?','5000mAh, designed as a practical daily boost while you are away from home.'],
    ['Do I need a cable to use it?','No. The connector is built in and plugs straight into your device. Mini Orange itself recharges from USB.'],
    ['Can I use my phone while charging?','Yes. The built-in stand keeps your phone upright while it charges.'],
    ['How long does it take to recharge?','A full recharge takes about 40 minutes depending on the power source.'],
    ['Is charging protected?','Yes. Four protection layers cover heat, overcurrent, overcharge and short circuit.'],
    ['What is the warranty?','A two-year warranty against manufacturing defects, with direct after-sales support.'],
    ['Is delivery free?','Yes, free delivery is available across the regions covered by the Orange store.']
  ];
  return <section id="faq" className="faq"><div className="container faq-grid"><Reveal className="faq-head"><span className="overline">{ar ? 'قبل أن تطلب' : 'BEFORE YOU ORDER'}</span><h2 className="sec-title">{ar ? 'كل ما تحتاج معرفته.' : 'Everything you need to know.'}</h2><p>{ar ? 'إجابات مباشرة على أهم الأسئلة قبل الشراء.' : 'Straight answers to the questions that matter before checkout.'}</p></Reveal><div className="faq-list">{items.map((x,i) => <Reveal key={x[0]} delay={i * .035}><FaqItem q={x[0]} a={x[1]} /></Reveal>)}</div></div></section>;
}
