'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';
import LanguageToggle from './LanguageToggle';
import styles from './SiteHeader.module.css';

const LINKS = [
  { href: '#services', key: 'navServices' },
  { href: '#projects', key: 'navProjects' },
  { href: '#certificates', key: 'navCerts' },
  { href: '#news', key: 'navNews' },
] as const;

// One-page navigation: every link scrolls to a section of the same page.
export default function SiteHeader({ onContactClick }: { onContactClick: () => void }) {
  const { t } = useLanguage();

  return (
    <header className={styles.bar}>
      <div className={styles.inner}>
        <a href="#top" className={styles.logoPill} aria-label={t('companyName')}>
          <span className={styles.logoBadge}>
            <img src="/img/logo.png" alt="Tsuurait Nurgeen" className={styles.logo} />
          </span>
          <span className={styles.companyName}>{t('companyName')}</span>
        </a>
        <nav className={styles.nav} aria-label="Main">
          <div className={styles.links}>
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className={styles.link}>
                {t(l.key)}
              </a>
            ))}
            <button
              type="button"
              className={styles.contactBtn}
              onClick={(e) => {
                e.preventDefault();
                onContactClick();
              }}
            >
              {t('contactNav')}
            </button>
          </div>
          <div className={styles.toggleSlot}>
            <LanguageToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
