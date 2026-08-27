'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Reveal from '@/components/animations/Reveal';
import { reviews, type Review } from '@/data/reviews';

function Stars({ rating }: { rating: number }) {
  return (
    <span className="testim-stars" role="img" aria-label={`${rating} من 5 نجوم`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < rating ? 'star star--on' : 'star star--off'} aria-hidden="true">
          ★
        </span>
      ))}
    </span>
  );
}

function UnknownAvatar() {
  return (
    <span className="testim-avatar" aria-hidden="true">
      <svg viewBox="0 0 48 48" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="24" cy="17" r="9" />
        <path d="M9 40c0-8.3 6.7-15 15-15s15 6.7 15 15" />
      </svg>
    </span>
  );
}

function TestimonialItem({ review }: { review: Review }) {
  return (
    <div className="testim-item">
      <div className="testim-img">
        <UnknownAvatar />
      </div>
      <h2>{review.name}</h2>
      <p>{review.text}</p>
    </div>
  );
}

export default function Reviews() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const testimRef = useRef<HTMLElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % reviews.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => (prev - 1 + reviews.length) % reviews.length);
  }, []);

  // Auto-play timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % reviews.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setCurrentSlide(prev => (prev - 1 + reviews.length) % reviews.length);
      } else if (e.key === 'ArrowRight') {
        setCurrentSlide(prev => (prev + 1) % reviews.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.changedTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 30) {
      if (diff > 0) {
        setCurrentSlide(prev => (prev + 1) % reviews.length);
      } else {
        setCurrentSlide(prev => (prev - 1 + reviews.length) % reviews.length);
      }
    }
    setTouchStart(null);
  };

  return (
    <section id="testim" className="testim" ref={testimRef} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <div className="testim-wrap">
        <button id="left-arrow" className="testim-arrow left" onClick={prevSlide} aria-label="السابق">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button id="right-arrow" className="testim-arrow right" onClick={nextSlide} aria-label="التالي">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

<ul id="testim-dots" className="testim-dots" role="tablist" aria-label="اختر شهادة">
          {reviews.map((_, i) => (
            <li
              key={i}
              className={`testim-dot ${i === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(i)}
              role="tab"
              aria-selected={i === currentSlide}
              aria-label={`شهادة ${i + 1}`}
            />
          ))}
        </ul>

<div id="testim-content" className="testim-content">
          {reviews.map((review, index) => (
            <div
              key={review.id}
              className={`testim-slide ${index === currentSlide ? 'active' : 'inactive'}`}
              role="tabpanel"
              aria-hidden={index !== currentSlide}
            >
              <div className="testim-img">
                <span className="testim-avatar" aria-hidden="true">
                  <svg viewBox="0 0 48 48" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="24" cy="17" r="9" />
                    <path d="M9 40c0-8.3 6.7-15 15-15s15 6.7 15 15" />
                  </svg>
                </span>
              </div>
              <h2>{review.name}</h2>
              <p>{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}