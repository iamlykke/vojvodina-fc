'use client';

import { useEffect, useRef, useState } from 'react';
import { LangSwitch } from '@/components/core/LangSwitch';
import type { Lang } from '@/lib/i18n';
import styles from './MobileLangPicker.module.css';

const LANG_SHORT: Record<Lang, string> = { lat: 'LAT', cir: 'ĆIR', en: 'EN' };

/** Current-language label in the mobile header; tapping it opens the three-script switch. */
export function MobileLangPicker({ lang, label }: { lang: Lang; label: string }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={root} className={styles.root}>
      <button
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        aria-controls="mobile-lang"
        aria-label={`${label}: ${LANG_SHORT[lang]}`}
        onClick={() => setOpen((v) => !v)}
      >
        {LANG_SHORT[lang]}
        <span className={styles.chevron} data-open={open ? '' : undefined} aria-hidden />
      </button>
      <div id="mobile-lang" className={styles.popover} hidden={!open}>
        <LangSwitch value={lang} label={label} onChange={() => setOpen(false)} />
      </div>
    </div>
  );
}
