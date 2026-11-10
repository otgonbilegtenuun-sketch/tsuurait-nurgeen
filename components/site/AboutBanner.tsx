'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';
import styles from './AboutBanner.module.css';

export default function AboutBanner() {
  const { t } = useLanguage();

  return (
    <div className={styles.wrap}>
      <div className={styles.frame}>
        <img src="/img/about-team.jpg" alt="" />
        <div className={styles.fade} />
        <div className={styles.caption}>{t('aboutBannerCaption')}</div>
      </div>
    </div>
  );
}
