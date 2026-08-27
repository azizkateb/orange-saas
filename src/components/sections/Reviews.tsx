'use client';

import { useMemo, useState } from 'react';
import Reveal from '@/components/animations/Reveal';
import { reviews, type Review } from '@/data/reviews';
import { useI18n } from '@/i18n/I18nProvider';

function Stars({ rating, ar }: { rating: number; ar: boolean }) {
  return (
    <span className="salla-stars" role="img" aria-label={ar ? `${rating} من 5 نجوم` : `${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => <i key={i} className={i < rating ? 'on' : 'off'} aria-hidden="true">★</i>)}
    </span>
  );
}

function Avatar({ review }: { review: Review }) {
  if (review.avatar) return <img className="salla-avatar" src={review.avatar} alt="" width="46" height="46" />;
  return <span className="salla-avatar salla-avatar-fallback" aria-hidden="true">{review.name.trim().charAt(0)}</span>;
}

export default function Reviews() {
  const { locale } = useI18n();
  const ar = locale === 'ar';
  const [expanded, setExpanded] = useState(false);
  const initialCount = 3;
  const visible = useMemo(() => expanded ? reviews : reviews.slice(0, initialCount), [expanded]);
  const average = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <section id="reviews" className="salla-reviews">
      <div className="container">
        <Reveal className="salla-reviews-head">
          <div><span className="overline">{ar ? 'تقييمات العملاء' : 'CUSTOMER REVIEWS'}</span><h2>{ar ? 'قالوها بعد الاستخدام.' : 'What customers say.'}</h2></div>
          <div className="salla-rating-summary"><strong>{average.toFixed(1)}</strong><Stars rating={Math.round(average)} ar={ar} /><span>{ar ? `${reviews.length} تقييمات موثّقة` : `${reviews.length} verified reviews`}</span></div>
        </Reveal>

        <div className="salla-review-list" aria-live="polite">
          {visible.map((review, index) => (
            <Reveal key={review.id} delay={index * .06} className="salla-review">
              <header><Avatar review={review} /><div><b>{review.name}</b>{review.verified && <span>{ar ? 'شراء موثّق' : 'Verified purchase'}</span>}</div><Stars rating={review.rating} ar={ar} /></header>
              <p>{review.text}</p>
            </Reveal>
          ))}
        </div>

        {reviews.length > initialCount && <button className="salla-more" type="button" onClick={() => setExpanded(value => !value)} aria-expanded={expanded}>
          {expanded ? (ar ? 'عرض تقييمات أقل' : 'Show fewer reviews') : (ar ? `المزيد من التقييمات (${reviews.length - initialCount})` : `More reviews (${reviews.length - initialCount})`)}
          <i aria-hidden="true">{expanded ? '↑' : '↓'}</i>
        </button>}
      </div>
    </section>
  );
}
