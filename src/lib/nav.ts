import { tri, type Lang, type Tri } from './i18n';

type NavItem = { l: Tri; path: string };
type NavGroup = { l: Tri; path: string; items: NavItem[] };

/** Trilingual sitemap shared by SiteHeader, MegaMenu, mobile menu and SiteFooter (from design-system nav-data.js). */
export const NAV: NavGroup[] = [
  { l: ['Vesti', 'Вести', 'News'], path: '/vesti', items: [
    { l: ['Sve vesti', 'Све вести', 'All news'], path: '/vesti' },
    { l: ['Saopštenja', 'Саопштења', 'Announcements'], path: '/vesti?kategorija=saopstenja' },
    { l: ['Intervjui', 'Интервјуи', 'Interviews'], path: '/vesti?kategorija=intervjui' },
  ] },
  { l: ['Klub', 'Клуб', 'Club'], path: '/klub/istorija', items: [
    { l: ['Osnivanje i istorija', 'Оснивање и историја', 'Foundation & history'], path: '/klub/istorija' },
    { l: ['Trofeji', 'Трофеји', 'Honours'], path: '/klub/trofeji' },
    { l: ['Legende kluba', 'Легенде клуба', 'Club legends'], path: '/klub/legende' },
    { l: ['Uprava i rukovodstvo', 'Управа и руководство', 'Board & management'], path: '/klub/uprava' },
    { l: ['Da li ste znali?', 'Да ли сте знали?', 'Did you know?'], path: '/klub/da-li-ste-znali' },
    { l: ['Vošino naj', 'Вошино нај', 'The best of'], path: '/klub/vosino-naj' },
  ] },
  { l: ['Prvi tim', 'Први тим', 'First team'], path: '/prvi-tim', items: [
    { l: ['Igrači', 'Играчи', 'Players'], path: '/prvi-tim' },
    { l: ['Stručni štab', 'Стручни штаб', 'Staff'], path: '/prvi-tim/strucni-stab' },
    { l: ['Raspored utakmica', 'Распоред утакмица', 'Match schedule'], path: '/prvi-tim/raspored' },
    { l: ['Rezultati i tabela', 'Резултати и табела', 'Scores & table'], path: '/prvi-tim/tabela' },
  ] },
  { l: ['Stadion', 'Стадион', 'Stadium'], path: '/stadion/karadjordje', items: [
    { l: ['„Karađorđe“ kroz decenije', '„Карађорђе“ кроз деценије', '„Karađorđe“ through decades'], path: '/stadion/karadjordje' },
    { l: ['Kako do stadiona', 'Како до стадиона', 'How to get there'], path: '/stadion/kako-do-stadiona' },
    { l: ['FC „Vujadin Boškov“', 'ФЦ „Вујадин Бошков“', 'FC „Vujadin Boškov“'], path: '/stadion/fc-vujadin-boskov' },
  ] },
  { l: ['Navijači', 'Навијачи', 'Fans'], path: '/navijaci/the-firm', items: [
    { l: ['The Firm', 'The Firm', 'The Firm'], path: '/navijaci/the-firm' },
    { l: ['Stara garda', 'Стара гарда', 'Old Guard'], path: '/navijaci/stara-garda' },
    { l: ['Slaninari West', 'Slaninari West', 'Slaninari West'], path: '/navijaci/slaninari-west' },
    { l: ['Fan klub 1937', 'Фан клуб 1937', 'Fan Club 1937'], path: '/navijaci/fan-klub-1937' },
  ] },
  { l: ['Akademija', 'Академија', 'Academy'], path: '/akademija/os-ilija-pantelic', items: [
    { l: ['OŠ „Ilija Pantelić“', 'ОШ „Илија Пантелић“', 'Academy „Ilija Pantelić“'], path: '/akademija/os-ilija-pantelic' },
    { l: ['Selekcije', 'Селекције', 'Teams'], path: '/akademija/selekcije' },
  ] },
  { l: ['Galerija', 'Галерија', 'Gallery'], path: '/galerija/foto', items: [
    { l: ['Foto', 'Фото', 'Photo'], path: '/galerija/foto' },
    { l: ['Video', 'Видео', 'Video'], path: '/galerija/video' },
  ] },
  { l: ['Šop', 'Шоп', 'Shop'], path: '/sop', items: [
    { l: ['Dresovi', 'Дресови', 'Kits'], path: '/sop/dresovi' },
    { l: ['Navijački program', 'Навијачки програм', 'Fanwear'], path: '/sop/navijacki-program' },
    { l: ['Pokloni', 'Поклони', 'Gifts'], path: '/sop/pokloni' },
  ] },
];

export type NavLink = { label: string; href: string };
export type NavGroupView = NavLink & { items: NavLink[] };

/** Resolve the sitemap for one language (labels + language-prefixed hrefs). */
export function getNav(lang: Lang): NavGroupView[] {
  return NAV.map((g) => ({
    label: tri(g.l, lang),
    href: `/${lang}${g.path}`,
    items: g.items.map((it) => ({ label: tri(it.l, lang), href: `/${lang}${it.path}` })),
  }));
}

/** Official profile URLs to be confirmed by the club. */
export const SOCIALS: NavLink[] = [
  { label: 'Instagram', href: '#' },
  { label: 'TikTok', href: '#' },
  { label: 'YouTube', href: '#' },
  { label: 'X', href: '#' },
  { label: 'Viber', href: '#' },
];
