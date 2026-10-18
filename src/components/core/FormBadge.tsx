import { LANG_INDEX, type Lang } from '@/lib/i18n';
import type { Result } from '@/lib/types';
import styles from './FormBadge.module.css';

const LETTER: Record<Result, readonly [string, string, string]> = { P: ['P', 'П', 'W'], N: ['N', 'Н', 'D'], I: ['I', 'И', 'L'] };
const TITLE: Record<Result, readonly [string, string, string]> = {
  P: ['Pobeda', 'Победа', 'Win'],
  N: ['Nerešeno', 'Нерешено', 'Draw'],
  I: ['Poraz', 'Пораз', 'Loss'],
};
const CLS: Record<Result, string> = { P: styles.win, N: styles.draw, I: styles.loss };

export interface FormBadgeProps {
  /** P = pobeda, N = nerešeno, I = izgubljeno (EN: W/D/L) */
  result: Result;
  /** on red surfaces: white square, green/grey/red letter */
  onAccent?: boolean;
  size?: number;
  lang?: Lang;
}

/** Single-letter form square. */
export function FormBadge({ result, onAccent = false, size = 22, lang = 'lat' }: FormBadgeProps) {
  const i = LANG_INDEX[lang];
  return (
    <span
      className={`${styles.badge} ${CLS[result]} ${onAccent ? styles.onAccent : ''}`}
      style={size !== 22 ? { width: size, height: size } : undefined}
      title={TITLE[result][i]}
    >
      <span aria-hidden>{LETTER[result][i]}</span>
      <span className="visually-hidden">{TITLE[result][i]}</span>
    </span>
  );
}

/** The last five results. */
export function FormGuide({ results = [], onAccent, lang }: { results?: Result[]; onAccent?: boolean; lang?: Lang }) {
  return (
    <span className={styles.guide}>
      {results.map((r, i) => <FormBadge key={i} result={r} onAccent={onAccent} lang={lang} />)}
    </span>
  );
}
