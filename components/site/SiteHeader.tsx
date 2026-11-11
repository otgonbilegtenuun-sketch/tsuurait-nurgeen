'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import LanguageToggle from './LanguageToggle';
import styles from './SiteHeader.module.css';

export default function SiteHeader({
  onContactClick,
  current,
}: {
  onContactClick: () => void;
  current?: 'services';
}) {
  const { t } = useLanguage();

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logoPill} aria-label={t('companyName')}>
        <span className={styles.logoBadge}>
          <img src="/img/logo.png" alt="Tsuurait Nurgeen" className={styles.logo} />
        </span>
        <span className={styles.companyName}>{t('companyName')}</span>
      </Link>
      <nav className={styles.nav}>
        <Link
          href="/services"
          className={`${styles.pill} ${styles.servicesLink} ${current === 'services' ? styles.pillActive : ''}`}
          aria-current={current === 'services' ? 'page' : undefined}
        >
          {t('navServices')}
        </Link>
        <div className={styles.toggleSlot}>
          <LanguageToggle />
        </div>
        <button
          type="button"
          className={`${styles.pill} ${styles.contactBtn}`}
          onClick={(e) => {
            e.preventDefault();
            onContactClick();
          }}
        >
          {t('contactNav')}
        </button>
      </nav>
    </header>
  );
}
