import { LANG_INDEX, type Lang, type Tri } from './i18n';

/** UI strings. Every entry exists in all three versions: [lat, cir, en]. */
const DICT = {
  metaTitle: ['FK Vojvodina — zvanični sajt', 'ФК Војводина — званични сајт', 'FK Vojvodina — official website'],
  metaDescription: [
    'Zvanični sajt Fudbalskog kluba Vojvodina, Novi Sad, osnovan 1914. Utakmice, ulaznice, tabela, vesti i šop.',
    'Званични сајт Фудбалског клуба Војводина, Нови Сад, основан 1914. Утакмице, улазнице, табела, вести и шоп.',
    'Official website of FK Vojvodina, Novi Sad, founded 1914. Matches, tickets, table, news and shop.',
  ],
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

  copyright: ['© 1914–2026 Fudbalski klub Vojvodina', '© 1914–2026 Фудбалски клуб Војводина', '© 1914–2026 Football Club Vojvodina'],
  partners: ['Pokrovitelji i partneri', 'Покровитељи и партнери', 'Sponsors & partners'],
  privacy: ['Politika privatnosti', 'Политика приватности', 'Privacy policy'],
  address: ['Dimitrija Tucovića 1|21000 Novi Sad', 'Димитрија Туцовића 1|21000 Нови Сад', 'Dimitrija Tucovića 1|21000 Novi Sad, Serbia'],
} as const satisfies Record<string, Tri>;

export type DictKey = keyof typeof DICT;
export type Dictionary = Record<DictKey, string>;

export function getDictionary(lang: Lang): Dictionary {
  const i = LANG_INDEX[lang];
  return Object.fromEntries(Object.entries(DICT).map(([k, v]) => [k, v[i]])) as Dictionary;
}

/** Split a "a|b|c" dictionary entry. */
export const parts = (value: string) => value.split('|');
