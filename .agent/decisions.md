# Decision log

`Accepted` means fixed by the client or the team. `Proposed` means the default plan, still awaiting team sign-off.

| # | Decision | Status | Why | Revisit if |
|---|---|---|---|---|
| 1 | Enquiry website, not e-commerce | Accepted (client, 2026-11-06) | Prices and orders are negotiated per business | Client asks for retail sales |
| 2 | Three main categories: Makhana, Puffs, Freeze-Dried Fruits | Proposed | Product notes are newer and more specific than the profile | Client answers Q7 |
| 3 | Website built with Next.js | Accepted (team, 2026-11-06) | Static output suits SEO; small server surface for enquiries | |
| 4 | Catalogue stored as typed files in the repo; no CMS in v1 | Proposed | About 10 to 15 products that change rarely; no CMS cost or setup | Client wants to edit products without a developer |
| 5 | Multi-product enquiry list held in the browser, plus a single-product quick enquiry | Proposed | Buyers often source several lines; it gives a cart-like flow with no order logic | Analytics show the list is unused |
| 6 | Leads saved to a Google Sheet, then emailed | Proposed | Client can view leads with no admin panel to build; durable if email fails | Volume or access control outgrows a Sheet (see `knowledge/approaches.md`) |
| 7 | WhatsApp is a parallel enquiry channel | Proposed | Normal for Indian B2B trade; depends on Q3 | Number is not on WhatsApp |
| 8 | English only in v1 | Proposed | Common language of trade for the target buyers | Client names markets that need another language |
| 9 | `.agent/` guidance structure, with `AGENTS.md` as entry point | Accepted (team, 2026-11-06) | Tool-neutral guidance modelled on Vercel eve's layout | |
| 10 | Next.js setup: App Router, TypeScript, Tailwind CSS, hosted on Vercel | Proposed | Current Next.js defaults; Vercel is the simplest host for it | Client has a hosting constraint |
| 11 | Products come from one data file, `content/catalogue.ts`; products without a real photo show a labelled "Photo coming soon" placeholder | Accepted (team, 2026-11-12) | One source for cards, drawer, hero, forms and API validation; follows the honest-imagery rule | |
| 12 | Announcement bar is a pausable marquee in the Paper design (blue `#B8DEFA`, purple `#4F227C`, red star `#EA392E`) | Accepted (team, 2026-11-12) | Requested by the team | |
| 13 | Button hover: lime `#D2E796` fill, purple `#4F227C` text, shadow collapses and the button sinks by its shadow depth; same on keyboard focus; no movement with reduced motion | Accepted (team, 2026-11-12) | Paper design supplied by the team; one rule at the end of `app/globals.css` | |
| 14 | All icons come from Hugeicons (free set, `@hugeicons/react` + `@hugeicons/core-free-icons`) through `<Icon name>` in `app/visuals.tsx`; no inline SVG icons | Accepted (team, 2026-11-12) | One consistent icon family; typed names catch typos at build | |
| 15 | Section headings use `StickerHeading` (`app/sticker-heading.tsx`): words on tilted colour blocks, uppercase kicker, rays on centred headings; generous section spacing modelled on feastie.ca | Accepted (team, 2026-11-12) | Paper design supplied by the team | |
| 16 | Home category cards follow the Paper design: solid colour tile (purple, lime, orange), big uppercase title, tagline, tilted arch photo. Orange darkened from `#FB580D` to `#D94508` so the yellow text reaches 3.2:1 (Paper colour gave 2.4:1) | Accepted (team, 2026-11-12) | Paper design supplied by the team; contrast rule for large text | |
| 17 | Home stats band ("One enquiry gets you:", Paper design) shows only verifiable facts: category and product counts derived from `content/catalogue.ts`, GST registration, B2B services. Add real figures (clients, volumes, years) only once the client confirms them | Accepted (team, 2026-11-12) | Instruction rule 2: never invent business facts | Client supplies figures |
| 18 | Home FAQ uses the Paper "folder" accordion (yellow tab bar, tilted white answer card). Answers rewritten from client facts only; the template's claims (zero palm oil, 9-month shelf life, delivery times, discounts) and the placeholder WhatsApp number were removed | Accepted (team, 2026-11-12) | Paper design; instruction rule 2 | Client supplies MOQ, lead times or certifications |
