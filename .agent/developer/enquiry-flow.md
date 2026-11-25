# Enquiry flow

This is the core feature. It looks like a cart but has no prices, orders or payment.

## Buyer paths

1. **Enquiry list:** "Add to enquiry" on any product, with options and rough quantity. The list persists in `localStorage`, and the buyer submits at `/enquiry`.
2. **Quick enquiry:** a short form on the product page for a single item.
3. **WhatsApp:** `https://wa.me/919370012306?text=<prefilled product and options>`. Depends on Q3.
4. **General form:** on Contact and service pages, with no product attached.

Wrap `localStorage` access in try/catch. If it is unavailable, the list works in memory for the visit.

## Form fields

Keep required fields to a minimum.

| Field | Required | Notes |
|---|---|---|
| Name | Yes | |
| Company | Yes | |
| Email | Yes | |
| Phone or WhatsApp | Yes | International format with country selector |
| Country | Yes | Default India; drives domestic or export routing |
| Buyer type | Yes | Distributor, Retail chain, Food brand, Private label, Importer, HORECA, Other |
| Products | Yes | From the list; each with options, quantity and unit (kg, tonnes, cartons) |
| Packaging need | No | Bulk, retail-ready, own brand |
| Destination port or city | No | Shown when country is not India |
| Message | No | |
| Consent | Yes | Unticked checkbox linking to the privacy policy |

## Server sequence

```
validate with Zod → check honeypot → verify Turnstile → rate limit
→ generate reference (SI-YYYY-XXXXXX, random suffix)
→ append row to Google Sheet          ← source of truth; must succeed
→ email sales with buyer as Reply-To  ← failure is logged, buyer still succeeds
→ email buyer acknowledgement         ← failure is logged, buyer still succeeds
→ return reference → /enquiry/thank-you → clear list
```

If storage fails, keep the buyer's input on screen and show the phone, email and WhatsApp details. Never silently discard an enquiry. Retry once and report the failure in server logs.

## Sheet columns

`received_at, reference, status, name, company, email, phone, country, buyer_type, items, packaging, destination, message, source_page, utm_source, utm_campaign`

`status` starts as `New` and the client's team edits it. Prefix any user value starting with `=`, `+`, `-` or `@` with an apostrophe to prevent formula injection.

## Email

- Sales email: subject `[SI-2026-XXXXXX] Makhana, Quinoa Puffs: Company, Country`, buyer details, itemised list.
- Acknowledgement: reference, summary of the request, promised reply time (Q2), contact details. No marketing.
- Escape all user content in templates.

## Analytics events

`add_to_enquiry`, `quick_enquiry_open`, `generate_lead` (with buyer type and country, never personal data), `whatsapp_click`.

## Privacy

Collect only what the fields above need. The privacy policy states purpose, storage, retention and a contact for deletion requests. Check current DPDP Act obligations before launch, plus GDPR if EU importers are targeted (Q14).

## Where enquiries go (built 2026-11-25)

Every form (home Trade Enquiry, Export Query, Contact, product-page quote, enquiry list) posts to `/api/corporate` or `/api/enquiries`. Each route:

1. sends the enquiry to the client's **Google Sheet** (`lib/enquiry-sheet.ts` → Apps Script web app), one row per enquiry;
2. also writes a backup copy to SQLite (`lib/enquiry-store.ts`). On Vercel this file is temporary, so the sheet is the record;
3. fails only if both steps fail, so the buyer sees an error and is asked to call or email.

Sheet: https://docs.google.com/spreadsheets/d/1OAulzZCXZ9PRE8r-UtrOmtmtqi6Sx4OjIXhGx7HB9mE (tab "Enquiries", created automatically with headings: Received (IST), Reference, Form, Name, Company, Email, Phone, City / Country, Products, Quantity / Volume, Message, Page, Status).

### One-time setup (by whoever owns the sheet)

1. Open the sheet → **Extensions → Apps Script**. Delete any starter code and paste `scripts/google-sheet-enquiries.gs`.
2. In the script, set `SECRET` to a long random string. Optionally set `NOTIFY_EMAIL` to get an email for each enquiry. Save.
3. **Deploy → New deployment → Select type: Web app.** Execute as: **Me**. Who has access: **Anyone**. Deploy, approve the Google permission prompts, and copy the **Web app URL** (ends in `/exec`).
4. Check it: opening that URL in a browser shows `{"ok":true,"service":"Saatvik enquiries"}`.
5. Set environment variables (`.env.local` locally, Vercel project settings in production):
   - `ENQUIRY_SHEET_WEBHOOK_URL` = the `/exec` URL
   - `ENQUIRY_SHEET_SECRET` = the same value as `SECRET`
6. Restart the site and send a test enquiry; a row appears in the "Enquiries" tab.

After editing the script later, use **Deploy → Manage deployments → Edit → Version: New version** so the URL stays the same.
