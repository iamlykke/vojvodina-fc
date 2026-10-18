import { toCyrillic, type Lang } from './i18n';

const TZ = 'Europe/Belgrade';

const WEEKDAYS = {
  lat: ['Nedelja', 'Ponedeljak', 'Utorak', 'Sreda', 'Četvrtak', 'Petak', 'Subota'],
  en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
};
const MONTHS = {
  lat: ['januar', 'februar', 'mart', 'april', 'maj', 'jun', 'jul', 'avgust', 'septembar', 'oktobar', 'novembar', 'decembar'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
};

function partsInBelgrade(iso: string) {
  const fmt = new Intl.DateTimeFormat('en-GB', {
    timeZone: TZ, year: 'numeric', month: 'numeric', day: 'numeric', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false,
  });
  const p = Object.fromEntries(fmt.formatToParts(new Date(iso)).map((x) => [x.type, x.value]));
  const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(p.weekday);
  return { day: Number(p.day), month: Number(p.month) - 1, weekday, time: `${p.hour}:${p.minute}` };
}

const script = (lang: Lang, s: string) => (lang === 'cir' ? toCyrillic(s) : s);

/** "Subota, 24. oktobar · 17:00" / "Saturday, 24 October · 17:00" */
export function formatKickoff(iso: string, lang: Lang): string {
  const { day, month, weekday, time } = partsInBelgrade(iso);
  if (lang === 'en') return `${WEEKDAYS.en[weekday]}, ${day} ${MONTHS.en[month]} · ${time}`;
  return script(lang, `${WEEKDAYS.lat[weekday]}, ${day}. ${MONTHS.lat[month]} · ${time}`);
}

/** "Sub, 24. okt · 17:00" / "Sat, 24 Oct · 17:00" */
export function formatKickoffShort(iso: string, lang: Lang): string {
  const { day, month, weekday, time } = partsInBelgrade(iso);
  if (lang === 'en') return `${WEEKDAYS.en[weekday].slice(0, 3)}, ${day} ${MONTHS.en[month].slice(0, 3)} · ${time}`;
  return script(lang, `${WEEKDAYS.lat[weekday].slice(0, 3)}, ${day}. ${MONTHS.lat[month].slice(0, 3)} · ${time}`);
}

/** 8990 → "8.990 RSD" */
export function formatPrice(rsd: number): string {
  return `${String(Math.round(rsd)).replace(/\B(?=(\d{3})+(?!\d))/g, '.')} RSD`;
}

/** Goal difference with explicit sign: +11, 0, -7 */
export const signed = (n: number) => (n > 0 ? `+${n}` : String(n));

/** Team names joined with an en dash. */
export const versus = (home: string, away: string) => `${home} – ${away}`;
