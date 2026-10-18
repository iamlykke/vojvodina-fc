import type { Article, Fixture, Match, PlayedMatch, Product, Result, StandingRow } from '../types';

/*
 * Illustrative data from the design mockups. Replace with the league API / CMS
 * (see README: revalidate 300s, 60s on match day).
 */

export const nextMatch: Match = {
  home: 'Radnički Niš',
  away: 'Vojvodina',
  kickoff: '2026-10-24T17:00:00+02:00',
  competition: { lat: 'Mozzart Bet Superliga', cir: 'Моцарт Бет Суперлига', en: 'Mozzart Bet SuperLiga' },
  round: { lat: '11. kolo', en: 'Round 11' },
  venue: { lat: 'Stadion „Čair“, Niš', en: '„Čair“ Stadium, Niš' },
  broadcaster: 'TV Arena Sport 1',
};

export const lastMatch: PlayedMatch = { round: { lat: '10. kolo', en: 'Round 10' }, home: 'Vojvodina', away: 'TSC', score: '2:0' };

export const lastForm: Result[] = ['P', 'P', 'N', 'P', 'I'];

export const fixtures: Fixture[] = [
  { date: '01.11.', day: { lat: 'SUB', en: 'SAT' }, time: '19:00', competition: { lat: 'Superliga · 12. kolo', en: 'SuperLiga · Round 12' }, home: 'Vojvodina', away: 'Partizan', venue: { lat: 'Karađorđe' } },
  { date: '08.11.', day: { lat: 'NED', en: 'SUN' }, time: '17:00', competition: { lat: 'Superliga · 13. kolo', en: 'SuperLiga · Round 13' }, home: 'Čukarički', away: 'Vojvodina', venue: { lat: 'Banovo brdo' } },
  { date: '12.11.', day: { lat: 'SRE', en: 'WED' }, time: '15:00', competition: { lat: 'Kup Srbije · osmina finala', en: 'Serbian Cup · Round of 16' }, home: 'Vojvodina', away: 'Mačva', venue: { lat: 'Karađorđe' } },
];

const T: [string, number, number][] = [
  ['Crvena zvezda', 21, 28], ['Vojvodina', 11, 22], ['Radnički 1923', 4, 17], ['Mladost', 2, 16], ['IMT', 1, 15],
  ['Železničar', 0, 14], ['Radnik', -1, 14], ['Novi Pazar', -2, 13], ['Čukarički', -3, 11], ['OFK Beograd', -6, 9],
  ['Partizan', -5, 8], ['Radnički Niš', -7, 8], ['Mačva', -8, 8], ['Zemun', -15, 3],
];
export const standings: StandingRow[] = T.map(([club, gr, b]) => ({ club, u: 10, gr, b }));
export const standingsSeason = { lat: 'Superliga 26/27', en: 'SuperLiga 26/27' };

export const news: Article[] = [
  {
    slug: 'tanjga-zelim-da-se-borimo',
    category: { lat: 'Prvi tim', en: 'First team' },
    date: '17.10.2026.',
    title: { lat: 'Tanjga: Želim da se borimo i pobeđujemo i kada ne igramo dobro', en: 'Tanjga: I want us to fight and win even when we are not playing well' },
    imageLabel: { lat: 'foto · konferencija za medije', en: 'photo · press conference' },
  },
  {
    slug: 'prodaja-ulaznica-nis',
    category: { lat: 'Ulaznice', en: 'Tickets' },
    date: '16.10.2026.',
    title: { lat: 'Počinje prodaja ulaznica za gostovanje u Nišu', en: 'Tickets for the away match in Niš go on sale' },
    imageLabel: { lat: 'foto · navijači na gostovanju', en: 'photo · away fans' },
  },
  {
    slug: 'dundjerski-analiziracemo',
    category: { lat: 'Intervju', en: 'Interview' },
    date: '14.10.2026.',
    title: { lat: 'Dunđerski: Analiziraćemo zašto smo popustili u završnici', en: 'Dunđerski: We will analyse why we dropped off at the end' },
    imageLabel: { lat: 'foto · igrač, portret', en: 'photo · player portrait' },
  },
  {
    slug: 'kadeti-slavili-u-derbiju',
    category: { lat: 'Akademija', en: 'Academy' },
    date: '12.10.2026.',
    title: { lat: 'Kadeti „Ilije Pantelića“ slavili u derbiju Vojvodine', en: '„Ilija Pantelić“ cadets win the Vojvodina derby' },
    imageLabel: { lat: 'foto · omladinska škola', en: 'photo · youth academy' },
  },
];

export const products: Product[] = [
  { slug: 'domaci-dres-2026-27', name: { lat: 'Domaći dres 2026/27', en: 'Home shirt 2026/27' }, price: 8990, isNew: true, imageLabel: { lat: 'dres · domaći', en: 'shirt · home' } },
  { slug: 'gostujuci-dres-2026-27', name: { lat: 'Gostujući dres 2026/27', en: 'Away shirt 2026/27' }, price: 8990, isNew: true, imageLabel: { lat: 'dres · gostujući', en: 'shirt · away' } },
  { slug: 'sal-stara-dama', name: { lat: 'Šal „Stara dama“', en: '„Stara dama“ scarf' }, price: 1490, imageLabel: { lat: 'šal', en: 'scarf' } },
  { slug: 'trening-jakna', name: { lat: 'Trening jakna', en: 'Training jacket' }, price: 6490, imageLabel: { lat: 'jakna', en: 'jacket' } },
];
