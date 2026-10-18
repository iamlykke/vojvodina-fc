import type { ReactNode } from 'react';
import { Button } from '@/components/core/Button';
import { Countdown } from './Countdown';
import styles from './MatchHero.module.css';

function Crest({ src, label }: { src?: string; label: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  if (src) return <img src={src} alt="" className={styles.crest} />;
  return <div className={`${styles.crest} ${styles.crestSlot}`} aria-hidden>{label}</div>;
}

export interface MatchHeroProps {
  eyebrow: string;
  /** shorter eyebrow for phones */
  eyebrowShort?: string;
  home: string;
  away: string;
  homeCrest?: string;
  awayCrest?: string;
  /** "Subota, 24. oktobar · 17:00" */
  date: string;
  /** "Sub, 24. okt · 17:00" (mobile) */
  dateShort?: string;
  /** "Stadion „Čair“, Niš · TV Arena Sport 1" */
  venue: string;
  /** ISO kickoff for the live countdown */
  kickoff?: string;
  countdown?: { days: number; hours: number; minutes: number };
  countdownLabels?: [string, string, string];
  countdownIn?: string;
  countdownUnits?: [string, string];
  liveLabel?: string;
  ticketsHref?: string;
  previewHref?: string | null;
  ticketsLabel?: string;
  previewLabel?: string;
  homeLabel?: string;
  awayLabel?: string;
  crestLabel?: string;
  /** right rail (league table) */
  rail?: ReactNode;
}

/** Dark first screen for the next match: huge team names, date/venue, countdown and ticket CTA. */
export function MatchHero({
  eyebrow, eyebrowShort, home, away, homeCrest, awayCrest, date, dateShort, venue, kickoff, countdown,
  countdownLabels, countdownIn, countdownUnits, liveLabel, ticketsHref = '#', previewHref = '#',
  ticketsLabel = 'Kupi ulaznicu', previewLabel = 'Najava', homeLabel = 'DOMAĆIN', awayLabel = 'GOST', crestLabel = 'grb', rail,
}: MatchHeroProps) {
  const team = (name: string, crest: string | undefined, label: string, right?: boolean) => (
    <div className={`${styles.team} ${right ? styles.right : ''}`}>
      <Crest src={crest} label={crestLabel} />
      <div className={styles.name}>{name}</div>
      <div className={styles.role}>{label}</div>
    </div>
  );

  return (
    <section className={`${styles.hero} on-ink`} aria-labelledby="next-match">
      <div className={`container ${styles.grid}`}>
        <div className={styles.match}>
          <h2 id="next-match" className={styles.eyebrow}>
            <span className={styles.dot} aria-hidden />
            <span className={styles.eyebrowLong}>{eyebrow}</span>
            <span className={styles.eyebrowShort}>{eyebrowShort ?? eyebrow}</span>
          </h2>

          <div className={styles.teams}>
            {team(home, homeCrest, homeLabel)}
            <div className={styles.vs}>vs</div>
            {team(away, awayCrest, awayLabel, true)}
          </div>

          <div className={styles.info}>
            <div className={styles.when}>
              <div className={styles.date}>
                <span className={styles.dateLong}>{date}</span>
                <span className={styles.dateShort}>{dateShort ?? date}</span>
              </div>
              <div className={styles.venue}>
                {venue}
                {kickoff && (
                  <span className={styles.inlineCountdown}>
                    {' · '}
                    <Countdown target={kickoff} variant="inline" inLabel={countdownIn} units={countdownUnits} liveLabel={liveLabel} />
                  </span>
                )}
              </div>
            </div>
            <div className={styles.countdown}>
              <Countdown target={kickoff} {...countdown} labels={countdownLabels} liveLabel={liveLabel} />
            </div>
            <div className={styles.actions}>
              <Button href={ticketsHref} className={styles.tickets}>{ticketsLabel}</Button>
              {previewHref !== null && <Button href={previewHref} variant="outline-inverse" className={styles.preview}>{previewLabel}</Button>}
            </div>
          </div>
        </div>

        {rail && <div className={styles.rail}>{rail}</div>}
      </div>
    </section>
  );
}
