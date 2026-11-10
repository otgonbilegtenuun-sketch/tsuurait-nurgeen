'use client';
import { contact } from '@/lib/design/tokens';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import styles from './SiteFooter.module.css';

export default function SiteFooter({ onContactClick }: { onContactClick: () => void }) {
  const { t } = useLanguage();
  return (
    <footer className={styles.footer}>
      <div className={styles.card}>
        <div className={styles.glow}></div>
        <div className={styles.left}>
          <div className={styles.logoPill}>
            <img src="/img/logo.png" alt="Tsuurait Nurgeen" />
          </div>
          <div className={styles.heading}>
            {t('footerHeadingLine1')}<br />
            <span className={styles.headingOutline}>{t('footerHeadingLine2')}</span>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.label}>{t('footerContactLabel')}</div>
          <a href={`mailto:${contact.email}`} className={styles.contactLink}>{contact.email}</a>
          <a href={`tel:${contact.phone1Tel}`} className={styles.contactLink}>{contact.phone1}</a>
          <a href={`tel:${contact.phone2Tel}`} className={styles.contactLink}>{contact.phone2}</a>
          <div className={styles.teamNote}>{t('footerTeamNote')}</div>
          <button type="button" className={styles.ctaBtn} onClick={onContactClick}>
            {t('footerCta')}
          </button>
        </div>
      </div>
      <div className={styles.bottomRow}>
        <span>{t('footerCopyright')}</span>
        <span>
          <a href="/admin" className={styles.adminLink}>{t('footerAdmin')}</a>
          <span>{t('footerLocation')}</span>
        </span>
      </div>
    </footer>
  );
}
