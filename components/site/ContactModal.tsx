'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import styles from './ContactModal.module.css';

export default function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  if (!open) return null; // conditional render, matching the original sc-if

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(false);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, contact, message }),
      });
      if (!res.ok) throw new Error('failed');
      setSent(true);
      setName('');
      setContact('');
      setMessage('');
      setTimeout(() => {
        onClose();
        setSent(false);
      }, 2200);
    } catch {
      // keep the form open and filled so the user can retry
      setError(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <form
        className={styles.form}
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <div className={styles.headerRow}>
          <div>
            <div className={styles.eyebrow}>{t('modalEyebrow')}</div>
            <div className={styles.title}>{t('modalTitle')}</div>
          </div>
          <button type="button" className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        <label className={`${styles.field} ${styles.fieldLabel}`}>
          {t('modalNameLabel')}
          <input
            required
            placeholder={t('modalNamePlaceholder')}
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label className={`${styles.field} ${styles.fieldLabel}`}>
          {t('modalContactLabel')}
          <input
            required
            placeholder={t('modalContactPlaceholder')}
            className={styles.input}
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
        </label>

        <label className={`${styles.field} ${styles.fieldLabel}`}>
          {t('modalMessageLabel')}
          <textarea
            required
            rows={4}
            placeholder={t('modalMessagePlaceholder')}
            className={styles.textarea}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>

        {sent && (
          <div className={styles.sentMessage}>
            {t('modalSent')}
          </div>
        )}

        <button type="submit" className={styles.submitBtn} disabled={submitting}>
          {submitting ? t('modalSubmitting') : t('modalSubmit')}
        </button>

        {error && (
          <div className={styles.errorMessage}>
            {t('modalError')}
          </div>
        )}
      </form>
    </div>
  );
}
