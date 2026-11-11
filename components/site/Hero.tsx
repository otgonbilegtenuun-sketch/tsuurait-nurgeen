'use client';

import dynamic from 'next/dynamic';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import SiteHeader from './SiteHeader';
import styles from './Hero.module.css';

const TankShowcase = dynamic(() => import('@/components/three/TankShowcase'), { ssr: false });

type TeamStat = { n: number; label: string };

const TEAM_LABEL_EN: Record<string, string> = {
  'Инженер': 'Engineers',
  'Гагнуурчин': 'Welders',
  'Сантехникч': 'Plumbers',
  'Туслах ажилтан': 'Support staff',
};

export default function Hero({
  team,
  onContactClick,
}: {
  team: TeamStat[];
  onContactClick: () => void;
}) {
  const { t, lang } = useLanguage();

  return (
    <section data-screen-label="Hero" className={styles.section}>
      <SiteHeader onContactClick={onContactClick} />

      <div className={styles.content}>
        <div className={styles.textCol}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            <span>{t('heroEyebrow')}</span>
          </div>
          <h1 className={styles.title}>
            {t('heroTitleLine1')}
            <br />
            <span className={styles.titleOutline}>{t('heroTitleLine2')}</span>
          </h1>
          <div className={styles.subtitleRow}>
            <span>{t('heroSubtitle')}</span>
            <span className={styles.subtitleBar} />
          </div>
          <div className={styles.tagRow}>
            <span>{t('heroTag1')}</span>
            <span className={styles.tagDot}>•</span>
            <span>{t('heroTag2')}</span>
            <span className={styles.tagDot}>•</span>
            <span>{t('heroTag3')}</span>
          </div>
          <p className={styles.intro}>{t('heroIntro')}</p>
        </div>

        <div className={styles.tankCol}>
          <div className={styles.tankBox}>
            <TankShowcase />
            <div className={styles.tankLabel}>{t('tankLabel')}</div>
          </div>

          {/* Technical drawing sits directly under the 3D tank. Replace
              public/img/blueprint-diagram.jpg to change it. */}
          <figure className={styles.blueprint}>
            <div className={styles.blueprintImage}>
              <img src="/img/blueprint-diagram.jpg" alt={t('engineeringHeading')} />
            </div>
            <figcaption className={styles.blueprintCaption}>
              <span className={styles.blueprintEyebrow}>{t('engineeringEyebrow')}</span>
              <span>{t('engineeringHeading')}</span>
            </figcaption>
          </figure>
        </div>
      </div>

      <div className={styles.teamBar}>
        <div className={styles.teamLabel}>
          <span className={styles.teamPulse} />
          {t('teamBarLabel')}
        </div>
        <div className={styles.teamList}>
          {team.map((tItem) => (
            <div key={tItem.label} className={styles.teamItem}>
              <span className={styles.teamNum}>{tItem.n}</span>
              <span className={styles.teamLabelSmall}>
                {lang === 'en' ? TEAM_LABEL_EN[tItem.label] ?? tItem.label : tItem.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
