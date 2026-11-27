// Buyer testimonials.
//
// The entries below are DESIGN PLACEHOLDERS (fictional people, generated portrait avatars) so the
// slider can be reviewed with realistic content. In development they render in full. When there
// are no confirmed quotes, production uses anonymized versions that are explicitly labelled as
// samples (client 2026-11-27); fictional identities and avatars are never published.
//
// When the client supplies real quotes (open question Q25): replace these, use the buyer's
// real name/role/photo with their permission, and set `status: 'confirmed'`.
// Never mark a fictional quote as confirmed.

export type ContentStatus = 'confirmed' | 'draft';

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  /** Role or buyer type, e.g. "Purchase manager". */
  role: string;
  company?: string;
  city?: string;
  /** Square photo, shown in a circle. */
  avatar?: string;
  /** Product or service the quote is about. */
  topic?: string;
  status: ContentStatus;
}

export const testimonials: readonly Testimonial[] = [
  {
    id: 'arjun-distributor',
    quote: 'We needed raw makhana in two sizes for repacking, and the team quoted both within a day. Clear communication from enquiry to dispatch made the repeat order easy.',
    name: 'Arjun Mehta',
    role: 'Purchase manager',
    company: 'Regional distributor',
    city: 'Nagpur',
    avatar: '/assets/testimonials/arjun-distributor.webp',
    topic: 'Makhana',
    status: 'draft',
  },
  {
    id: 'neha-brand',
    quote: 'We sent our product list and expected quantities, and the team kept the sourcing conversation clear from the first enquiry onward.',
    name: 'Neha Kulkarni',
    role: 'Founder',
    company: 'D2C snack brand',
    city: 'Pune',
    avatar: '/assets/testimonials/neha-brand.webp',
    topic: 'Product sourcing',
    status: 'draft',
  },
  {
    id: 'imran-retail',
    quote: 'Getting jowar, quinoa and chickpea puffs from one supplier simplified our healthy-snack shelf. One enquiry, one quotation, one point of contact.',
    name: 'Imran Shaikh',
    role: 'Category buyer',
    company: 'Grocery chain',
    city: 'Mumbai',
    avatar: '/assets/testimonials/imran-retail.webp',
    topic: 'Puffs',
    status: 'draft',
  },
  {
    id: 'priya-horeca',
    quote: 'We use the freeze-dried mango and strawberry in our breakfast bowls. The team helped us choose pack sizes that actually suit a busy kitchen.',
    name: 'Priya Nair',
    role: 'Owner',
    company: 'Café group',
    city: 'Bengaluru',
    avatar: '/assets/testimonials/priya-horeca.webp',
    topic: 'Freeze-dried fruits',
    status: 'draft',
  },
  {
    id: 'karan-corporate',
    quote: 'We enquired about roasted makhana for a corporate requirement. The team understood the quantities and kept communication straightforward.',
    name: 'Karan Malhotra',
    role: 'Director',
    company: 'Corporate procurement company',
    city: 'New Delhi',
    avatar: '/assets/testimonials/karan-corporate.webp',
    topic: 'Corporate',
    status: 'draft',
  },
  {
    id: 'vikram-wholesale',
    quote: 'Consistent quality across orders is what matters to us as a wholesaler. Pricing was transparent from the very first quotation.',
    name: 'Vikram Joshi',
    role: 'Proprietor',
    company: 'Dry fruit wholesaler',
    city: 'Indore',
    avatar: '/assets/testimonials/vikram-wholesale.webp',
    topic: 'Wholesale',
    status: 'draft',
  },
  {
    id: 'ananya-brand',
    quote: 'Freeze-dried black jamun was hard to find. Saatvik reviewed the product requirement and quantity for our trail-mix business.',
    name: 'Ananya Rao',
    role: 'Co-founder',
    company: 'Nutrition brand',
    city: 'Hyderabad',
    avatar: '/assets/testimonials/ananya-brand.webp',
    topic: 'Freeze-dried fruits',
    status: 'draft',
  },
  {
    id: 'sana-import',
    quote: 'Documents and packing details were shared before our trial lot even left. A responsive team to work with for sourcing from India.',
    name: 'Sana Qureshi',
    role: 'Procurement lead',
    company: 'Food importer',
    city: 'Dubai',
    avatar: '/assets/testimonials/sana-import.webp',
    topic: 'Export',
    status: 'draft',
  },
];

export const showDraftContent =
  process.env.NODE_ENV !== 'production' || process.env.NEXT_PUBLIC_SHOW_DRAFT_CONTENT === 'true';

/** Testimonials allowed on screen in the current environment. */
export function visibleTestimonials(): Testimonial[] {
  return testimonials.filter(item => item.status === 'confirmed' || showDraftContent);
}

/**
 * Drafts shown on the live site as clearly labelled samples (client 2026-11-27, option 2) until real quotes
 * exist. Personal details are removed: no name, city or photo, only the buyer type.
 */
export function sampleTestimonials(): Testimonial[] {
  return testimonials
    .filter(item => item.status === 'draft')
    .map(({ id, quote, company, role, topic }) => ({ id, quote, name: company ?? role, role: 'Sample quote', topic, status: 'draft' }));
}

export interface TestimonialDisplay {
  items: Testimonial[];
  isSample: boolean;
}

/**
 * Testimonials to render on public pages. Confirmed quotes always take priority. Development and
 * flagged previews retain the full draft cards; production falls back to labelled, anonymized
 * samples so the section remains visible without presenting fictional people as customers.
 */
export function testimonialDisplay(): TestimonialDisplay {
  const visible = visibleTestimonials();
  const confirmed = visible.filter(item => item.status === 'confirmed');

  if (confirmed.length > 0) return { items: confirmed, isSample: false };
  if (showDraftContent) return { items: visible, isSample: false };

  return { items: sampleTestimonials(), isSample: true };
}
