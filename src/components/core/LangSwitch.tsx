'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LANG_COOKIE, swapLang, type Lang } from '@/lib/i18n';
import styles from './LangSwitch.module.css';

const LANGS: [Lang, string, string][] = [
  ['lat', 'LAT', 'Srpski (latinica)'],
  ['cir', 'ĆIR', 'Српски (ћирилица)'],
  ['en', 'EN', 'English'],
];

export interface LangSwitchProps {
  value?: Lang;
  /** dark = on ink header, light = on white header */
  tone?: 'dark' | 'light';
  /** s = header utility bar, l = full-width mobile menu row */
  size?: 's' | 'l';
  label?: string;
  onChange?: (lang: Lang) => void;
}

function remember(lang: Lang) {
  document.cookie = `${LANG_COOKIE}=${lang}; path=/; max-age=31536000; samesite=lax`;
}

/** Three-script language switch: navigates to the same path under another language and remembers the choice. */
export function LangSwitch({ value = 'lat', tone = 'dark', size = 's', label, onChange }: LangSwitchProps) {
  const pathname = usePathname() ?? '/';
  return (
    <nav aria-label={label} className={`${styles.switch} ${styles[size]} ${styles[tone]}`}>
      {LANGS.map(([code, short, full]) => (
        <Link
          key={code}
          href={swapLang(pathname, code)}
          hrefLang={code === 'en' ? 'en' : code === 'cir' ? 'sr-Cyrl' : 'sr-Latn'}
          aria-current={code === value ? 'true' : undefined}
          aria-label={full}
          className={`${styles.chip} ${code === value ? styles.on : ''}`}
          onClick={() => { remember(code); onChange?.(code); }}
        >
          {short}
        </Link>
      ))}
    </nav>
  );
}
