import { FormGuide } from '@/components/core/FormBadge';
import { signed } from '@/lib/format';
import type { Lang } from '@/lib/i18n';
import type { StandingRow } from '@/lib/types';
import styles from './StandingsTable.module.css';

type Col = 'pos' | 'club' | 'u' | 'p' | 'n' | 'i' | 'g' | 'gr' | 'b' | 'form';

export interface StandingsTableProps {
  rows: StandingRow[];
  /** club name to highlight in red — always Vojvodina */
  highlight?: string;
  tone?: 'light' | 'dark';
  /** compact = home rail (#, club, U, GR, B); mini = mobile (#, club, GR, B); full = table page */
  columns?: 'compact' | 'mini' | 'full';
  labels?: Partial<Record<Col, string>>;
  /** display names (e.g. transliterated) keyed by club */
  names?: Record<string, string>;
  limit?: number;
  caption?: string;
  lang?: Lang;
}

const COLS: Record<NonNullable<StandingsTableProps['columns']>, Col[]> = {
  full: ['pos', 'club', 'u', 'p', 'n', 'i', 'g', 'gr', 'b', 'form'],
  compact: ['pos', 'club', 'u', 'gr', 'b'],
  mini: ['pos', 'club', 'gr', 'b'],
};

/** League table; the Vojvodina row is always solid red. */
export function StandingsTable({ rows, highlight = 'Vojvodina', tone = 'light', columns = 'compact', labels = {}, names = {}, limit, caption, lang }: StandingsTableProps) {
  const L: Record<Col, string> = { pos: '#', club: 'KLUB', u: 'U', p: 'P', n: 'N', i: 'I', g: 'GOLOVI', gr: 'GR', b: 'B', form: 'FORMA', ...labels };
  const cols = COLS[columns];
  const shown = limit ? rows.slice(0, limit) : rows;

  const cell = (k: Col, r: StandingRow, pos: number) => {
    if (k === 'pos') return pos;
    if (k === 'club') return names[r.club] ?? r.club;
    if (k === 'gr') return signed(r.gr);
    if (k === 'form') return <FormGuide results={r.form ?? []} onAccent={r.club === highlight} lang={lang} />;
    return r[k];
  };

  return (
    <table className={`${styles.table} ${styles[tone]} ${styles[columns]}`}>
      {caption && <caption className="visually-hidden">{caption}</caption>}
      <thead>
        <tr>{cols.map((k) => <th key={k} scope="col" className={styles[k]}>{L[k]}</th>)}</tr>
      </thead>
      <tbody>
        {shown.map((r, idx) => (
          <tr key={r.club} className={r.club === highlight ? styles.highlight : undefined}>
            {cols.map((k) => <td key={k} className={styles[k]}>{cell(k, r, idx + 1)}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
