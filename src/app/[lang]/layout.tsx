import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { SiteHeader } from '@/components/navigation/SiteHeader';
import { SiteFooter } from '@/components/navigation/SiteFooter';
import { getDictionary } from '@/lib/dictionary';
import { HTML_LANG, LANGS, isLang } from '@/lib/i18n';
import { fontClassName } from '@/lib/fonts';
import { getNav } from '@/lib/nav';
import '@/styles/globals.css';

const OG_LOCALE = { lat: 'sr_RS', cir: 'sr_RS', en: 'en_US' } as const;

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const t = getDictionary(lang);
  return {
    title: { default: t.metaTitle, template: `%s · ${t.metaTitleSuffix}` },
    description: t.metaDescription,
    applicationName: t.siteName,
    openGraph: {
      type: 'website',
      siteName: t.siteName,
      title: t.metaTitle,
      description: t.metaDescription,
      locale: OG_LOCALE[lang],
    },
    twitter: { card: 'summary', title: t.metaTitle, description: t.metaDescription },
    alternates: { languages: { 'sr-Latn': '/lat', 'sr-Cyrl': '/cir', en: '/en' } },
  };
}

export const viewport: Viewport = { themeColor: '#151314' };

export default async function LangLayout({ children, params }: LayoutProps<'/[lang]'>) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <html lang={HTML_LANG[lang]} className={fontClassName}>
      <body>
        <a className="skip-link" href="#sadrzaj">{t.skipToContent}</a>
        <SiteHeader lang={lang} nav={getNav(lang)} t={t} />
        <main id="sadrzaj">{children}</main>
        <SiteFooter lang={lang} />
      </body>
    </html>
  );
}
