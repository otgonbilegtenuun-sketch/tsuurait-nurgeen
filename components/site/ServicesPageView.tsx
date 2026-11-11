'use client';

import { useState } from 'react';
import { services } from '@/lib/data/services';
import SiteHeader from './SiteHeader';
import Services from './Services';
import SiteFooter from './SiteFooter';
import ContactModal from './ContactModal';
import styles from './ServicesPageView.module.css';

export default function ServicesPageView() {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <>
      <div className={styles.top}>
        <SiteHeader onContactClick={() => setFormOpen(true)} current="services" />
      </div>
      <main className={styles.main}>
        <Services services={services} />
      </main>
      <SiteFooter onContactClick={() => setFormOpen(true)} />
      <ContactModal open={formOpen} onClose={() => setFormOpen(false)} />
    </>
  );
}
