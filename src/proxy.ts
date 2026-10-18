import { NextResponse, type NextRequest } from 'next/server';
import { DEFAULT_LANG, LANG_COOKIE, isLang } from './lib/i18n';

/** Paths without a language prefix go to the visitor's last language (cookie) or Latinica. */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split('/')[1];
  if (first && isLang(first)) return;

  const saved = request.cookies.get(LANG_COOKIE)?.value;
  const lang = saved && isLang(saved) ? saved : DEFAULT_LANG;
  const url = request.nextUrl.clone();
  url.pathname = `/${lang}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url);
}

// Static assets (by extension) skip the proxy; any other path, even "/foo.php", gets a language prefix
// so unknown URLs end on the branded /{lang} 404.
export const config = {
  matcher: ['/((?!_next|api|.*\\.(?:ico|png|jpe?g|gif|svg|webp|avif|txt|xml|webmanifest|woff2?|css|js|map)$).*)'],
};
