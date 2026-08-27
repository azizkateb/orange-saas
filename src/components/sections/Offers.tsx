'use client';

import { useState } from 'react';
import Reveal from '@/components/animations/Reveal';
import { useI18n } from '@/i18n/I18nProvider';

const PRODUCT_ID = '675834151';

export default function Offers() {
  const { locale } = useI18n();
  const ar = locale === 'ar';
  const [selected, setSelected] = useState(2);
  const [status, setStatus] = useState<'idle' | 'processing' | 'error'>('idle');

  const offers = ar ? [
    { q: 1, title: 'قطعة واحدة', price: 99, unit: '99 للقطعة', note: 'للاستخدام الشخصي' },
    { q: 2, title: 'قطعتان', price: 168, unit: '84 للقطعة', note: 'وفر 30 ر.س', best: true },
    { q: 3, title: 'ثلاث قطع', price: 230, unit: '76.67 للقطعة', note: 'وفر 67 ر.س' }
  ] : [
    { q: 1, title: 'One piece', price: 99, unit: 'SAR 99 each', note: 'Personal use' },
    { q: 2, title: 'Two pieces', price: 168, unit: 'SAR 84 each', note: 'Save SAR 30', best: true },
    { q: 3, title: 'Three pieces', price: 230, unit: 'SAR 76.67 each', note: 'Save SAR 67' }
  ];
  const current = offers.find(x => x.q === selected)!;

  const buy = async () => {
    if (status === 'processing') return;
    setStatus('processing');
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: selected }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.checkout_url) {
        throw new Error(data?.message || 'checkout_failed');
      }

      const ttq = (window as unknown as { ttq?: { track?: (e: string, p: object) => void } }).ttq;
      if (ttq && typeof ttq.track === 'function') {
        ttq.track('InitiateCheckout', {
          value: current.price,
          currency: 'SAR',
          quantity: selected,
          content_ids: [PRODUCT_ID],
          contents: [{ id: PRODUCT_ID, quantity: selected, price: current.price }],
        });
      }

      window.location.assign(data.checkout_url);
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="offers" className="offers">
      <div className="container">
        <Reveal className="offers-head"><span className="overline">{ar ? 'العرض والكمية' : 'OFFERS & QUANTITY'}</span><h2 className="sec-title">{ar ? 'خذ أكثر. وادفع أقل.' : 'Take more. Pay less.'}</h2><p>{ar ? 'اختر الكمية المناسبة، ثم أكمل الطلب بأمان داخل متجر سلة.' : 'Choose your quantity, then complete checkout securely in Salla.'}</p></Reveal>
        <div className="offer-layout">
          <Reveal className="offer-image" direction="right"><img src="/assets/mini-orange-cutout.png" alt="Mini Orange" /></Reveal>
          <Reveal className="offer-panel" direction="left">
            <div className="offer-options">{offers.map(o => <button key={o.q} type="button" className={selected === o.q ? 'selected' : ''} onClick={() => setSelected(o.q)} aria-pressed={selected === o.q}><span className="offer-radio" /><span><b>{o.title}</b><small>{o.note}</small></span><span className="offer-price"><b>{o.price} {ar ? 'ر.س' : 'SAR'}</b><small>{o.unit}</small></span>{o.best && <em>{ar ? 'الأكثر طلبًا' : 'Most popular'}</em>}</button>)}</div>
            <div className="offer-total"><span>{ar ? 'الإجمالي' : 'Total'}</span><strong>{current.price} {ar ? 'ر.س' : 'SAR'}</strong></div>
            <button
              className="offer-buy"
              type="button"
              onClick={buy}
              disabled={status === 'processing'}
              aria-busy={status === 'processing'}
            >
              {status === 'processing'
                ? (ar ? 'جاري تحويلك للدفع...' : 'Redirecting to checkout...')
                : (ar ? `اطلب ${current.title} الآن` : `Order ${current.title}`)}
            </button>
            {status === 'error' && (
              <p className="offer-buy-error" role="alert">
                {ar ? 'تعذر إتمام الطلب، حاول مرة أخرى.' : 'Could not complete your order.'}
                <button type="button" className="offer-buy-retry" onClick={buy}>{ar ? 'إعادة المحاولة' : 'Retry'}</button>
              </p>
            )}
            <p className="offer-trust">{ar ? 'دفع آمن عبر سلة · توصيل مجاني · ضمان سنتين' : 'Secure Salla checkout · Free delivery · Two-year warranty'}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
