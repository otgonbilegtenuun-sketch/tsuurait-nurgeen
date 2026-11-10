'use client';

import { useEffect, useState, type RefObject } from 'react';
import type { Hero3DHandle } from '@/lib/three/hero3d';

// Ported 1:1 from the prototype's componentDidMount/onScroll (Tsuurait Nurgeen v3 Georgia.dc.html).
// IMPORTANT: scroll listener MUST use { capture: true, passive: true } on `document`,
// not just `window` — see README.md section 6, point 3.
export function useProjectsTimeline(
  trackRef: RefObject<HTMLDivElement | null>,
  heroRef: RefObject<HTMLElement | null>,
  heroHandleRef: RefObject<Hero3DHandle | null>,
  projectCount: number
) {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = trackRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = Math.max(1, el.offsetHeight - window.innerHeight);
      const p = Math.min(1, Math.max(0, -r.top / total));
      const n = projectCount || 1;
      const nextActive = Math.min(n - 1, Math.floor(p * n * 0.999));

      const hr = heroRef.current ? heroRef.current.getBoundingClientRect().top : -window.scrollY;
      const heroP = Math.min(1, Math.max(0, -hr / (window.innerHeight * 1.2)));
      heroHandleRef.current?.setScroll(heroP * 0.6 + p * 0.4);

      setActive((prevActive) => (nextActive !== prevActive ? nextActive : prevActive));
      setProgress((prevProgress) => (Math.abs(p - prevProgress) > 0.002 ? p : prevProgress));
    };

    document.addEventListener('scroll', onScroll, { capture: true, passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();

    return () => {
      document.removeEventListener('scroll', onScroll, { capture: true });
      window.removeEventListener('resize', onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectCount]);

  return { active, progress };
}
