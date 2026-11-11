'use client';

import { useState, type FormEvent } from 'react';
import { projects } from '@/lib/data/projects';
import { news } from '@/lib/data/news';
import { certificates } from '@/lib/data/certificates';
import { services } from '@/lib/data/services';
import styles from './page.module.css';

type Tab = 'services' | 'projects' | 'news' | 'certificates' | 'messages';

const TABS: { key: Tab; label: string }[] = [
  { key: 'services', label: 'Үйл ажиллагаа' },
  { key: 'projects', label: 'Бүтээн байгуулалт' },
  { key: 'news', label: 'Мэдээ' },
  { key: 'certificates', label: 'Гэрчилгээ' },
  { key: 'messages', label: 'Санал хүсэлт' },
];

const COMING_SOON_TITLE = 'Удахгүй — өгөгдлийн сантай холбогдсоны дараа идэвхжинэ';

// DEMO ONLY — replace with real auth (NextAuth/Supabase Auth) once backend is wired up
const DEMO_PASSWORD = 'tsuurait2026';

function truncate(text: string, max = 60) {
  return text.length > max ? `${text.slice(0, max)}…` : text;
}

export default function AdminPage() {
  const [locked, setLocked] = useState(true);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [tab, setTab] = useState<Tab>('services');

  function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // DEMO ONLY — replace with real auth (NextAuth/Supabase Auth) once backend is wired up
    if (password === DEMO_PASSWORD) {
      setLocked(false);
      setError(false);
      setPassword('');
    } else {
      setError(true);
    }
  }

  function handleLogout() {
    setLocked(true);
    setPassword('');
    setError(false);
  }

  if (locked) {
    return (
      <main className={styles.loginWrap}>
        <form className={styles.loginCard} onSubmit={handleLogin}>
          <h1 className={styles.loginTitle}>Админ нэвтрэлт</h1>
          <input
            className={styles.input}
            type="password"
            placeholder="••••••"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) setError(false);
            }}
            autoComplete="current-password"
          />
          {error && <p className={styles.error}>Нууц үг буруу байна.</p>}
          <button type="submit" className={styles.primaryButton}>
            Нэвтрэх
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className={styles.dashboard}>
      <header className={styles.topBar}>
        <h1 className={styles.heading}>Админ самбар</h1>
        <button type="button" className={styles.logoutButton} onClick={handleLogout}>
          Гарах
        </button>
      </header>

      <nav className={styles.tabs} aria-label="Админ хэсгүүд">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            className={`${styles.tab} ${tab === t.key ? styles.tabActive : ''}`}
            aria-pressed={tab === t.key}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <section className={styles.panel}>
        {tab === 'services' && (
          <>
            <div className={styles.panelHeader}>
              <span className={styles.panelTitle}>Үйл ажиллагааны чиглэл ({services.length})</span>
            </div>
            <ul className={styles.list}>
              {services.map((sv) => (
                <li key={sv.slug} className={styles.row}>
                  <div className={styles.rowMain}>
                    <span className={styles.year}>{sv.sub}</span>
                    <span className={styles.rowText}>{sv.title}</span>
                  </div>
                  <div className={styles.actions}>
                    <button
                      type="button"
                      className={styles.actionButton}
                      disabled
                      title={COMING_SOON_TITLE}
                    >
                      Мэдээлэл нэмэх
                    </button>
                    <button
                      type="button"
                      className={styles.actionButton}
                      disabled
                      title={COMING_SOON_TITLE}
                    >
                      Засах
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}

        {tab === 'projects' && (
          <>
            <div className={styles.panelHeader}>
              <span className={styles.panelTitle}>Бүтээн байгуулалт</span>
            </div>
            <ul className={styles.list}>
              {projects.map((p, i) => (
                <li key={`${p.year}-${i}`} className={styles.row}>
                  <div className={styles.rowMain}>
                    <span className={styles.year}>{p.year}</span>
                    <span className={styles.rowText}>{truncate(p.text)}</span>
                  </div>
                  <div className={styles.actions}>
                    <button
                      type="button"
                      className={styles.actionButton}
                      disabled
                      title={COMING_SOON_TITLE}
                    >
                      Засах
                    </button>
                    <button
                      type="button"
                      className={styles.actionButton}
                      disabled
                      title={COMING_SOON_TITLE}
                    >
                      Устгах
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}

        {tab === 'news' && (
          <>
            <div className={styles.panelHeader}>
              <span className={styles.panelTitle}>Мэдээ</span>
              <button
                type="button"
                className={styles.actionButton}
                disabled
                title={COMING_SOON_TITLE}
              >
                Мэдээ нэмэх
              </button>
            </div>
            <ul className={styles.list}>
              {news.map((n, i) => (
                <li key={`${n.date}-${i}`} className={styles.row}>
                  <div className={styles.rowMain}>
                    <span className={styles.year}>{n.date}</span>
                    <span className={styles.rowText}>{n.title}</span>
                  </div>
                  <div className={styles.actions}>
                    <button
                      type="button"
                      className={styles.actionButton}
                      disabled
                      title={COMING_SOON_TITLE}
                    >
                      Засах
                    </button>
                    <button
                      type="button"
                      className={styles.actionButton}
                      disabled
                      title={COMING_SOON_TITLE}
                    >
                      Устгах
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}

        {tab === 'certificates' && (
          <>
            <div className={styles.panelHeader}>
              <span className={styles.panelTitle}>Гэрчилгээ</span>
              <button
                type="button"
                className={styles.actionButton}
                disabled
                title={COMING_SOON_TITLE}
              >
                Гэрчилгээ нэмэх
              </button>
            </div>
            <ul className={styles.list}>
              {certificates.map((c, i) => (
                <li key={`${c.title}-${i}`} className={styles.row}>
                  <div className={styles.rowMain}>
                    <span className={styles.year}>{c.issuer.split(' — ')[0]}</span>
                    <span className={styles.rowText}>{c.title}</span>
                  </div>
                  <div className={styles.actions}>
                    <button
                      type="button"
                      className={styles.actionButton}
                      disabled
                      title={COMING_SOON_TITLE}
                    >
                      Засах
                    </button>
                    <button
                      type="button"
                      className={styles.actionButton}
                      disabled
                      title={COMING_SOON_TITLE}
                    >
                      Устгах
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}

        {tab === 'messages' && (
          <p className={styles.placeholder}>
            Санал хүсэлт байхгүй байна. (Энэ хэсэг Supabase-тай холбогдсоны дараа идэвхжинэ.)
          </p>
        )}
      </section>
    </main>
  );
}
