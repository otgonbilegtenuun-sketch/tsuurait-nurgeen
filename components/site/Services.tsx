'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import type { Service } from '@/lib/data/services';
import type { Project } from '@/lib/data/projects';
import type { Certificate } from '@/lib/data/certificates';
import ServiceDetail from './ServiceDetail';
import styles from './Services.module.css';

export default function Services({
  services,
  projects,
  certificates,
  onContactClick,
}: {
  services: Service[];
  projects: Project[];
  certificates: Certificate[];
  onContactClick: () => void;
}) {
  const { t } = useLanguage();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="services" className={styles.section} data-screen-label="Services">
      <div className={styles.headerRow}>
        <div>
          <div className={styles.eyebrow}>{t('servicesEyebrow')}</div>
          <h2 className={styles.heading}>{t('servicesHeading')}</h2>
          <div className={styles.underline}></div>
        </div>
        <div className={styles.lead}>
          {t('servicesLead')}
          <span className={styles.hint}>{t('servicesHint')}</span>
        </div>
      </div>

      <div className={styles.list}>
        {services.map((s, i) => {
          const isOpen = open === i;
          return (
            <div key={s.slug} className={`${styles.item} ${isOpen ? styles.itemOpen : ''}`}>
              <h3 className={styles.itemHead}>
                <button
                  type="button"
                  id={`svc-${s.slug}-tab`}
                  className={styles.trigger}
                  aria-expanded={isOpen}
                  aria-controls={`svc-${s.slug}-panel`}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span className={styles.iconTile}>{s.icon}</span>
                  <span className={styles.cardBody}>
                    <span className={styles.cardTitle}>{s.title}</span>
                    <span className={styles.cardSub}>{s.sub}</span>
                  </span>
                  <span className={styles.chevron} aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </button>
              </h3>
              <div
                id={`svc-${s.slug}-panel`}
                role="region"
                aria-labelledby={`svc-${s.slug}-tab`}
                className={styles.panel}
                inert={!isOpen}
              >
                <div className={styles.panelInner}>
                  <ServiceDetail service={s} projects={projects} certificates={certificates} onContactClick={onContactClick} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
