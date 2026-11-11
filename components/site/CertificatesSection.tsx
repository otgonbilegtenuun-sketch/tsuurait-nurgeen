'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useHScroll } from '@/lib/hooks/useHScroll';
import type { Certificate } from '@/lib/data/certificates';
import ScrollArrows from './ScrollArrows';
import styles from './CertificatesSection.module.css';

export default function CertificatesSection({ certificates }: { certificates: Certificate[] }) {
  const { t } = useLanguage();
  const { ref, canPrev, canNext, step } = useHScroll();

  return (
    <section className={styles.section} data-screen-label="Certificates">
      <div className={styles.headRow}>
        <div>
          <div className={styles.eyebrow}>{t('certsEyebrow')}</div>
          <h2 className={styles.heading}>{t('certsHeading')}</h2>
        </div>
        <ScrollArrows canPrev={canPrev} canNext={canNext} onStep={step} />
      </div>
      <div ref={ref} className={styles.track}>
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
