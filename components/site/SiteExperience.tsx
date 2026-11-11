'use client';

import dynamic from 'next/dynamic';
import { useMemo, useRef, useState } from 'react';
import type { Hero3DHandle } from '@/lib/three/hero3d';
import { useProjectsTimeline } from '@/lib/hooks/useProjectsTimeline';
import { projects, works, team } from '@/lib/data/projects';
import { services } from '@/lib/data/services';
import { certificates } from '@/lib/data/certificates';
import { news } from '@/lib/data/news';
import { LanguageProvider } from '@/lib/i18n/LanguageContext';
import type { TimelineItem, Tick } from '@/lib/types/site';

import Hero from '@/components/site/Hero';
import AboutBanner from '@/components/site/AboutBanner';
import Services from '@/components/site/Services';
import PartnersSection from '@/components/site/PartnersSection';
import CertificatesSection from '@/components/site/CertificatesSection';
import EngineeringSection from '@/components/site/EngineeringSection';
import ProjectsTimeline from '@/components/site/ProjectsTimeline';
import WorksMarquee from '@/components/site/WorksMarquee';
import NewsSection from '@/components/site/NewsSection';
import SiteFooter from '@/components/site/SiteFooter';
import ContactModal from '@/components/site/ContactModal';

const HeroCanvas = dynamic(() => import('@/components/three/HeroCanvas'), { ssr: false });

const STEP_HEIGHT_VH = 70;

export default function SiteExperience() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const heroHandleRef = useRef<Hero3DHandle | null>(null);

  const { active, progress } = useProjectsTimeline(trackRef, heroRef, heroHandleRef, projects.length);
  const [formOpen, setFormOpen] = useState(false);

  const openForm = () => setFormOpen(true);
  const closeForm = () => setFormOpen(false);

  const n = projects.length;

  const items: TimelineItem[] = useMemo(
    () =>
      projects.map((p, i) => {
        const d = i - active;
        const on = d === 0;
        return {
          ...p,
          op: on ? 1 : 0,
          ty: on ? '0px' : d < 0 ? '-40px' : '40px',
          iy: on ? '0%' : d < 0 ? '-4%' : '4%',
          sc: on ? 1 : 1.08,
          pe: on ? 'auto' : 'none',
        };
      }),
    [active]
  );

  const ticks: Tick[] = useMemo(() => {
    const yearsSeen: string[] = [];
    projects.forEach((p) => {
      const y = p.year.split('–')[0];
      if (!yearsSeen.includes(y)) yearsSeen.push(y);
    });
    const activeYearNum = Number(projects[active]?.year.split('–')[0] ?? '0');
    return yearsSeen.map((y) => ({
      y,
      color:
        Number(y) === activeYearNum
          ? '#1F6FC4'
          : Number(y) < activeYearNum
            ? 'rgba(15,76,129,.6)'
            : 'rgba(15,76,129,.3)',
    }));
  }, [active]);

  const pad = (x: number) => String(x).padStart(2, '0');
  const activeYear = n ? projects[active].year : ''; // suffix ("он") is appended by ProjectsTimeline via t()
  const counter = n ? `${pad(active + 1)} / ${pad(n)}` : '';
  const progressPct = n ? `${((active + 1) / n) * 100}%` : '0%';
  const trackHeight = `${Math.max(2, n) * STEP_HEIGHT_VH}vh`;

  const worksLoop = useMemo(() => [...works, ...works], []);
  const worksLoop2 = useMemo(
    () => [...works.slice(6), ...works.slice(0, 6), ...works.slice(6), ...works.slice(0, 6)],
    []
  );

  return (
    <LanguageProvider>
      <HeroCanvas
        onReady={(handle) => {
          heroHandleRef.current = handle;
        }}
        onDispose={() => {
          heroHandleRef.current = null;
        }}
      />
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(120% 80% at 10% 10%, rgba(46,134,222,0) 0%, rgba(46,134,222,.05) 70%, rgba(46,134,222,.1) 100%)',
        }}
      />

      <Hero innerRef={heroRef} team={team} onContactClick={openForm} />
      <AboutBanner />
      <Services services={services} />
      <PartnersSection />
      <CertificatesSection certificates={certificates} />
      <EngineeringSection />
      <ProjectsTimeline
        trackRef={trackRef}
        trackHeight={trackHeight}
        counter={counter}
        items={items}
        activeYear={activeYear}
        progressPct={progressPct}
        ticks={ticks}
        progress={progress}
      />
      <WorksMarquee worksLoop={worksLoop} worksLoop2={worksLoop2} marqueeDur="60s" marqueeDur2="75s" />
      <NewsSection news={news} />
      <SiteFooter onContactClick={openForm} />

      <ContactModal open={formOpen} onClose={closeForm} />
    </LanguageProvider>
  );
}
