'use client';

import { useEffect, useRef, useState } from 'react';
import Reveal from '@/components/animations/Reveal';
import { useI18n } from '@/i18n/I18nProvider';

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
  const [paused, setPaused] = useState(true);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => setPaused(true));
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
        <video ref={ref} onClick={toggle} muted autoPlay loop playsInline preload="metadata" poster={poster} aria-label={label}>
          <source src={src} type="video/mp4" />
        </video>
        <button type="button" className={`how-video-play${paused ? ' is-visible' : ''}`} onClick={toggle} aria-label={paused ? (label === 'use' ? 'تشغيل فيديو الاستخدام' : 'تشغيل فيديو الشحن') : 'إيقاف الفيديو'}>▶</button>
        <span className="how-video-index" aria-hidden="true">{label === 'use' ? '01' : '02'}</span>
      </div>
    </article>
  );
}

export default function HowItWorks() {
  const { t, locale } = useI18n();
  const ar = locale === 'ar';

  return (
    <section id="how" className="how">
      <div className="how-leaf how-leaf--tr" aria-hidden="true" />
      <div className="how-leaf how-leaf--bl" aria-hidden="true" />
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
            subtitle={ar ? 'من خلال أي منفذ Type-C' : 'From any Type-C port'}
            src="/assets/charging-anywhere.mp4"
            poster="/assets/charging-anywhere-poster.jpg"
            label="charge"
          />
        </Reveal>
      </div>
    </section>
  );
}