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
    ['يناسب جوالي؟','يركب على الأجهزة اللي بمنفذ Type-C، زي أغلب الجوالات، يد البلايستيشن، السماعات، والأجهزة الصغار.'],
    ['كم سعته؟','سعته 5000mAh، ممتازة تعطيك شحنة تسرعك وتكفيك طول ما أنت برا البيت.'],
    ['أحتاج سلك عشانه؟','أبداً. القطعة راكبة فيه وارمي السلك ولا تشيل همه، وينشحن هو نفسه من أي منفذ Type-C.'],
    ['أقدر أستخدم جوالي وهو ينشحن؟','إيه نعم، وفيه ستاند خلفي لو حبيت تثبت الجوال وانت تستخدمه ياوحش'],
    ['كم يطول لين يشحن جهازي Mini Orange؟','يفلل ويشحن لك كامل بحدود 40 دقيقة، على حسب نوع جوالك او الجهاز الي تشحنه'],
    ['آمن ولا يخوف؟','آمن مليون بالمية؛ فيه 4 طبقات حماية تحميه من الحرارة، التماس التيار، الشحن الزائد، والقصر الكهربائي.'],
    ['وش وضعه من الضمان؟','مضمّن سنتين كاملة ضد عيوب التصنيع، ومعك دعم فني يوقف معك أول بأول حتى بعد ما تشتريه.'],
    ['التوصيل بفلوس ولا مجاني؟','التوصيل ب 9ريال للطلبات الي اقل من 149ريال، يوصلك لين باب بيتك']
  ] : [
    ['Will it fit my device?','It works with Type-C devices, including many phones, PlayStation controllers, earbuds and small electronics.'],
    ['What is its capacity?','5000mAh, designed as a practical daily boost while you are away from home.'],
    ['Do I need a cable to use it?','No. The connector is built in and plugs straight into your device. Mini Orange itself recharges from a Type-C port.'],
    ['Can I use my phone while charging?','Yes. The built-in stand keeps your phone upright while it charges.'],
    ['How long does it take to recharge?','A full recharge takes about 40 minutes depending on the power source.'],
    ['Is charging protected?','Yes. Four protection layers cover heat, overcurrent, overcharge and short circuit.'],
    ['What is the warranty?','A two-year warranty against manufacturing defects, with direct after-sales support.'],
    ['Is delivery free?','Yes, free delivery is available across the regions covered by the Orange store.']
  ];
  return <section id="faq" className="faq"><div className="container faq-grid"><Reveal className="faq-head"><span className="overline">{ar ? 'قبل لا تطلب' : 'BEFORE YOU ORDER'}</span><h2 className="sec-title">{ar ? 'كل اللي يهمك تعرفه.' : 'Everything you need to know.'}</h2><p>{ar ? 'إجابات كاش وعالماشي لكل الأسئلة اللي فبالك قبل تشتريه.' : 'Straight answers to the questions that matter before checkout.'}</p></Reveal><div className="faq-list">{items.map((x,i) => <Reveal key={x[0]} delay={i * .035}><FaqItem q={x[0]} a={x[1]} /></Reveal>)}</div></div></section>;
}
