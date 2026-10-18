import Link from 'next/link';
import { getDictionary } from '@/lib/dictionary';
import type { Lang } from '@/lib/i18n';
import { getNav } from '@/lib/nav';
import styles from './SiteFooter.module.css';

export interface SiteFooterProps {
  lang?: Lang;
}

/** Ink footer with stripe band, contact block and full sitemap (same 8 groups as the mega-menu). */
export function SiteFooter({ lang = 'lat' }: SiteFooterProps) {
  const t = getDictionary(lang);
  return (
    <footer className={`${styles.footer} on-ink`}>
      <div className={styles.stripes} aria-hidden />
      <div className={`container ${styles.inner}`}>
        <div className={styles.grid}>
          <div className={styles.contact}>
            <div className={styles.wordmark}>FK VOJVODINA</div>
            <p className={styles.about}>{t.footerAbout}</p>
          </div>
          {getNav(lang).map((g) => (
            <nav key={g.href} aria-label={g.label}>
              <Link href={g.href} className={styles.groupTitle}>{g.label}</Link>
              <ul>
                {g.items.map((it) => <li key={it.href}><Link href={it.href}>{it.label}</Link></li>)}
              </ul>
            </nav>
          ))}
        </div>
        <div className={styles.bottom}>
          <span>{t.disclaimer}</span>
          <span>
            <Link href={`/${lang}/partneri`}>{t.partners}</Link> · <Link href={`/${lang}/privatnost`}>{t.privacy}</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
