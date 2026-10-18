import type { Metadata } from 'next';
import { lang as rootLang } from 'next/root-params';
import { NotFoundView } from '@/components/content/NotFoundView';
import { getDictionary } from '@/lib/dictionary';
import { DEFAULT_LANG, isLang } from '@/lib/i18n';

async function currentLang() {
  const value = await rootLang();
  return value && isLang(value) ? value : DEFAULT_LANG;
}

export async function generateMetadata(): Promise<Metadata> {
  return { title: getDictionary(await currentLang()).notFoundTitle };
}

export default async function NotFound() {
  return <NotFoundView lang={await currentLang()} />;
}
