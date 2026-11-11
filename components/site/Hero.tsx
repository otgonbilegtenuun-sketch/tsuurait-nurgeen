'use client';

import type { PointerEvent as ReactPointerEvent, RefObject } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import LanguageToggle from './LanguageToggle';
import styles from './Hero.module.css';

type TeamStat = { n: number; label: string };

const TEAM_LABEL_EN: Record<string, string> = {
  'Инженер': 'Engineers',
  'Гагнуурчин': 'Welders',
  'Сантехникч': 'Plumbers',
  'Туслах ажилтан': 'Support staff',
};

export default function Hero({
  innerRef,
  team,
  onContactClick,
}: {
  innerRef: RefObject<HTMLElement | null>;
  team: TeamStat[];
  onContactClick: () => void;
}) {
  const { t, lang } = useLanguage();

  // Forwards drag activity to the Hero 3D scene (lib/three/hero3d.ts) via
  // window CustomEvents — see the note in hero3d.ts for why this indirection
  // exists instead of the canvas listening for its own pointer events.
  const dispatchDrag = (type: 'start' | 'move' | 'end', e?: ReactPointerEvent) => {
    window.dispatchEvent(
      new CustomEvent(`tn-hero-drag-${type}`, {
        detail: e ? { clientX: e.clientX, clientY: e.clientY } : undefined,
      })
    );
  };

  return (
    <section ref={innerRef} data-screen-label="Hero" className={styles.section}>
      <header className={styles.header}>
        <div className={styles.logoPill}>
          <div className={styles.logoBadge}>
            <img src="/img/logo.png" alt="Tsuurait Nurgeen" className={styles.logo} />
          </div>
          <div className={styles.companyName}>{t('companyName')}</div>
        </div>
        <nav className={styles.nav}>
          <LanguageToggle />
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
        </nav>
      </header>

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

        <div className={styles.aboutCol}>
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

      {/* Invisible hit-zone over the 3D tank model — see dispatchDrag above. */}
      <div
        className={styles.dragZone}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          dispatchDrag('start', e);
        }}
        onPointerMove={(e) => {
          if (e.buttons === 1) dispatchDrag('move', e);
        }}
        onPointerUp={() => dispatchDrag('end')}
        onPointerCancel={() => dispatchDrag('end')}
        aria-hidden="true"
      />
    </section>
  );
}
