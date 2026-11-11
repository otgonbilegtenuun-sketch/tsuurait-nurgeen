'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type HScrollState = { canPrev: boolean; canNext: boolean; progress: number; index: number };

const INITIAL: HScrollState = { canPrev: false, canNext: true, progress: 0, index: 0 };

// Tracks a horizontally scrollable row: which card is current, how far along it
// is, and whether more lies either side. `step()` scrolls one card at a time.
export function useHScroll() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [state, setState] = useState<HScrollState>(INITIAL);

  const stepWidth = useCallback(() => {
    const el = ref.current;
    const first = el?.firstElementChild as HTMLElement | null | undefined;
    if (!el || !first) return 0;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    return first.offsetWidth + gap;
  }, []);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const w = stepWidth();
    const next: HScrollState = {
      canPrev: el.scrollLeft > 4,
      canNext: el.scrollLeft < max - 4,
      progress: max > 0 ? Math.min(1, Math.max(0, el.scrollLeft / max)) : 0,
      index: w > 0 ? Math.round(el.scrollLeft / w) : 0,
    };
    setState((prev) =>
      prev.canPrev === next.canPrev &&
      prev.canNext === next.canNext &&
      prev.index === next.index &&
      Math.abs(prev.progress - next.progress) < 0.002
        ? prev
        : next
    );
  }, [stepWidth]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener('scroll', update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    update();
    return () => {
      el.removeEventListener('scroll', update);
      ro.disconnect();
    };
  }, [update]);

  const step = useCallback(
    (dir: 1 | -1) => {
      ref.current?.scrollBy({ left: dir * stepWidth(), behavior: 'smooth' });
    },
    [stepWidth]
  );

  return { ref, ...state, step };
}
