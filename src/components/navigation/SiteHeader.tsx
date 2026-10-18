'use client';

import Link from 'next/link';
import { useRef, useState, type KeyboardEvent } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/core/Button';
import { LangSwitch } from '@/components/core/LangSwitch';
import type { Dictionary } from '@/lib/dictionary';
import type { Lang } from '@/lib/i18n';
import { SOCIALS, type NavGroupView } from '@/lib/nav';
import { MegaMenu } from './MegaMenu';
import { MobileLangPicker } from './MobileLangPicker';
import { MobileMenu } from './MobileMenu';
import styles from './SiteHeader.module.css';

type HeaderStrings = Pick<Dictionary, 'wordmarkSub' | 'account' | 'cart' | 'tickets' | 'menuOpen' | 'menuClose' | 'language' | 'mainNav' | 'promoEyebrow' | 'promoTitle' | 'promoAction' | 'promoImage'>;

export interface SiteHeaderProps {
  lang: Lang;
  nav: NavGroupView[];
  t: HeaderStrings;
  /** current section (underlined when the menu is closed) */
  activeIndex?: number;
  /** official crest file. Omitted = wordmark only (never draw the crest). */
  crest?: string;
  cartCount?: number;
}

const MENU_ID = 'mega-menu';

/** Global ink header: utility bar + main bar with hover mega-menu; burger + full-screen menu below 1100px. */
export function SiteHeader({ lang, nav, t, activeIndex = -1, crest, cartCount = 0 }: SiteHeaderProps) {
  const [open, setOpen] = useState(-1);
  const [mobileOpen, setMobileOpen] = useState(false);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);
  const panel = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Close menus on navigation.
  const [prevPath, setPrevPath] = useState(pathname);
  if (pathname !== prevPath) {
    setPrevPath(pathname);
    setOpen(-1);
    setMobileOpen(false);
  }

  const close = (returnFocus = false) => {
    if (returnFocus && open >= 0) triggers.current[open]?.focus();
    setOpen(-1);
  };

  const focusColumn = (k: number) => {
    requestAnimationFrame(() => panel.current?.querySelector<HTMLAnchorElement>(`[data-col="${k}"] a`)?.focus());
  };

  const onTriggerKey = (e: KeyboardEvent<HTMLButtonElement>, k: number) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(k);
      focusColumn(k);
    }
  };

  const onHeaderKey = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Escape' && open >= 0) {
      e.preventDefault();
      close(true);
    }
  };

  // Keep focus inside the open panel.
  const onPanelKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Tab' || !panel.current) return;
    const links = panel.current.querySelectorAll<HTMLElement>('a[href]');
    const first = links[0];
    const last = links[links.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  };

  const isOpen = open >= 0;

  return (
    <>
      <header className={`${styles.header} on-ink`} onMouseLeave={() => setOpen(-1)} onKeyDown={onHeaderKey}>
        <div className={`container ${styles.utility}`}>
          <LangSwitch value={lang} label={t.language} />
          <div className={styles.utilityLinks}>
            <span className={styles.socials}>
              {SOCIALS.map((s, k) => (
                <span key={s.label}>{k > 0 && ' · '}<a href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a></span>
              ))}
            </span>
            <Link href={`/${lang}/nalog`}>{t.account}</Link>
            <Link href={`/${lang}/korpa`}>{t.cart} ({cartCount})</Link>
          </div>
        </div>

        <div className={styles.mainRule}>
          <div className={`container ${styles.main}`}>
            <Link href={`/${lang}`} className={styles.brand} aria-label="FK Vojvodina">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {crest ? <img src={crest} alt="" className={styles.crest} /> : null}
              <span className={styles.wordmark}>
                <span className={styles.wordmarkName}>FK VOJVODINA</span>
                <span className={styles.wordmarkSub}>{t.wordmarkSub}</span>
              </span>
            </Link>

            <nav className={styles.nav} aria-label={t.mainNav}>
              {nav.map((g, k) => (
                <button
                  key={g.href}
                  ref={(el) => { triggers.current[k] = el; }}
                  type="button"
                  className={styles.navItem}
                  data-active={k === open || (!isOpen && k === activeIndex) ? '' : undefined}
                  aria-expanded={k === open}
                  aria-controls={MENU_ID}
                  onMouseEnter={() => setOpen(k)}
                  onClick={() => setOpen(k === open ? -1 : k)}
                  onKeyDown={(e) => onTriggerKey(e, k)}
                >
                  {g.label}
                  <span className={styles.chevron} aria-hidden />
                </button>
              ))}
            </nav>

            <Button href={`/${lang}/ulaznice`} size="s" className={styles.cta}>{t.tickets}</Button>

            <MobileLangPicker lang={lang} label={t.language} />
            <button
              type="button"
              className={styles.burger}
              aria-label={t.menuOpen}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen(true)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>

        <div
          id={MENU_ID}
          ref={panel}
          className={styles.panel}
          data-open={isOpen ? '' : undefined}
          inert={!isOpen}
          onKeyDown={onPanelKey}
        >
          <MegaMenu
            groups={nav}
            activeIndex={open}
            promo={{ eyebrow: t.promoEyebrow, title: t.promoTitle, image: t.promoImage, action: t.promoAction, href: `/${lang}/ulaznice` }}
          />
        </div>
      </header>

      <div className={styles.scrim} data-open={isOpen ? '' : undefined} aria-hidden onClick={() => close()} />

      <MobileMenu
        id="mobile-menu"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        lang={lang}
        nav={nav}
        cartCount={cartCount}
        t={t}
      />
    </>
  );
}
