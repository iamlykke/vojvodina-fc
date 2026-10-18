import { LANG_INDEX, type Lang, type Tri } from './i18n';

/** UI strings. Every entry exists in all three versions: [lat, cir, en]. */
const DICT = {
  metaTitle: ['FK Vojvodina — nezvanični navijački sajt', 'ФК Војводина — незванични навијачки сајт', 'FK Vojvodina — unofficial fan site'],
  metaTitleSuffix: ['FK Vojvodina (nezvanično)', 'ФК Војводина (незванично)', 'FK Vojvodina (unofficial)'],
  metaDescription: [
    'Nezvanični navijački sajt o FK Vojvodina iz Novog Sada (osnovan 1914): utakmice, tabela, vesti. Nije povezan sa klubom.',
    'Незванични навијачки сајт о ФК Војводина из Новог Сада (основан 1914): утакмице, табела, вести. Није повезан са клубом.',
    'Unofficial fan site about FK Vojvodina, Novi Sad (founded 1914): matches, table, news. Not affiliated with the club.',
  ],
  siteName: ['FK Vojvodina — nezvanični sajt', 'ФК Војводина — незванични сајт', 'FK Vojvodina — unofficial site'],
  wordmarkSub: ['NOVI SAD · 1914', 'НОВИ САД · 1914', 'NOVI SAD · 1914'],
  skipToContent: ['Preskoči na sadržaj', 'Прескочи на садржај', 'Skip to content'],
  account: ['Moj nalog', 'Мој налог', 'My account'],
  cart: ['Korpa', 'Корпа', 'Cart'],
  tickets: ['Ulaznice', 'Улазнице', 'Tickets'],
  menuOpen: ['Otvori meni', 'Отвори мени', 'Open menu'],
  menuClose: ['Zatvori meni', 'Затвори мени', 'Close menu'],
  language: ['Jezik', 'Језик', 'Language'],
  mainNav: ['Glavna navigacija', 'Главна навигација', 'Main navigation'],
  promoEyebrow: ['ISTAKNUTO', 'ИСТАКНУТО', 'FEATURED'],
  promoTitle: ['Sezonske ulaznice 2026/27', 'Сезонске улазнице 2026/27', 'Season tickets 2026/27'],
  promoAction: ['Kupi online', 'Купи онлајн', 'Buy online'],
  promoImage: ['foto · stadion Karađorđe', 'фото · стадион Карађорђе', 'photo · Karađorđe stadium'],

  nextMatch: ['Sledeća utakmica', 'Следећа утакмица', 'Next match'],
  nextMatchShort: ['Sledeća', 'Следећа', 'Next'],
  home: ['Domaćin', 'Домаћин', 'Home'],
  away: ['Gost', 'Гост', 'Away'],
  buyTicket: ['Kupi ulaznicu', 'Купи улазницу', 'Buy ticket'],
  preview: ['Najava', 'Најава', 'Preview'],
  countdownLabels: ['DANA|SATA|MIN', 'ДАНА|САТА|МИН', 'DAYS|HRS|MIN'],
  countdownIn: ['za', 'за', 'in'],
  countdownUnits: ['d|h', 'д|ч', 'd|h'],
  live: ['UŽIVO', 'УЖИВО', 'LIVE'],
  crest: ['grb', 'грб', 'crest'],

  table: ['Tabela', 'Табела', 'Table'],
  tableCols: ['#|KLUB|U|GR|B', '#|КЛУБ|У|ГР|Б', '#|CLUB|P|GD|PTS'],
  tableLink: ['Rezultati i tabela', 'Резултати и табела', 'Scores & table'],
  tableFull: ['Cela', 'Цела', 'Full'],
  lastMatch: ['Poslednja', 'Последња', 'Last'],
  form: ['Forma', 'Форма', 'Form'],
  result: ['Pobeda|Nerešeno|Poraz', 'Победа|Нерешено|Пораз', 'Win|Draw|Loss'],
  resultLetter: ['P|N|I', 'П|Н|И', 'W|D|L'],
  upcoming: ['Naredne utakmice', 'Наредне утакмице', 'Upcoming matches'],

  news: ['Vesti', 'Вести', 'News'],
  allNews: ['Sve vesti', 'Све вести', 'All news'],
  allNewsShort: ['Sve', 'Све', 'All'],
  shop: ['Šop', 'Шоп', 'Shop'],
  allProducts: ['Ceo asortiman', 'Цео асортиман', 'Full range'],

  homeCrumb: ['Početna', 'Почетна', 'Home'],
  notFoundTitle: ['Stranica nije pronađena', 'Страница није пронађена', 'Page not found'],
  notFoundText: [
    'Stranica koju tražite ne postoji ili je premeštena. Proverite adresu ili nastavite sa početne strane.',
    'Страница коју тражите не постоји или је премештена. Проверите адресу или наставите са почетне стране.',
    'The page you are looking for does not exist or has moved. Check the address or continue from the home page.',
  ],
  backHome: ['Na početnu', 'На почетну', 'Back to home'],
  maybeLooking: ['Možda tražite', 'Можда тражите', 'You may be looking for'],

  footerAbout: [
    'Nezvanični navijački projekat o FK Vojvodina: utakmice, tabela i vesti na jednom mestu.',
    'Незванични навијачки пројекат о ФК Војводина: утакмице, табела и вести на једном месту.',
    'An unofficial fan project about FK Vojvodina: matches, table and news in one place.',
  ],
  disclaimer: [
    '© 2026 · Nije povezan sa FK Vojvodina niti ga klub podržava.',
    '© 2026 · Није повезан са ФК Војводина нити га клуб подржава.',
    '© 2026 · Not affiliated with or endorsed by FK Vojvodina.',
  ],
  partners: ['Pokrovitelji i partneri', 'Покровитељи и партнери', 'Sponsors & partners'],
  privacy: ['Politika privatnosti', 'Политика приватности', 'Privacy policy'],
} as const satisfies Record<string, Tri>;

export type DictKey = keyof typeof DICT;
export type Dictionary = Record<DictKey, string>;

export function getDictionary(lang: Lang): Dictionary {
  const i = LANG_INDEX[lang];
  return Object.fromEntries(Object.entries(DICT).map(([k, v]) => [k, v[i]])) as Dictionary;
}

/** Split a "a|b|c" dictionary entry. */
export const parts = (value: string) => value.split('|');
