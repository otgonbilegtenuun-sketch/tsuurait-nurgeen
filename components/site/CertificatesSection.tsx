'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';
import type { Certificate } from '@/lib/data/certificates';
import styles from './CertificatesSection.module.css';

export default function CertificatesSection({ certificates }: { certificates: Certificate[] }) {
  const { t } = useLanguage();
  return (
    <section className={styles.section} data-screen-label="Certificates">
      <div>
        <div className={styles.eyebrow}>{t('certsEyebrow')}</div>
        <h2 className={styles.heading}>{t('certsHeading')}</h2>
      </div>
      <div className={styles.grid}>
        {certificates.map((c, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.imageFrame}>
              <img src={c.img} alt={c.title} />
            </div>
            <div className={styles.cardTitle}>{c.title}</div>
            <div className={styles.cardIssuer}>{c.issuer}</div>
            <div className={styles.cardDetail}>{c.detail}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
