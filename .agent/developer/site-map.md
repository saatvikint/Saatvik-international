# Site map and content model

The client's page list (2026-11-12, `client/2026-11-12-site-structure.md`) is the target. The routes below map to it.

| Client item | Route |
|---|---|
| 1. Home | `/` |
| 2. Products page, 3 pages | `/products/makhana`, `/products/puffs`, `/products/freeze-dried-fruits` (currently `/catalog` with category filters) |
| 3. Inquiry button / Get a quote | Header and every product card; leads to the enquiry list and `/enquiry` |
| 4. Contact us with form | `/contact` |
| 5. About us | `/about` |
| 6. White labelling (services) | `/white-labelling`. Same service the profile calls private label; use the client's term in navigation |
| 7. Certifications | `/certifications`. Blocked on Q5 and Q26 |
| 8. Export query | `/export`, with an export-specific enquiry form |
| 9. Testimonials | `/testimonials`, or a home section. Real quotes only (Q25) |

The template currently has `/corporate` and `/faq`, which are not on the client's list. Decide whether to keep them when building the pages above.

The fuller structure below is the long-term plan.

```
/                                   Home
/products                           All categories
/products/makhana                   Category
/products/makhana/raw-makhana       Product
/products/makhana/flavoured-makhana Product (roasted and flavoured)
/products/puffs                     Category
/products/puffs/jowar-puffs         Product
/products/puffs/millet-puffs        Product (Q10)
/products/puffs/quinoa-puffs        Product
/products/puffs/chickpea-puffs      Product
/products/freeze-dried-fruits       Category, includes process explainer
/products/freeze-dried-fruits/mango and others (Q11)
/private-label                      Service, major conversion page
/wholesale                          Wholesale and bulk supply
/export                             Export supply (wording depends on Q14)
/about                              Vision, mission, why Saatvik
/contact                            Contact details, map, form
/enquiry                            Review list and submit
/enquiry/thank-you                  Confirmation with reference number
/privacy   /terms                   Legal
```

## Page goals

| Page | Must contain |
|---|---|
| Home | Clear statement of what is sold and to whom, three categories, services, trust strip (only confirmed items), enquiry call to action |
| Category | Short intro, product grid, category FAQ, enquiry call to action |
| Product | Name, description, options (size, flavour, form), packaging and MOQ or "on request", Add to enquiry, Quick enquiry, WhatsApp, related products |
| Private Label | Who it is for, what is handled, process steps, what to send us, enquiry form |
| Export | Supply capability, documents available (confirmed only), enquiry form |

## Navigation

Header: Products (category dropdown), Private Label, Wholesale, Export, About, Contact, Enquiry List with item count. On mobile, keep a persistent enquiry and WhatsApp action bar.

## Content model

Stored as typed files in `content/`. The type deliberately has no price field.

```ts
type Status = "confirmed" | "draft";          // draft never reaches production

interface Category {
  slug: string;
  name: string;
  intro: string;
  seo: { title: string; description: string };
  faqs: { q: string; a: string }[];
}

interface Product {
  slug: string;
  categorySlug: string;
  name: string;
  summary: string;
  description: string;
  options: { label: string; values: string[] }[]; // e.g. Size: 4, 5, 6
  customisable?: string;                          // e.g. "Flavours customised on request"
  packaging?: string[];                           // undefined renders "on request"
  moq?: string;                                   // undefined renders "on request"
  images: { src: string; alt: string }[];
  status: Status;
  seo: { title: string; description: string };
}

interface Certification {
  name: string;
  number?: string;
  fileSrc?: string;
  status: Status;
}
```

Optional fields stay empty until the client confirms them. The build fails if a `draft` item would be rendered in production.
