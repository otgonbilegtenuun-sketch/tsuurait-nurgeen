'use client';

import type { NewsItem } from '@/lib/types/site';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import styles from './NewsSection.module.css';

export default function NewsSection({ news }: { news: NewsItem[] }) {
  const { t } = useLanguage(); // hook must run before the early return below

  if (news.length === 0) return null; // Per design spec: the entire section must not render when news is empty.

  return (
    <div className={styles.wrap} data-screen-label="News">
      <div className={styles.headingRow}>
        <div className={styles.heading}>{t('newsHeading')}</div>
        <div className={styles.subheading}>{t('newsSubheading')}</div>
      </div>
      <div className={styles.grid}>
        {news.map((n, i) => (
          <article key={n.date + i} className={styles.card}>
            <div className={styles.cardImage}>
              <img src={n.img} alt="" />
            </div>
            <div className={styles.cardBody}>
              <div className={styles.cardDate}>{n.date}</div>
              <h3 className={styles.cardTitle}>{n.title}</h3>
              <p className={styles.cardText}>{n.body}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
