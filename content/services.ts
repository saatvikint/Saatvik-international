// Services content (client 2026-11-20: "private label needs to be more descriptive", "corporate & bulk same",
// "packaging options need description with photos", "all packaging will be nitrogen flushed").
// Facts come from .agent/client/: company-profile.md (private label, target customers), 2026-11-16 feedback
// (packing formats, food grade, low MOQ, corporate offers) and 2026-11-20 notes. Nothing here promises lead
// times, label design, FSSAI labelling or MOQ figures (Q12, Q15).
// Images: drop files at these paths in /public; until then the page shows a "photo coming soon" tile.
import type { SlotImage } from '@/app/image-slot';

export const privateLabel = {
  intro:
    'Launch your own snack brand without building a factory. We help businesses launch their own snack brands by providing farm-sourced products, customised packaging, private-label supply and logistic support across India and for export.',
  offers: [
    // Client 2026-11-25: raw material sourced from farmers; manufacturing coordination removed; logistic support added.
    { icon: 'leaf', title: 'Product sourcing', text: 'For all our products, the raw material is sourced from farmers, fresh and of the topmost quality.' },
    { icon: 'sparkle', title: 'Flavour & seasoning', text: 'Choose from 15 flavours across makhana and puffs, or brief us on the taste profile you want.' },
    { icon: 'package-check', title: 'Customised packaging', text: 'Your brand on pouches, stand-up pouches, pillow pouches, jars or bulk packs. All food grade and nitrogen flushed.' },
    { icon: 'truck', title: 'Logistic support', text: 'Pan-India delivery and exports, so your private-label stock reaches you wherever you sell.' },
  ],
  steps: [
    { title: 'Share your brief', text: 'Tell us the product, flavour, pack format, quantity and target market.' },
    { title: 'Choose the product', text: 'Pick grades and flavours from our range, or ask for a custom seasoning.' },
    { title: 'Pick the packaging', text: 'Select a pack format and share your brand artwork for the pack.' },
    { title: 'Quotation & supply', text: 'We confirm the minimum quantity, pack sizes and price in your quotation, then supply.' },
  ],
  forWho: ['Food brands & startups', 'Private-label brand owners', 'Supermarkets & retail chains', 'Grocery & FMCG businesses', 'Exporters & importers'],
  image: {
    src: '/assets/services/private-label-pouches.jpg',
    alt: 'Stand-up pouches of makhana, puffs and freeze-dried fruit on colourful blocks',
    label: 'Private-label pack range',
  } satisfies SlotImage,
};

export interface PackagingFormat {
  id: string;
  icon: 'pouch' | 'standup-pouch' | 'pillow-pouch' | 'jar' | 'bulk-pack';
  name: string;
  text: string;
  bestFor: string;
  note?: string;
  image: SlotImage;
}

export const packagingFormats: PackagingFormat[] = [
  {
    id: 'pouches', icon: 'pouch', name: 'Pouches',
    text: 'Flat, lightweight pouches that are easy to stock, display and ship.',
    bestFor: 'Single-serve packs, vending and retail',
    image: { src: '/assets/packaging/pouch.jpg', alt: 'Flat snack pouch', label: 'Flat pouch' },
  },
  {
    id: 'stand-up-pouches', icon: 'standup-pouch', name: 'Stand-up pouches',
    text: 'Pouches with a base gusset that stand upright on the shelf, with a large front panel for your branding.',
    bestFor: 'Retail shelves and private-label brands',
    image: { src: '/assets/packaging/stand-up-pouch.jpg', alt: 'Stand-up snack pouch', label: 'Stand-up pouch' },
  },
  {
    id: 'pillow-pouches', icon: 'pillow-pouch', name: 'Pillow pouches',
    text: 'The classic chip-style pack, cushioned with nitrogen to protect light, crunchy snacks.',
    bestFor: 'Puffs and flavoured makhana',
    image: { src: '/assets/packaging/pillow-pouch.jpg', alt: 'Pillow pouch snack pack', label: 'Pillow pouch' },
  },
  {
    id: 'jars', icon: 'jar', name: 'Jars',
    text: 'Clear, rigid jars that show the product inside, for premium retail and gifting.',
    bestFor: 'Makhana and freeze-dried fruits, gift packs',
    note: 'Not offered for puffs.',
    image: { src: '/assets/packaging/jar.jpg', alt: 'Clear snack jar', label: 'Jar' },
  },
  {
    id: 'bulk-aluminium-pouches', icon: 'bulk-pack', name: 'Bulk aluminium pouches',
    text: 'Large aluminium pouches for bulk quantities, repacking and food service.',
    bestFor: 'Distributors, HORECA and B2B supply',
    image: { src: '/assets/packaging/bulk-aluminium-pouch.jpg', alt: 'Bulk aluminium snack pouch', label: 'Bulk aluminium pouch' },
  },
];

export const packagingPromises = ['Every pack nitrogen flushed', 'Food-grade packing', 'Better shelf life across categories', 'Pack sizes confirmed per enquiry'];

export interface Segment {
  id: string;
  icon: 'building' | 'hotel' | 'store' | 'gift' | 'globe' | 'coffee' | 'package';
  title: string;
  text: string;
  points: string[];
  image: SlotImage;
}

/** Corporate & bulk buyers. Segments from the client's target-customer list and 2026-11-16 corporate offers. */
export const corporateSegments: Segment[] = [
  {
    id: 'pantry-vending', icon: 'coffee', title: 'Corporate pantry & vending',
    text: 'Keep office pantries, cafeterias and vending machines stocked with makhana, roasted puffs and freeze-dried fruits instead of fried snacks.',
    points: ['Mixed range for pantries and cafeterias', 'Pack formats suited to vending', 'Repeat supply discussed per requirement'],
    image: { src: '/assets/services/corporate-pantry.jpg', alt: 'Office pantry stocked with healthy snacks', label: 'Office pantry / cafeteria' },
  },
  {
    id: 'horeca', icon: 'hotel', title: 'Hotels, restaurants & cafés (HORECA)',
    text: 'Bulk packs for hotel chains, restaurants, cafés, caterers and institutional kitchens: in-room snacks, bar bites, buffets and menu ingredients.',
    points: ['Bulk aluminium pouches for kitchens', 'Flavoured makhana and puffs for bar and room service', 'Freeze-dried fruit for desserts, cereals and beverages'],
    image: { src: '/assets/services/horeca-hotel.jpg', alt: 'Hotel or restaurant serving snacks', label: 'Hotel / restaurant / café' },
  },
  {
    id: 'gifting', icon: 'gift', title: 'Corporate gifting',
    text: 'Healthy snack hampers and gift packs for Diwali, new year, and employee or client gifting, put together for your quantity and occasion.',
    points: ['Curated mixes across categories', 'Gift-pack options for your brand', 'Bulk quantities for teams and clients'],
    image: { src: '/assets/services/corporate-gifting.jpg', alt: 'Snack gift hamper', label: 'Corporate gift hamper' },
  },
  {
    id: 'custom-bulk', icon: 'store', title: 'Distributors, retail & bulk orders',
    text: 'Bulk orders built around your product mix, flavours, packing and quantities, for distributors, wholesalers, supermarkets and food brands.',
    points: ['Choose products and flavours', 'Bulk or private-label packing', 'One quotation for the full list'],
    image: { src: '/assets/services/bulk-distribution.jpg', alt: 'Bulk snack cartons ready for dispatch', label: 'Bulk cartons / warehouse' },
  },
];
