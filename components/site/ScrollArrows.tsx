'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';
import styles from './ScrollArrows.module.css';

export default function ScrollArrows({
  canPrev,
  canNext,
  onStep,
}: {
  canPrev: boolean;
  canNext: boolean;
  onStep: (dir: 1 | -1) => void;
}) {
  const { t } = useLanguage();
  // Everything already fits on screen: nothing to scroll, so show no arrows.
  if (!canPrev && !canNext) return null;
  return (
    <div className={styles.arrows}>
      <button type="button" className={styles.btn} disabled={!canPrev} onClick={() => onStep(-1)} aria-label={t('scrollPrev')}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M15 5l-7 7 7 7" />
        </svg>
      </button>
      <button type="button" className={styles.btn} disabled={!canNext} onClick={() => onStep(1)} aria-label={t('scrollNext')}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
