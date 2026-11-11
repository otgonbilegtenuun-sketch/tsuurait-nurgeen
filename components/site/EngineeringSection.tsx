'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';
import styles from './EngineeringSection.module.css';

// The diagram's own labels are baked in as English text and can't follow the
// language toggle — the heading/caption around it (real site copy) do switch.
export default function EngineeringSection() {
  const { t } = useLanguage();

  return (
    <section className={styles.section} data-screen-label="Engineering">
      <div>
        <div className={styles.eyebrow}>{t('engineeringEyebrow')}</div>
        <h2 className={styles.heading}>{t('engineeringHeading')}</h2>
        <p className={styles.caption}>{t('engineeringCaption')}</p>
      </div>
      <div className={styles.frame}>
        <img src="/img/blueprint-diagram.jpg" alt={t('engineeringHeading')} />
      </div>
    </section>
  );
}
