import Link from 'next/link';
import styles from './SectionHeader.module.css';

export interface SectionHeaderProps {
  title: string;
  /** "Sve vesti" — arrow is appended */
  link?: string;
  /** shorter link label for phones ("Sve") */
  linkShort?: string;
  href?: string;
  meta?: string;
  /** 3px ink underline (inner pages / sidebars) */
  rule?: boolean;
  size?: 'l' | 's';
  id?: string;
}

/** Section title row (VESTI, TABELA, ŠOP) with optional "Sve →" link. */
export function SectionHeader({ title, link, linkShort, href = '#', meta, rule = false, size = 'l', id }: SectionHeaderProps) {
  return (
    <div className={`${styles.header} ${rule ? styles.rule : ''} ${size === 's' ? styles.small : ''}`}>
      <h2 id={id} className={styles.title}>{title}</h2>
      {meta && <span className={styles.meta}>{meta}</span>}
      {link && (
        <Link href={href} className={styles.link}>
          {linkShort ? <><span className={styles.long}>{link}</span><span className={styles.short}>{linkShort}</span></> : link} →
        </Link>
      )}
    </div>
  );
}
