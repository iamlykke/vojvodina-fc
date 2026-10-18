import type { Localized } from './i18n';

/** P = pobeda, N = nerešeno, I = izgubljeno */
export type Result = 'P' | 'N' | 'I';

export type Match = {
  home: string;
  away: string;
  /** ISO kickoff with offset, e.g. 2026-10-24T17:00:00+02:00 */
  kickoff: string;
  competition: Localized;
  round: Localized;
  venue: Localized;
  broadcaster?: string;
  homeCrest?: string;
  awayCrest?: string;
};

export type PlayedMatch = { round: Localized; home: string; away: string; score: string };

export type Fixture = {
  /** "01.11." */
  date: string;
  day: Localized;
  time: string;
  competition: Localized;
  home: string;
  away: string;
  venue: Localized;
};

export type StandingRow = {
  club: string;
  u: number;
  p?: number;
  n?: number;
  i?: number;
  g?: string;
  gr: number;
  b: number;
  form?: Result[];
};

export type Article = {
  slug: string;
  category: Localized;
  /** "17.10.2026." */
  date: string;
  title: Localized;
  excerpt?: Localized;
  image?: string;
  imageLabel: Localized;
};

export type Product = {
  slug: string;
  name: Localized;
  /** RSD */
  price: number;
  isNew?: boolean;
  image?: string;
  imageLabel: Localized;
};
