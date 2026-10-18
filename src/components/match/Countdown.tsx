'use client';

import { useSyncExternalStore } from 'react';
import styles from './Countdown.module.css';

const MINUTE = 60_000;

/** Current minute as a store; null on the server so prerendered HTML never bakes in a stale time. */
function subscribe(onChange: () => void) {
  let interval: ReturnType<typeof setInterval> | undefined;
  const timeout = setTimeout(() => {
    onChange();
    interval = setInterval(onChange, MINUTE);
  }, MINUTE - (Date.now() % MINUTE));
  return () => { clearTimeout(timeout); clearInterval(interval); };
}
const getMinute = () => Math.floor(Date.now() / MINUTE);
const getServerMinute = () => null;

function remaining(target: string, minute: number | null) {
  if (minute === null) return null;
  const diff = Date.parse(target) - minute * MINUTE;
  const mins = Math.max(0, Math.floor(diff / MINUTE));
  return { days: Math.floor(mins / 1440), hours: Math.floor((mins % 1440) / 60), minutes: mins % 60, done: diff <= 0 };
}

export interface CountdownProps {
  /** ISO kickoff; when given the countdown ticks every minute */
  target?: string;
  days?: number;
  hours?: number;
  minutes?: number;
  labels?: [string, string, string];
  tone?: 'dark' | 'light';
  /** boxes = home hero; inline = "za 6 d 2 h" (mobile hero) */
  variant?: 'boxes' | 'inline';
  /** shown when kickoff is reached */
  liveLabel?: string;
  inLabel?: string;
  units?: [string, string];
}

const pad = (n: number) => String(n).padStart(2, '0');

/** Kickoff countdown in tabular condensed figures; shows "UŽIVO" once the match starts. */
export function Countdown({
  target, days = 0, hours = 0, minutes = 0, labels = ['DANA', 'SATA', 'MIN'], tone = 'dark',
  variant = 'boxes', liveLabel = 'UŽIVO', inLabel = 'za', units = ['d', 'h'],
}: CountdownProps) {
  const minute = useSyncExternalStore(subscribe, getMinute, getServerMinute);
  const left = target ? remaining(target, minute) : { days, hours, minutes, done: false };

  if (left?.done) {
    return <span className={styles.live}><span className={styles.dot} aria-hidden />{liveLabel}</span>;
  }

  if (variant === 'inline') {
    if (!left) return null;
    return <span className="tabular">{inLabel} {left.days} {units[0]} {left.hours} {units[1]}</span>;
  }

  const values = left ? [left.days, left.hours, left.minutes] : [null, null, null];
  return (
    <div className={`${styles.boxes} ${tone === 'light' ? styles.light : ''}`} role="timer" aria-live="off">
      {values.map((v, i) => (
        <div key={i} className={styles.box}>
          <div className={styles.value}>{v === null ? '––' : pad(v)}</div>
          <div className={styles.label}>{labels[i]}</div>
        </div>
      ))}
    </div>
  );
}
