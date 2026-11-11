'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';
import styles from './EngineeringSection.module.css';

// Replace public/img/blueprint-diagram.jpg to change the drawing.
export default function EngineeringSection() {
  const { t } = useLanguage();

  return (
    <section className={styles.section} data-screen-label="Engineering">
      <div className={styles.text}>
        <div className={styles.eyebrow}>{t('engineeringEyebrow')}</div>
        <h2 className={styles.heading}>{t('engineeringHeading')}</h2>
        <p className={styles.caption}>{t('engineeringCaption')}</p>
      </div>
      <div className={styles.frame}>
        <img src="/img/blueprint-diagram.jpg" alt={t('engineeringHeading')} loading="lazy" />
      </div>
    </section>
  );
}
