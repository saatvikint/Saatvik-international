# Project analysis

Date: 2026-11-06. Based on the company profile, product notes, business card and logo.

## What the business needs

Saatvik is a young supplier in a crowded market. Buyers can find many makhana suppliers, so the site has one job: **make a business buyer confident enough to send a specific enquiry.** The product itself is largely a commodity. The differentiators are trust, range (three categories from one supplier) and private-label support.

Success measure: qualified enquiries per month, meaning enquiries that name a product, a quantity and a business.

## Buyers

| Buyer | What they want to know first | Primary path |
|---|---|---|
| Distributor, wholesaler, retail chain, grocery or FMCG | Range, grades, pack sizes, reliable supply | Product page to enquiry list |
| Food brand, startup, private-label owner | Can you make my product? MOQ, packaging, process | Private Label page |
| Importer, exporter | Registrations, specifications, export readiness | Export page, product specs |
| HORECA, institutional, corporate | Bulk packs, consistency | Product page, quick enquiry |

## Findings in the client material

1. **The website domain does not exist.** `saatvikinternational.com` returned NXDOMAIN on 2026-11-06, yet it is printed on the card. This is the top risk (Q1).
2. **The product lists disagree.** The profile has Makhana, Jowar Puffs and Healthy Snacks. The product notes have Makhana, Puffs (four types) and Freeze-Dried Fruits. Freeze-dried fruit is missing from the profile entirely (Q7).
3. **Export status is unclear.** The card says "Export", the Google title says "Exporter", and the profile says "aim to" and "developing relationships" (Q14). Copy must stay truthful: offer export supply, and do not imply a track record.
4. **"Bulk Supply" is a service, not a product.** It appears as a product line in the profile. Model it as a service. "Premium Grade" is an attribute of raw makhana, not a separate product.
5. **Entity type may be wrong in copy.** The fourth PAN character inside the GST number is `F`, which indicates a firm or LLP, while the profile says "company" (Q4). This is an inference; confirm it.
6. **No proof exists yet.** No certificates, photos, MOQs, specs or references. For B2B food buyers this matters more than design (Q5, Q6, Q13).
7. **Gmail address on the card.** It works, but a domain address looks more credible to importers. Keep the Gmail as a fallback.
8. **The Google listing is makhana-led**, while the site covers more. Keep makhana as the SEO lead and use the wider range to sell.

## Scope for v1

**In:** Marketing pages, category and product pages, freeze-drying explainer, service pages, enquiry list, quick enquiry, WhatsApp link, lead storage and email, SEO foundation, analytics, legal pages.

**Out:** Prices, payments, accounts, order tracking, inventory, admin panel, multi-language, blog at launch.

## Risks

| Risk | Impact | Response |
|---|---|---|
| Domain gets registered by someone else | High | Register now, ahead of any build work |
| Certificates or photos arrive late | High | Build with clearly marked placeholders; launch gate in `seo-and-launch.md` |
| Unverified claims reach the live site | High | `skills/review-claims.md` before publishing |
| Spam swamps the enquiry inbox | Medium | Honeypot, Turnstile and rate limiting |
| Generic copy looks like every competitor | Medium | Use specifics from Q8, Q12, Q15 and Q16 instead of adjectives |
| Catalogue changes after launch | Low | Repo content is simple to update; review decision 4 after Q20 |
