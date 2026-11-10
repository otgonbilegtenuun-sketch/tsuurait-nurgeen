'use client';

import type { RefObject } from 'react';
import type { TimelineItem, Tick } from '@/lib/types/site';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import styles from './ProjectsTimeline.module.css';

export default function ProjectsTimeline({
  trackRef,
  trackHeight,
  counter,
  items,
  activeYear,
  progressPct,
  ticks,
}: {
  trackRef: RefObject<HTMLDivElement | null>;
  trackHeight: string;
  counter: string;
  items: TimelineItem[];
  activeYear: string;
  progressPct: string;
  ticks: Tick[];
  progress: number;
}) {
  const { t } = useLanguage();
  const yearSuffix = t('timelineYearSuffix');

  return (
    <section data-screen-label="Projects" className={styles.section}>
      <div ref={trackRef} className={styles.track} style={{ height: trackHeight }}>
        <div className={styles.sticky}>
          <div className={styles.headRow}>
            <div>
              <div className={styles.eyebrow}>{t('timelineEyebrow')}</div>
              <div className={styles.heading}>
                {t('timelineHeadingPrefix')} <span className={styles.headingRange}>2010 — 2025</span>
              </div>
            </div>
            <div className={styles.counter}>{counter}</div>
          </div>

          <div className={styles.body}>
            <div className={styles.textStack}>
              {items.map((p, i) => (
                <div
                  key={i}
                  className={styles.textItem}
                  style={{ opacity: p.op, transform: `translateY(${p.ty})`, pointerEvents: p.pe }}
                >
                  <div className={styles.year}>
                    {p.year}
                    <span className={styles.yearSuffix}>{yearSuffix}</span>
                  </div>
                  <div className={styles.divider} />
                  <p className={styles.text}>{p.text}</p>
                </div>
              ))}
            </div>

            <div className={styles.imageStack}>
              {items.map((p, i) => (
                <img
                  key={i}
                  src={p.img}
                  alt=""
                  className={styles.image}
                  style={{ opacity: p.op, transform: `scale(${p.sc}) translateY(${p.iy})` }}
                />
              ))}
              <div className={styles.imageFade} />
              <div className={styles.imageBadge}>
                <span className={styles.imageBadgeYear}>
                  {activeYear}
                  {yearSuffix ? ` ${yearSuffix}` : ''}
                </span>
                <span className={styles.imageBadgeHint}>{t('timelineScrollHint')}</span>
              </div>
            </div>
          </div>

          <div className={styles.footRow}>
            <div className={styles.progressTrack}>
              <div className={styles.progressFill} style={{ width: progressPct }} />
            </div>
            <div className={styles.ticks}>
              {ticks.map((t, i) => (
                <span key={i} className={styles.tick} style={{ color: t.color }}>
                  {t.y}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
