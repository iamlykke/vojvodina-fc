'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/core/Button';
import { LangSwitch } from '@/components/core/LangSwitch';
import type { Dictionary } from '@/lib/dictionary';
import type { Lang } from '@/lib/i18n';
import { SOCIALS, type NavGroupView } from '@/lib/nav';
import styles from './MobileMenu.module.css';

export interface MobileMenuProps {
  id: string;
  open: boolean;
  onClose: () => void;
  lang: Lang;
  nav: NavGroupView[];
  cartCount: number;
  t: Pick<Dictionary, 'account' | 'cart' | 'tickets' | 'menuClose' | 'language' | 'mainNav'>;
}

/** Full-screen ink menu: language row, accordion of the 8 groups, tickets CTA. */
export function MobileMenu({ id, open, onClose, lang, nav, cartCount, t }: MobileMenuProps) {
  const [expanded, setExpanded] = useState(-1);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  useEffect(() => { onCloseRef.current = onClose; }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onCloseRef.current(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div id={id} className={`${styles.menu} on-ink`} data-open={open ? '' : undefined} inert={!open} role="dialog" aria-modal="true" aria-label={t.mainNav}>
      <div className={styles.bar}>
        <Link href={`/${lang}`} className={styles.wordmark}>FK VOJVODINA</Link>
        <button ref={closeBtn} type="button" className={styles.close} aria-label={t.menuClose} onClick={onClose}>
          <span /><span />
        </button>
      </div>

      <div className={styles.langs}>
        <LangSwitch value={lang} size="l" label={t.language} />
      </div>

      <nav className={styles.groups} aria-label={t.mainNav}>
        {nav.map((g, k) => {
          const on = k === expanded;
          const panelId = `${id}-g${k}`;
          return (
            <div key={g.href} className={styles.group}>
              <button
                type="button"
                className={styles.groupBtn}
                aria-expanded={on}
                aria-controls={panelId}
                onClick={() => setExpanded(on ? -1 : k)}
              >
                {g.label}
                <span className={styles.sign} aria-hidden>{on ? '−' : '+'}</span>
              </button>
              <ul id={panelId} className={styles.links} hidden={!on}>
                {g.items.map((it) => <li key={it.href}><Link href={it.href}>{it.label}</Link></li>)}
              </ul>
            </div>
          );
        })}
      </nav>

      <div className={styles.footer}>
        <Button href={`/${lang}/ulaznice`} block>{t.tickets}</Button>
        <div className={styles.meta}>
          <Link href={`/${lang}/nalog`}>{t.account}</Link>
          <Link href={`/${lang}/korpa`}>{t.cart} ({cartCount})</Link>
          <span>
            {SOCIALS.slice(0, 3).map((s, k) => (
              <span key={s.label}>{k > 0 && ' · '}<a href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a></span>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}
