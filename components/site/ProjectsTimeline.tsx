'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useHScroll } from '@/lib/hooks/useHScroll';
import type { Project } from '@/lib/data/projects';
import ScrollArrows from './ScrollArrows';
import styles from './ProjectsTimeline.module.css';

const pad = (x: number) => String(x).padStart(2, '0');

export default function ProjectsTimeline({ projects }: { projects: Project[] }) {
  const { t } = useLanguage();
  const { ref, canPrev, canNext, progress, index, step } = useHScroll();
  const yearSuffix = t('timelineYearSuffix');
  const current = Math.min(index, projects.length - 1);

  return (
    <section id="projects" data-screen-label="Projects" className={styles.section}>
      <div className={styles.headRow}>
        <div>
          <div className={styles.eyebrow}>{t('timelineEyebrow')}</div>
          <div className={styles.heading}>
            {t('timelineHeadingPrefix')} <span className={styles.headingRange}>2010 — 2026</span>
          </div>
        </div>
        <div className={styles.controls}>
          <div className={styles.counter}>
            {pad(current + 1)} / {pad(projects.length)}
          </div>
          <ScrollArrows canPrev={canPrev} canNext={canNext} onStep={step} />
        </div>
      </div>

      <div ref={ref} className={styles.track}>
        {projects.map((p, i) => (
          <article key={i} className={styles.card}>
            <div className={styles.imageFrame}>
              <img src={p.img} alt="" loading="lazy" />
              <div className={styles.imageFade} />
              <div className={styles.yearBadge}>
                {p.year}
                {yearSuffix ? ` ${yearSuffix}` : ''}
              </div>
            </div>
            <p className={styles.text}>{p.text}</p>
          </article>
        ))}
      </div>

      <div className={styles.progressTrack}>
        <div className={styles.progressFill} style={{ width: `${Math.max(4, progress * 100)}%` }} />
      </div>
    </section>
  );
}
