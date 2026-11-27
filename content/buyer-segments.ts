// "Who we supply" cards on the home page, shown in the testimonials slot until real buyer quotes are approved.
// Buyer types come from the client's target-customer list. Products, packing and services use only wording
// already confirmed on the site (catalogue, packing formats, services). No quotes, names or numbers.
import type { IconName } from '@/app/visuals';

export interface BuyerSegment {
  id: string;
  icon: IconName;
  title: string;
  text: string;
  /** What this buyer typically enquires about. */
  orders: string[];
  topic: string;
}

export const buyerSegments: readonly BuyerSegment[] = [
  {
    id: 'distributors', icon: 'truck', title: 'Distributors & wholesalers',
    text: 'Bulk supply for regional distribution and repacking, quoted for the full product list in one go.',
    orders: ['Raw makhana by sutta grade', 'Flavoured makhana and puffs', 'Bulk aluminium pouches'],
    topic: 'Wholesale',
  },
  {
    id: 'retail', icon: 'store', title: 'Supermarkets & retail chains',
    text: 'Shelf-ready healthy snacks across makhana, millet-based puffs and freeze-dried fruits.',
    orders: ['Pouches, stand-up pouches and jars', 'Mixed range across categories', 'Food-grade, nitrogen-flushed packing'],
    topic: 'Retail',
  },
  {
    id: 'horeca', icon: 'hotel', title: 'Hotels, restaurants & cafés',
    text: 'Bulk packs for hotel chains, restaurants, cafés, caterers and institutional kitchens.',
    orders: ['In-room snacks and bar bites', 'Buffets and menu ingredients', 'Freeze-dried fruit for desserts and beverages'],
    topic: 'HORECA',
  },
  {
    id: 'pantry', icon: 'coffee', title: 'Corporate pantry & vending',
    text: 'Office pantries, cafeterias and vending machines stocked with makhana, roasted puffs and freeze-dried fruits instead of fried snacks.',
    orders: ['Mixed range for pantries and cafeterias', 'Pack formats suited to vending', 'Repeat supply discussed per requirement'],
    topic: 'Corporate',
  },
  {
    id: 'gifting', icon: 'gift', title: 'Corporate gifting',
    text: 'Healthy snack hampers and gift packs for Diwali, new year, and employee or client gifting.',
    orders: ['Curated mixes across categories', 'Gift-pack options for your brand', 'Bulk quantities for teams and clients'],
    topic: 'Gifting',
  },
  {
    id: 'private-label', icon: 'package', title: 'Food brands & private label',
    text: 'Your brand on the pack, with raw material sourced from farmers, fresh and of top quality.',
    orders: ['Choose the product and flavour', 'Pick the pack format', 'Share your artwork for the pack'],
    topic: 'Private label',
  },
  {
    id: 'export', icon: 'globe', title: 'Importers & exporters',
    text: 'Export enquiries for makhana, puffs and freeze-dried fruits, in food-grade packing for a better shelf life.',
    orders: ['Nitrogen-flushed packing', 'Bulk and private-label options', 'Pan-India delivery and exports'],
    topic: 'Export',
  },
];
