'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';
import styles from './LanguageToggle.module.css';

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div className={styles.toggle} role="group" aria-label="Language / Хэл сонгох">
      <button
        type="button"
        className={`${styles.option} ${lang === 'mn' ? styles.active : ''}`}
        onClick={() => setLang('mn')}
        aria-pressed={lang === 'mn'}
      >
        MN
      </button>
      <button
        type="button"
        className={`${styles.option} ${lang === 'en' ? styles.active : ''}`}
        onClick={() => setLang('en')}
        aria-pressed={lang === 'en'}
      >
        EN
      </button>
    </div>
  );
}
