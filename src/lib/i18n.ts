export const LANGS = ['lat', 'cir', 'en'] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = 'lat';
export const LANG_COOKIE = 'voj-lang';

export const LANG_INDEX: Record<Lang, 0 | 1 | 2> = { lat: 0, cir: 1, en: 2 };
export const HTML_LANG: Record<Lang, string> = { lat: 'sr-Latn', cir: 'sr-Cyrl', en: 'en' };

export const isLang = (value: string): value is Lang => (LANGS as readonly string[]).includes(value);

/** A string in all three scripts/languages: [latinica, ćirilica, English]. */
export type Tri = readonly [string, string, string];

/**
 * Text that comes from content (CMS). Serbian is stored in Latin; Cyrillic is
 * transliterated server-side unless an explicit `cir` is given.
 */
export type Localized = { lat: string; en?: string; cir?: string };

export function tri(value: Tri, lang: Lang): string {
  return value[LANG_INDEX[lang]];
}

export function loc(value: Localized | string, lang: Lang): string {
  if (typeof value === 'string') return lang === 'cir' ? toCyrillic(value) : value;
  if (lang === 'en') return value.en ?? value.lat;
  if (lang === 'cir') return value.cir ?? toCyrillic(value.lat);
  return value.lat;
}

const DIGRAPHS: Record<string, string> = {
  Lj: 'Љ', LJ: 'Љ', lj: 'љ',
  Nj: 'Њ', NJ: 'Њ', nj: 'њ',
  Dž: 'Џ', DŽ: 'Џ', dž: 'џ',
};

const LETTERS: Record<string, string> = {
  A: 'А', B: 'Б', V: 'В', G: 'Г', D: 'Д', Đ: 'Ђ', E: 'Е', Ž: 'Ж', Z: 'З', I: 'И', J: 'Ј', K: 'К', L: 'Л', M: 'М',
  N: 'Н', O: 'О', P: 'П', R: 'Р', S: 'С', T: 'Т', Ć: 'Ћ', U: 'У', F: 'Ф', H: 'Х', C: 'Ц', Č: 'Ч', Š: 'Ш',
  a: 'а', b: 'б', v: 'в', g: 'г', d: 'д', đ: 'ђ', e: 'е', ž: 'ж', z: 'з', i: 'и', j: 'ј', k: 'к', l: 'л', m: 'м',
  n: 'н', o: 'о', p: 'п', r: 'р', s: 'с', t: 'т', ć: 'ћ', u: 'у', f: 'ф', h: 'х', c: 'ц', č: 'ч', š: 'ш',
};

/** Words that stay in Latin script in Cyrillic texts (brands, abbreviations). */
const KEEP_LATIN = new Set(['TSC', 'IMT', 'OFK', 'TV', 'X', 'RSD', 'FK', 'VOJVODINA', 'Instagram', 'TikTok', 'YouTube', 'Viber', 'The', 'Firm', 'Slaninari', 'West']);

/** Serbian Latin → Cyrillic. 1:1 except the digraphs lj / nj / dž. */
export function toCyrillic(text: string): string {
  return text.replace(/[A-Za-zČĆŽŠĐčćžšđ]+/g, (word) => {
    if (KEEP_LATIN.has(word)) return word;
    let out = '';
    for (let i = 0; i < word.length; i++) {
      const pair = word.slice(i, i + 2);
      if (DIGRAPHS[pair]) {
        out += DIGRAPHS[pair];
        i++;
      } else {
        out += LETTERS[word[i]] ?? word[i];
      }
    }
    return out;
  });
}

/** Replace the leading /{lang} segment of a path. */
export function swapLang(pathname: string, lang: Lang): string {
  const parts = pathname.split('/');
  if (parts[1] && isLang(parts[1])) parts[1] = lang;
  else parts.splice(1, 0, lang);
  return parts.join('/') || `/${lang}`;
}
