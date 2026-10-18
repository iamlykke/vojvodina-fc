import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FormGuide } from '@/components/core/FormBadge';
import { NewsCard } from '@/components/content/NewsCard';
import { ProductCard } from '@/components/content/ProductCard';
import { SectionHeader } from '@/components/content/SectionHeader';
import { FixtureBand, FixtureItem } from '@/components/match/FixtureItem';
import { MatchHero } from '@/components/match/MatchHero';
import { StandingsTable } from '@/components/match/StandingsTable';
import { fixtures, lastForm, lastMatch, news, nextMatch, products, standings, standingsSeason } from '@/lib/data/home';
import { getDictionary, parts } from '@/lib/dictionary';
import { formatKickoff, formatKickoffShort, formatPrice, versus } from '@/lib/format';
import { isLang, loc } from '@/lib/i18n';
import styles from './page.module.css';

export default async function HomePage({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = getDictionary(lang);
  const club = (name: string) => loc(name, lang);

  const [colPos, colClub, colU, colGr, colB] = parts(t.tableCols);
  const tableLabels = { pos: colPos, club: colClub, u: colU, gr: colGr, b: colB };
  const clubNames = Object.fromEntries(standings.map((r) => [r.club, club(r.club)]));
  const round = loc(nextMatch.round, lang);
  const upper = (s: string) => s.toLocaleUpperCase(lang === 'en' ? 'en' : 'sr');

  const [lead, ...rest] = news;
  const tablePath = `/${lang}/prvi-tim/tabela`;

  return (
    <>
      <MatchHero
        eyebrow={[t.nextMatch, loc(nextMatch.competition, lang), round].map(upper).join(' · ')}
        eyebrowShort={[t.nextMatchShort, loc({ lat: 'Superliga', en: 'SuperLiga' }, lang), round].map(upper).join(' · ')}
        home={club(nextMatch.home)}
        away={club(nextMatch.away)}
        homeCrest={nextMatch.homeCrest}
        awayCrest={nextMatch.awayCrest}
        date={formatKickoff(nextMatch.kickoff, lang)}
        dateShort={formatKickoffShort(nextMatch.kickoff, lang)}
        venue={[loc(nextMatch.venue, lang), nextMatch.broadcaster].filter(Boolean).join(' · ')}
        kickoff={nextMatch.kickoff}
        countdownLabels={parts(t.countdownLabels) as [string, string, string]}
        countdownIn={t.countdownIn}
        countdownUnits={parts(t.countdownUnits) as [string, string]}
        liveLabel={t.live}
        ticketsHref={`/${lang}/ulaznice`}
        previewHref={`/${lang}/vesti`}
        ticketsLabel={t.buyTicket}
        previewLabel={t.preview}
        homeLabel={t.home}
        awayLabel={t.away}
        crestLabel={t.crest}
        rail={
          <aside className={styles.rail} aria-labelledby="rail-table">
            <div className={styles.railHead}>
              <h2 id="rail-table" className={styles.railTitle}>{upper(t.table)}</h2>
              <span className={styles.railMeta}>{loc(standingsSeason, lang)}</span>
            </div>
            <StandingsTable rows={standings} tone="dark" columns="compact" labels={tableLabels} names={clubNames} caption={loc(standingsSeason, lang)} />
            <div className={styles.railLink}><Link href={tablePath}>{t.tableLink} →</Link></div>
          </aside>
        }
      />

      <FixtureBand
        label={t.upcoming}
        lastLabel={`${t.lastMatch} · ${loc(lastMatch.round, lang)}`}
        lastLabelShort={t.lastMatch}
        lastResult={`${club(lastMatch.home)} ${lastMatch.score} ${club(lastMatch.away)}`}
        lastResultShort={`${lastMatch.score} ${club(lastMatch.away)}`}
        form={<FormGuide results={lastForm} onAccent lang={lang} />}
      >
        {fixtures.map((f) => (
          <FixtureItem
            key={f.date}
            date={f.date}
            day={loc(f.day, lang)}
            time={f.time}
            competition={loc(f.competition, lang)}
            match={versus(club(f.home), club(f.away))}
            venue={loc(f.venue, lang)}
          />
        ))}
      </FixtureBand>

      {/* Phones: table moves out of the hero onto paper (top 6) */}
      <section className={`container ${styles.mobileTable}`} aria-labelledby="mobile-table">
        <SectionHeader id="mobile-table" title={t.table} link={t.tableFull} href={tablePath} />
        <StandingsTable rows={standings} columns="mini" limit={6} labels={tableLabels} names={clubNames} caption={loc(standingsSeason, lang)} />
      </section>

      <section className={`container ${styles.news}`} aria-labelledby="home-news">
        <SectionHeader id="home-news" title={t.news} link={t.allNews} linkShort={t.allNewsShort} href={`/${lang}/vesti`} />
        <div className={styles.newsGrid}>
          <NewsCard
            layout="lead"
            category={loc(lead.category, lang)}
            date={lead.date}
            title={loc(lead.title, lang)}
            image={lead.image}
            imageLabel={loc(lead.imageLabel, lang)}
            href={`/${lang}/vesti/${lead.slug}`}
          />
          <div className={styles.newsList}>
            {rest.map((a) => (
              <NewsCard
                key={a.slug}
                layout="row"
                category={loc(a.category, lang)}
                date={a.date}
                title={loc(a.title, lang)}
                image={a.image}
                imageLabel={loc(a.imageLabel, lang)}
                href={`/${lang}/vesti/${a.slug}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className={styles.shop} aria-labelledby="home-shop">
        <div className="container">
          <SectionHeader id="home-shop" title={t.shop} link={t.allProducts} href={`/${lang}/sop`} />
        </div>
        <div className={`container ${styles.shopScroller}`}>
          <ul className={styles.shopGrid}>
            {products.map((p) => (
              <li key={p.slug}>
                <ProductCard
                  name={loc(p.name, lang)}
                  price={formatPrice(p.price)}
                  tag={p.isNew ? loc({ lat: 'Novo', en: 'New' }, lang) : undefined}
                  image={p.image}
                  imageLabel={loc(p.imageLabel, lang)}
                  href={`/${lang}/sop/${p.slug}`}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
