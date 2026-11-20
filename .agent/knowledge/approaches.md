# Additional approaches

Alternatives and ideas beyond the v1 plan. Nothing here is committed scope.

## Alternatives to current decisions

| Area | Default | Alternative | Switch when |
|---|---|---|---|
| Lead storage | Google Sheet | Postgres (Neon or similar) with a small admin view | Thousands of leads, or per-user access needed |
| Lead follow-up | Sheet and email | Zoho or HubSpot free CRM by webhook | Client's team wants pipeline tracking |
| Content | Files in repo | Sanity or similar headless CMS | Client edits content often (Q20) |
| Platform | Custom Next.js | WordPress with WooCommerce catalogue mode | Client must self-manage and accepts slower, less bespoke results. Not recommended |
| Email sending | Resend | Google Workspace SMTP or another provider | Client already has a provider |

## Conversion ideas

- **Request a sample** as a separate, lower-commitment call to action
- **Downloadable catalogue PDF**, offered directly or after a short form, because traders forward these on WhatsApp. Built 2026-11-20 as `/product-catalogue`, offered directly with no form (see `developer/site-map.md`)
- **Private-label brief form** covering product, flavour, pack size, target market and quantity
- **Spec sheet downloads** per product, once Q13 is answered
- **Grade guide** comparing makhana sizes with real photos, which is useful to buyers and for SEO

## Trust ideas for a young company

- Show real facts prominently: GST number, full address, a named contact
- Show the buying process in steps: enquiry, specs and quote, sample, order, dispatch
- State a real reply-time promise
- Publish a Sourcing and Quality page describing checks the client really performs

## Growth after launch

- Guides on grades, private-label steps and export documents, aimed at buyer search queries
- Additional language pages for chosen export markets (Q14)
- Listings on IndiaMART, TradeIndia or similar, linking to the site
- LinkedIn company page
- An AI enquiry assistant answering from approved catalogue content. Only worthwhile with real traffic and a verified knowledge base. This is where an actual Vercel eve agent could fit
