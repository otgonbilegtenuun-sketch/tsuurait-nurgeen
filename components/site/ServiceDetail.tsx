'use client';

import { partner } from '@/lib/design/tokens';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import type { Service } from '@/lib/data/services';
import type { Project } from '@/lib/data/projects';
import type { Certificate } from '@/lib/data/certificates';
import styles from './ServiceDetail.module.css';

const SHAPES = [
  { src: '/img/tank-shapes/l-shape.png', key: 'tankShapeL' },
  { src: '/img/tank-shapes/u-shape.png', key: 'tankShapeU' },
  { src: '/img/tank-shapes/narrow-space.png', key: 'tankShapeNarrow' },
  { src: '/img/tank-shapes/low-ceiling.png', key: 'tankShapeLow' },
] as const;

const startYear = (p: Project) => Number(p.year.split('–')[0]);

export function relatedWorks(service: Service, projects: Project[], limit = 4) {
  return projects
    .map((p, i) => ({ p, i }))
    .filter(({ p }) => service.keywords.some((k) => p.text.toLowerCase().includes(k)))
    .sort((a, b) => startYear(b.p) - startYear(a.p) || b.i - a.i)
    .slice(0, limit)
    .map(({ p }) => p);
}

export default function ServiceDetail({
  service,
  projects,
  certificates,
  onContactClick,
}: {
  service: Service;
  projects: Project[];
  certificates: Certificate[];
  onContactClick: () => void;
}) {
  const { t, lang } = useLanguage();
  const works = relatedWorks(service, projects);
  const isTank = service.slug === 'clean-water-tank';
  const suffix = t('timelineYearSuffix');

  return (
    <div className={styles.detail}>
      <div className={styles.main}>
        <p className={styles.lead}>{service.body[lang]}</p>

        {isTank && (
          <>
            <div className={styles.blockTitle}>{t('svcShapes')}</div>
            <div className={styles.shapes}>
              {SHAPES.map((s) => (
                <figure key={s.key} className={styles.shape}>
                  <div className={styles.shapeImage}>
                    <img src={s.src} alt={t(s.key)} loading="lazy" />
                  </div>
                  <figcaption>{t(s.key)}</figcaption>
                </figure>
              ))}
            </div>

            <div className={styles.blockTitle}>{t('svcCerts')}</div>
            <ul className={styles.certs}>
              {certificates.map((c) => (
                <li key={c.title}>
                  <span className={styles.certTitle}>{c.title}</span>
                  <span className={styles.certIssuer}>{c.issuer.split(' — ')[0]}</span>
                </li>
              ))}
            </ul>
            <a className={styles.textLink} href="#certificates">
              {t('svcAllCerts')} →
            </a>
          </>
        )}

        <div className={styles.actions}>
          <button type="button" className={styles.cta} onClick={onContactClick}>
            {t('footerCta')}
          </button>
          {isTank && (
            <a className={styles.textLink} href={partner.websiteUrl} target="_blank" rel="noopener noreferrer">
              {t('svcPartnerSite')} ↗
            </a>
          )}
        </div>
      </div>

      <aside className={styles.side}>
        <div className={styles.blockTitle}>{t('svcWorks')}</div>
        {works.length === 0 ? (
          <p className={styles.empty}>{t('svcWorksEmpty')}</p>
        ) : (
          <ul className={styles.works}>
            {works.map((p, i) => (
              <li key={i} className={styles.work}>
                <img src={p.img} alt="" loading="lazy" />
                <div>
                  <div className={styles.workYear}>
                    {p.year}
                    {suffix ? ` ${suffix}` : ''}
                  </div>
                  <div className={styles.workText}>{p.text}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
        <a className={styles.textLink} href="#projects">
          {t('svcAllWorks')} →
        </a>
      </aside>
    </div>
  );
}
