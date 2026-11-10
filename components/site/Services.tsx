'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';
import type { Service } from '@/lib/data/services';
import styles from './Services.module.css';

export default function Services({ services }: { services: Service[] }) {
  const { t } = useLanguage();
  return (
    <section className={styles.section} data-screen-label="Services">
      <div className={styles.headerRow}>
        <div>
          <div className={styles.eyebrow}>{t('servicesEyebrow')}</div>
          <div className={styles.heading}>{t('servicesHeading')}</div>
          <div className={styles.underline}></div>
        </div>
        <div className={styles.lead}>{t('servicesLead')}</div>
      </div>
      <div className={styles.grid}>
        {services.map((s, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.iconTile}>{s.icon}</div>
            <div className={styles.cardBody}>
              <div className={styles.cardTitle}>{s.title}</div>
              <div className={styles.cardSub}>{s.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
