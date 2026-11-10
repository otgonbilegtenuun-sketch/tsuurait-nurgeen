'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';
import styles from './WorksMarquee.module.css';

export default function WorksMarquee({
  worksLoop,
  worksLoop2,
  marqueeDur,
  marqueeDur2,
}: {
  worksLoop: string[];
  worksLoop2: string[];
  marqueeDur: string;
  marqueeDur2: string;
}) {
  const { t } = useLanguage();

  return (
    <div className={styles.wrap}>
      <div className={styles.headingRow}>
        <div className={styles.heading}>{t('worksHeading')}</div>
        <div className={styles.subheading}>{t('worksSubheading')}</div>
      </div>
      <div className={styles.maskRow}>
        <div className={styles.track1} style={{ animationDuration: marqueeDur }}>
          {worksLoop.map((w, i) => (
            <div key={i} className={styles.card1}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={w} alt="" />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.maskRow}>
        <div className={styles.track2} style={{ animationDuration: marqueeDur2 }}>
          {worksLoop2.map((w, i) => (
            <div key={i} className={styles.card2}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={w} alt="" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
