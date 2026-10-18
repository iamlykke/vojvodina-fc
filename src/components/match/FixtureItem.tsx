import type { ReactNode } from 'react';
import styles from './FixtureItem.module.css';

export interface FixtureItemProps {
  /** "01.11." */
  date: string;
  /** "SUB" */
  day: string;
  time: string;
  competition: string;
  /** "Vojvodina – Partizan" (en dash) */
  match: string;
  venue: string;
  /** band = on the red strip under the hero; row = schedule list */
  layout?: 'band' | 'row';
  action?: ReactNode;
}

/** Upcoming fixture — on the red FixtureBand under the home hero, or as a row in schedule lists. */
export function FixtureItem({ date, day, time, competition, match, venue, layout = 'band', action }: FixtureItemProps) {
  if (layout === 'row') {
    return (
      <div className={styles.row}>
        <div className={styles.rowDate}><div className={styles.rowDay}>{date}</div><div className={styles.rowTime}>{day} · {time}</div></div>
        <div><div className={styles.rowMeta}>{competition} · {venue}</div><div className={styles.rowMatch}>{match}</div></div>
        {action}
      </div>
    );
  }
  return (
    <li className={styles.band}>
      <div className={styles.bandDate}>
        <div className={styles.bandDay}>{date}</div>
        <div className={styles.bandTime}>{day} · {time}</div>
      </div>
      <div className={styles.bandBody}>
        <div className={styles.bandComp}>{competition}</div>
        <div className={styles.bandMatch}>{match}</div>
        <div className={styles.bandVenue}>{venue}</div>
      </div>
      {/* phone layout: "01.11. · 19:00" + match */}
      <div className={styles.bandCompact}>
        <div className={styles.bandCompactMeta}>{date} · {time}</div>
        <div className={styles.bandCompactMatch}>{match}</div>
      </div>
    </li>
  );
}

export interface FixtureBandProps {
  /** e.g. "POSLEDNJA · 10. KOLO" */
  lastLabel: string;
  lastLabelShort: string;
  /** "Vojvodina 2:0 TSC" */
  lastResult: string;
  lastResultShort: string;
  form?: ReactNode;
  label?: string;
  children: ReactNode;
}

/** Full-bleed red band: last result + form, then the next three fixtures. Scrolls horizontally on phones. */
export function FixtureBand({ lastLabel, lastLabelShort, lastResult, lastResultShort, form, label, children }: FixtureBandProps) {
  return (
    <section className={styles.bandWrap} aria-label={label}>
      <div className={styles.bandGrid}>
        <div className={styles.last}>
          <div className={styles.lastLabel}><span className={styles.long}>{lastLabel}</span><span className={styles.short}>{lastLabelShort}</span></div>
          <div className={styles.lastResult}><span className={styles.long}>{lastResult}</span><span className={styles.short}>{lastResultShort}</span></div>
          {form && <div className={styles.form}>{form}</div>}
        </div>
        <ul className={styles.list}>{children}</ul>
      </div>
    </section>
  );
}
