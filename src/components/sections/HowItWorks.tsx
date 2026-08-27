'use client';

import { useEffect, useRef } from 'react';
import Reveal from '@/components/animations/Reveal';
import { useI18n } from '@/i18n/I18nProvider';
import { stepAssets } from '@/data/content';
import { gsap, ScrollTrigger } from '@/lib/gsap';

function Leaf({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" stroke="#ff7900" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M50 94C50 62 30 42 12 32 30 30 50 42 50 72 50 42 70 30 88 32 70 42 50 62 50 94Z" />
      <path d="M50 94V40" />
    </svg>
  );
}

function PhoneFrame() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
  }, []);

  return (
    <div className="how-phone-frame" aria-hidden="true">
      <div className="phone-body">
        <div className="phone-notch" />
        <div className="phone-screen">
          <video
            ref={videoRef}
            className="phone-video"
            poster="/assets/how-it-works-poster.jpg"
            muted
            autoPlay
            loop
            playsInline
            preload="metadata"
          >
            <source src="/assets/how-it-works.mp4" type="video/mp4" />
          </video>
          <div className="phone-glare" />
        </div>
        <div className="phone-side-btn" />
        <div className="phone-side-btn" />
      </div>
      <div className="phone-shadow" />
      <div className="phone-glow" />
    </div>
  );
}

export default function HowItWorks() {
  const { t, tArr } = useI18n();
  const steps = tArr<string>('how.steps');
  const phoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const phone = phoneRef.current;
    if (!phone) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        phone,
        { y: 80, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.4,
          ease: 'expo.out',
          scrollTrigger: { trigger: phone, start: 'top 75%', once: true },
        }
      );
    }, phone);

    return () => ctx.revert();
  }, []);

  return (
    <section id="how" className="how">
      <Leaf className="how-leaf how-leaf--tr" />
      <Leaf className="how-leaf how-leaf--bl" />
      <div className="container">
        <Reveal>
          <h2 className="how-title">{t('how.title')}</h2>
        </Reveal>
        <div className="how-phone-wrapper" ref={phoneRef}>
          <PhoneFrame />
        </div>
        <div className="how-steps">
          {stepAssets.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1} className="how-d-step">
              <div className="how-d-photo">
                <img src={s.image} alt="" width="126" height="126" loading="lazy" />
              </div>
              <span className="how-d-num">{s.n}</span>
              <div className="how-d-text">{steps[i]}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
