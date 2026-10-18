@AGENTS.md
@design_handoff_fkvojvodina_nextjs/CLAUDE.md

## Project layout
- `src/app/[lang]/` — routes; `lang ∈ lat | cir | en`, `src/proxy.ts` redirects unprefixed paths (cookie `voj-lang`, default `lat`).
- `src/styles/tokens/` — copies of the handoff tokens (fonts come from `next/font` as `--font-fira-*`).
- `src/lib/` — `i18n.ts` (Tri tuples, `loc()`, Latin→Cyrillic), `dictionary.ts` (UI strings), `nav.ts` (sitemap), `format.ts`, `data/` (mock data until CMS/league API).
- `src/components/{core,match,content,navigation}` — TSX ports of the handoff components, one CSS Module each.
- Next.js 16: Cache Components on, `middleware` is `proxy`. Run `npx next typegen` before `tsc` if `PageProps` is missing.
