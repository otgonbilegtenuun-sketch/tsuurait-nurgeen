'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';
import styles from './AboutBanner.module.css';

export default function AboutBanner() {
  const { t, lang } = useLanguage();

  return (
    <div className={styles.wrap}>
      <div className={styles.inner}>
        <div className={styles.frame}>
          <img src="/img/about-team.jpg" alt="" />
          <div className={styles.fade} />
          <div className={styles.caption}>{t('aboutBannerCaption')}</div>
        </div>

        {/* Overlays the photo on desktop; sits below it on phones (see CSS). */}
        <div className={styles.aboutCard}>
          <div className={styles.aboutLabel}>{t('aboutLabel')}</div>
          <div className={styles.aboutList}>
            <div className={styles.aboutRow}>
              <span>{t('aboutFounded')}</span>
              <span className={styles.aboutValue}>2010{lang === 'mn' ? ' он' : ''}</span>
            </div>
            <div className={styles.aboutRow}>
              <span>{t('aboutRegistered')}</span>
              <span className={styles.aboutValue}>2018{lang === 'mn' ? ' он' : ''}</span>
            </div>
            <div className={styles.aboutRowLast}>
              <span>{t('aboutTeam')}</span>
              <span className={styles.aboutValue}>27</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
