# Always-on instructions

## The project in one paragraph

Saatvik International sells healthy snacks in bulk to businesses: distributors, retail chains, food brands, HORECA, private-label owners and importers. The website must make a business buyer trust the company and send a specific enquiry. A good result is a qualified lead, not a sale on the site.

## Hard rules

1. **Enquiry only.** Do not add prices, checkout, payments, stock levels, customer accounts or order tracking. The `Product` type has no price field, on purpose.
2. **Never invent business facts.** This covers certifications, licence numbers, MOQs, capacity, years in business, client names, countries served, shipment counts, testimonials and lab results. If it is not in `client/`, it does not ship. Use a visible `TODO(client)` in drafts and add the item to `client/open-questions.md`.
3. **Describe the business accurately.** Saatvik is a trading, wholesale and sourcing company. Do not call it a manufacturer, farmer or processor. The client's wording is "manufacturing coordination". Do not imply established export volumes: the profile says it "aims to" serve international buyers.
4. **Follow the claims rules.** Any health, nutrition, organic, gluten-free, GI-tag or quality claim must pass `knowledge/content-and-claims.md`.
5. **Do not edit verbatim client files.** `client/company-profile.md` and `client/product-notes.md` keep the client's text, typos included. Correct spelling in website copy, not there.
6. **Never lose an enquiry.** A lead is stored durably before any email is attempted. See `developer/enquiry-flow.md`.
7. **Use the real logo.** The wordmark is custom lettering. Never retype it in a font or recolour it. Use files from `assets/brand/`.
8. **Use honest imagery.** Do not show stock or AI-generated images as Saatvik's own product, packaging or facility. Placeholders must look like placeholders until real images arrive.
9. **No secrets in the repo.** API keys go in environment variables, documented in `.env.example`.

## How to work

- Check `decisions.md` first. Do not reopen an accepted decision without a new reason.
- A `Proposed` decision is the default plan, but flag it when building on it would be expensive to undo.
- Static by default: pages render on the server at build time, and client JavaScript is limited to small interactive parts.
- Design for a procurement buyer on a laptop and a trader on a mid-range phone on mobile data. Both are primary users.
- Keep every page's route to an enquiry within one click.
- Icons: only Hugeicons via `<Icon name>` from `app/visuals.tsx`. Section headings: `StickerHeading`. See decisions 12 to 15 for the Paper-based UI rules.
- Use the tokens in `developer/design-system.md`. Brand gold fails contrast as body text, so follow the rule there.
- Update `AGENTS.md` commands and `developer/roadmap.md` when the state of the project changes.
- Commit only when asked.
