import { Fira_Sans, Fira_Sans_Extra_Condensed } from 'next/font/google';

export const firaSans = Fira_Sans({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-fira-body',
  display: 'swap',
});

export const firaDisplay = Fira_Sans_Extra_Condensed({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  weight: ['500', '600', '700', '800', '900'],
  variable: '--font-fira-display',
  display: 'swap',
});

export const fontClassName = `${firaSans.variable} ${firaDisplay.variable}`;
