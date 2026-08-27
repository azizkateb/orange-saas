'use client';

import { useEffect, useRef, useState } from 'react';
import Reveal from '@/components/animations/Reveal';
import { useI18n } from '@/i18n/I18nProvider';
import { stepAssets } from '@/data/content';

function Leaf({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" stroke="#ff7900" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M50 94C50 62 30 42 12 32 30 30 50 42 50 72 50 42 70 30 88 32 70 42 50 62 50 94Z" />
      <path d="M50 94V40" />
    </svg>
  );
}

function VideoCard({
  title,
  subtitle,
  src,
  poster,
  label,
}: {
  title: string;
  subtitle: string;
  src: string;
  poster: string;
  label: string;
}) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    }, { threshold: .2, rootMargin: '12% 0px' });
    io.observe(video);

    const onPlay = () => setPaused(false);
    const onPause = () => setPaused(true);
    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);

    return () => {
      io.disconnect();
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
    };
  }, []);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  };

  return (
    <article className="how-video-card">
      <div className="how-video-title"><strong>{title}</strong><span>{subtitle}</span></div>
      <div className="how-video-window">
        <video ref={ref} onClick={toggle} muted loop playsInline preload="metadata" poster={poster} aria-label={label}>
          <source src={src} type="video/mp4" />
        </video>
        {paused && <span className="how-video-play" aria-hidden="true">▶</span>}
        <span className="how-video-index" aria-hidden="true">{label === 'use' ? '01' : '02'}</span>
      </div>
    </article>
  );
}

export default function HowItWorks() {
  const { t, tArr, locale } = useI18n();
  const steps = tArr<string>('how.steps');
  const ar = locale === 'ar';

  return (
    <section id="how" className="how">
      <Leaf className="how-leaf how-leaf--tr" />
      <Leaf className="how-leaf how-leaf--bl" />
      <div className="container">
        <Reveal>
          <h2 className="how-title">{t('how.title')}</h2>
        </Reveal>

        <Reveal className="how-video-duo" delay={.08}>
          <VideoCard
            title={ar ? 'كيف تستخدمه؟' : 'How do you use it?'}
            subtitle={ar ? 'من الجيب إلى الشحن' : 'From pocket to power'}
            src="/assets/how-it-works.mp4"
            poster="/assets/how-it-works-poster.jpg"
            label="use"
          />
          <VideoCard
            title={ar ? 'كيف تشحنه؟' : 'How do you recharge it?'}
            subtitle={ar ? 'من أي منفذ USB' : 'From any USB port'}
            src="/assets/charging-anywhere.mp4"
            poster="/assets/charging-anywhere-poster.jpg"
            label="charge"
          />
        </Reveal>

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
