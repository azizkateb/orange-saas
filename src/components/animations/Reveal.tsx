'use client';

import { ReactNode, useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

type Direction = 'up' | 'left' | 'right' | 'fade';

export default function Reveal({
  children,
  className,
  direction = 'up',
  delay = 0,
  distance,
  duration = 0.78,
  ease = 'power3.out',
}: {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
  distance?: number;
  duration?: number;
  ease?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const offset = distance ?? (direction === 'up' ? 28 : 40);
    const from = { opacity: 0, x: 0, y: 0 };
    if (direction === 'up') from.y = offset;
    if (direction === 'left') from.x = -offset;
    if (direction === 'right') from.x = offset;

    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current, from, {
        opacity: 1,
        x: 0,
        y: 0,
        duration,
        delay,
        ease,
        scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true },
      });
    }, ref);

    return () => ctx.revert();
  }, [direction, delay, distance, duration, ease]);

  return <div ref={ref} className={className}>{children}</div>;
}
