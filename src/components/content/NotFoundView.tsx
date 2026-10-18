import Link from 'next/link';
import { Button } from '@/components/core/Button';
import { getDictionary } from '@/lib/dictionary';
import { tri, type Lang, type Tri } from '@/lib/i18n';
import styles from './NotFoundView.module.css';

const SUGGESTIONS: { l: Tri; path: string }[] = [
  { l: ['Ulaznice', 'Улазнице', 'Tickets'], path: '/ulaznice' },
  { l: ['Raspored utakmica', 'Распоред утакмица', 'Match schedule'], path: '/prvi-tim/raspored' },
  { l: ['Rezultati i tabela', 'Резултати и табела', 'Scores & table'], path: '/prvi-tim/tabela' },
  { l: ['Vesti', 'Вести', 'News'], path: '/vesti' },
  { l: ['Igrači', 'Играчи', 'Players'], path: '/prvi-tim' },
  { l: ['Šop', 'Шоп', 'Shop'], path: '/sop' },
];

/** 404 content: ink head (PageHero pattern) + suggested links on paper. */
export function NotFoundView({ lang }: { lang: Lang }) {
  const t = getDictionary(lang);
  return (
    <>
      <section className={`${styles.hero} on-ink`}>
        <div className={`container ${styles.heroInner}`}>
          <nav className={styles.crumb} aria-label="Breadcrumb">
            <Link href={`/${lang}`}>{t.homeCrumb}</Link> / 404
          </nav>
          <div className={styles.grid}>
            <div>
              <div className={styles.code} aria-hidden>404</div>
              <h1 className={styles.title}>{t.notFoundTitle}</h1>
            </div>
            <div className={styles.aside}>
              <p className={styles.text}>{t.notFoundText}</p>
              <div className={styles.actions}>
                <Button href={`/${lang}`}>{t.backHome}</Button>
                <Button href={`/${lang}/vesti`} variant="outline-inverse">{t.allNews}</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`container ${styles.more}`} aria-labelledby="nf-more">
        <h2 id="nf-more" className={styles.moreTitle}>{t.maybeLooking}</h2>
        <ul className={styles.links}>
          {SUGGESTIONS.map((s) => (
            <li key={s.path}>
              <Link href={`/${lang}${s.path}`} className={styles.link}>
                <span>{tri(s.l, lang)}</span>
                <span aria-hidden>→</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
