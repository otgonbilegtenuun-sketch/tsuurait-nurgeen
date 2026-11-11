'use client';

import { partner } from '@/lib/design/tokens';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import styles from './PartnersSection.module.css';

// Ported from the live site's "Хамтрагч байгууллага" section — this was missing
// from the original design handoff zip (an older prototype revision) but exists
// on the deployed site. Source: https://tsuurait-nurgeen.vercel.app/ DOM + CSS.
export default function PartnersSection() {
  const { t } = useLanguage();
  return (
    <section className={styles.section} data-screen-label="Partners">
      <div className={styles.headerRow}>
        <div>
          <div className={styles.eyebrow}>{t('partnersEyebrow')}</div>
          <h2 className={styles.heading}>{t('partnersHeading')}</h2>
          <div className={styles.underline} />
        </div>
        <div className={styles.note}>{t('partnersNote')}</div>
      </div>

      <div className={styles.card}>
        <div className={styles.glow} aria-hidden="true" />

        <div className={styles.logos}>
          <div className={styles.logo}>
            <img src="/img/logo.png" alt="Цуурайт Нүргээн ХХК" />
          </div>
          <svg
            className={styles.handshake}
            width={52}
            height={52}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m11 17 2 2a1 1 0 1 0 3-3" />
            <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
            <path d="m21 3 1 11h-2" />
            <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
            <path d="M3 4h8" />
          </svg>
          <div className={styles.logo}>
            <img src={partner.logo} alt={partner.name} />
          </div>
        </div>

        <div className={styles.qrs}>
          <a
            className={styles.qrCard}
            href={partner.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={styles.qrFrame}>
              <img src={partner.websiteQr} alt={`${partner.websiteLabel} — QR код`} />
            </div>
            <div className={styles.qrLabel}>{partner.websiteLabel}</div>
            <div className={styles.qrHint}>{partner.websiteHint}</div>
          </a>
          <a
            className={styles.qrCard}
            href={partner.catalogUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={styles.qrFrame}>
              <img src={partner.catalogQr} alt={`${partner.catalogLabel} — QR код`} />
            </div>
            <div className={styles.qrLabel}>{partner.catalogLabel}</div>
            <div className={styles.qrHint}>{partner.catalogHint}</div>
          </a>
        </div>

        <div className={styles.shapesHeading}>{t('tankShapesHeading')}</div>
        <div className={styles.shapes}>
          <div className={styles.shapeCard}>
            <div className={styles.shapeImageFrame}>
              <img src="/img/tank-shapes/l-shape.png" alt={t('tankShapeL')} />
            </div>
            <div className={styles.shapeLabel}>{t('tankShapeL')}</div>
          </div>
          <div className={styles.shapeCard}>
            <div className={styles.shapeImageFrame}>
              <img src="/img/tank-shapes/u-shape.png" alt={t('tankShapeU')} />
            </div>
            <div className={styles.shapeLabel}>{t('tankShapeU')}</div>
          </div>
          <div className={styles.shapeCard}>
            <div className={styles.shapeImageFrame}>
              <img src="/img/tank-shapes/narrow-space.png" alt={t('tankShapeNarrow')} />
            </div>
            <div className={styles.shapeLabel}>{t('tankShapeNarrow')}</div>
          </div>
          <div className={styles.shapeCard}>
            <div className={styles.shapeImageFrame}>
              <img src="/img/tank-shapes/low-ceiling.png" alt={t('tankShapeLow')} />
            </div>
            <div className={styles.shapeLabel}>{t('tankShapeLow')}</div>
          </div>
        </div>

        <div className={styles.foot}>{t('partnersFoot')}</div>
      </div>
    </section>
  );
}
