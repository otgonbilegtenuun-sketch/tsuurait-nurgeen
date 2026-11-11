'use client';

import { useMemo, useState } from 'react';
import { projects, works, team } from '@/lib/data/projects';
import { certificates } from '@/lib/data/certificates';
import { news } from '@/lib/data/news';

import Hero from '@/components/site/Hero';
import NewsSection from '@/components/site/NewsSection';
import AboutBanner from '@/components/site/AboutBanner';
import PartnersSection from '@/components/site/PartnersSection';
import CertificatesSection from '@/components/site/CertificatesSection';
import ProjectsTimeline from '@/components/site/ProjectsTimeline';
import WorksMarquee from '@/components/site/WorksMarquee';
import SiteFooter from '@/components/site/SiteFooter';
import ContactModal from '@/components/site/ContactModal';

export default function SiteExperience() {
  const [formOpen, setFormOpen] = useState(false);

  const openForm = () => setFormOpen(true);
  const closeForm = () => setFormOpen(false);

  const worksLoop = useMemo(() => [...works, ...works], []);
  const worksLoop2 = useMemo(
    () => [...works.slice(6), ...works.slice(0, 6), ...works.slice(6), ...works.slice(0, 6)],
    []
  );

  return (
    <>
      <Hero team={team} onContactClick={openForm} />
      <NewsSection news={news} />
      <AboutBanner />
      <PartnersSection />
      <CertificatesSection certificates={certificates} />
      <ProjectsTimeline projects={projects} />
      <WorksMarquee worksLoop={worksLoop} worksLoop2={worksLoop2} marqueeDur="60s" marqueeDur2="75s" />
      <SiteFooter onContactClick={openForm} />

      <ContactModal open={formOpen} onClose={closeForm} />
    </>
  );
}
