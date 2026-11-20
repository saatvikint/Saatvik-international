// Product-page content (team reference 2026-11-16: one detail page per product).
// Facts only from .agent/client/: no prices, MOQs, nutrition or shelf-life numbers.
import { categoryOf, type CategoryId, type Product } from './catalogue';
import type { Flavour } from './flavours';
import { makhanaGrades } from './makhana-grades';
import { makhanaFlavourIntro, makhanaFlavours } from './makhana-flavours';
import { puffRanges } from './puffs';

export interface GalleryImage {
  src: string;
  width: number;
  height: number;
  alt: string;
  /** Close-up cut-out shown on a coloured tile (contain), vs a photo that fills the tile (cover). */
  fit: 'contain' | 'cover';
  caption?: string;
}

/** Packing formats and promises supplied by the client on 2026-11-16. */
export const packingFormats = ['Pouches', 'Stand-up pouches', 'Pillow pouches', 'Jars', 'Bulk aluminium pouches'] as const;
/** Formats offered per category. Client 2026-11-20: no jars for puffs. */
export const packingFormatsFor = (category: CategoryId): string[] =>
  category === 'puffs' ? packingFormats.filter(format => format !== 'Jars') : [...packingFormats];
export const packingPromises = ['All food-grade packing', 'Nitrogen-flushed', 'Better shelf life across product categories'] as const;

export const enquiryTypes = [
  { id: 'bulk', label: 'Bulk supply', detail: 'Wholesale, distribution, HORECA and export' },
  { id: 'private-label', label: 'Private label', detail: 'Your brand on the pack' },
  { id: 'corporate', label: 'Corporate & gifting', detail: 'Pantry, vending and gift packs' },
] as const;

/** Freeze-drying explanation: client text 2026-11-20 (.agent/client/2026-11-20-product-changes.md), lightly edited. */
export const freezeDryingIntro =
  'Freeze-drying is a food preservation process in which moisture is removed from a product while maintaining its shape, flavour, colour and nutritional value.';
export const freezeDryingSteps = [
  { title: 'Freeze', text: 'The product is frozen.' },
  { title: 'Sublimation', text: 'The frozen product is placed in a vacuum chamber, where ice turns directly into water vapour.' },
  { title: 'Final drying', text: 'Remaining moisture is removed to achieve a very low moisture content.' },
] as const;

const piece = (file: string, alt: string): GalleryImage => ({ src: `/assets/decor/single-${file}.webp`, width: 420, height: 420, alt, fit: 'contain' });
const photo = (src: string, alt: string, caption?: string): GalleryImage => ({ src, width: 900, height: 900, alt, fit: 'cover', caption });

/** Close-up of a single piece, per product. */
const closeUps: Record<string, GalleryImage> = {
  'raw-makhana': piece('raw-makhana', 'Close-up of a single raw makhana'),
  'flavoured-makhana': piece('flavoured-makhana', 'Close-up of a single flavoured makhana'),
  'jowar-puffs': piece('puff-disc', 'Close-up of a single round puff'),
  'quinoa-puffs': piece('puff-cube', 'Close-up of a single cube puff'),
  'chickpea-puffs': piece('puff-curl', 'Close-up of a single curl puff'),
  'freeze-dried-black-jamun': piece('black-jamun', 'Close-up of a freeze-dried black jamun piece'),
  'freeze-dried-strawberry-slices': piece('strawberry-slice', 'Close-up of a freeze-dried strawberry slice'),
  'freeze-dried-banana-slices': piece('banana-slice', 'Close-up of a freeze-dried banana slice'),
  'freeze-dried-mango-cubes': piece('mango-cube', 'Close-up of a freeze-dried mango cube'),
  'freeze-dried-pineapple-slices': piece('pineapple-ring', 'Close-up of a freeze-dried pineapple ring'),
};

/** Client photos. Puff photos are not matched to products yet (Q22), so they are labelled as range photos. */
const photos: Record<string, GalleryImage> = {
  'freeze-dried-black-jamun': photo('/assets/products/freeze-dried-black-jamun.webp', 'Freeze-dried black jamun pieces'),
  'freeze-dried-banana-slices': photo('/assets/products/freeze-dried-banana-slices.webp', 'Freeze-dried banana slices'),
  'freeze-dried-mango-cubes': photo('/assets/products/freeze-dried-mango-cubes.webp', 'Freeze-dried mango cubes'),
  'freeze-dried-pineapple-slices': photo('/assets/products/freeze-dried-pineapple-slices.webp', 'Freeze-dried pineapple slices'),
  'jowar-puffs': photo('/assets/products/puffs-round-assorted.webp', 'Assorted round puffs from the puffs range', 'From our puffs range'),
  'quinoa-puffs': photo('/assets/products/puffs-cubes.webp', 'Cube puffs from the puffs range', 'From our puffs range'),
  'chickpea-puffs': photo('/assets/products/puffs-curls.webp', 'Curl puffs from the puffs range', 'From our puffs range'),
  'raw-makhana': photo('/assets/about/lifestyle-makhana.webp', 'A bowl of makhana on a table', 'Makhana, ready to snack'),
  'flavoured-makhana': photo('/assets/about/lifestyle-makhana.webp', 'A bowl of flavoured makhana on a table', 'Makhana, ready to snack'),
};

/**
 * Per-product page colours (client 2026-11-16: "each product needs a different colour").
 * bg: light page container · tile: saturated image tiles · title: heading colour on bg.
 * Each pair is chosen to suggest the product; titles stay above 7:1 on their bg.
 */
export interface ProductTheme { bg: string; tile: string; title: string; onTile: string }

export const productThemes: Record<string, ProductTheme> = {
  'raw-makhana': { bg: '#f6ecd6', tile: '#d9bf8c', title: '#5c3519', onTile: '#3b2210' },
  'flavoured-makhana': { bg: '#ffe2d6', tile: '#e4512c', title: '#7e1f0f', onTile: '#fff6e8' },
  'jowar-puffs': { bg: '#d5ebe5', tile: '#176b5f', title: '#0d453d', onTile: '#fff6e8' },
  'quinoa-puffs': { bg: '#e6f0d2', tile: '#6b8e2e', title: '#2f4410', onTile: '#fff6e8' },
  'chickpea-puffs': { bg: '#fde6cf', tile: '#b5562a', title: '#62250c', onTile: '#fff6e8' },
  'freeze-dried-black-jamun': { bg: '#efdff3', tile: '#5b2a6e', title: '#45195a', onTile: '#fff6e8' },
  'freeze-dried-strawberry-slices': { bg: '#ffe0e4', tile: '#d4344a', title: '#86101f', onTile: '#fff6e8' },
  'freeze-dried-banana-slices': { bg: '#fff4c7', tile: '#f0c22e', title: '#5e4700', onTile: '#3a2c00' },
  'freeze-dried-mango-cubes': { bg: '#ffe8c8', tile: '#f08a1a', title: '#7a3a00', onTile: '#2f1600' },
  'freeze-dried-pineapple-slices': { bg: '#e5f2d4', tile: '#3d8b48', title: '#1f5226', onTile: '#fff6e8' },
};

const fallbackTheme: ProductTheme = { bg: '#ffe3f8', tile: '#ffaaf1', title: '#4f227c', onTile: '#461025' };
export const themeFor = (id: string): ProductTheme => productThemes[id] ?? fallbackTheme;

export interface ProductDetail {
  subtitle: string;
  description: string[];
  badges: [string, string, string];
  closeUp?: GalleryImage;
  photo?: GalleryImage;
  grades?: typeof makhanaGrades;
  flavours?: Flavour[];
  /** Line under the flavour list. */
  flavourNote?: string;
  packing: string[];
  freezeDried: boolean;
}

export function productDetail(product: Product): ProductDetail {
  const category = categoryOf(product);
  const base = { closeUp: closeUps[product.id], photo: photos[product.id], packing: packingFormatsFor(product.category) };
  if (product.id === 'raw-makhana') {
    return {
      ...base,
      subtitle: 'Makhana · 4, 5, 6 & 7 Sutta',
      description: [
        'Raw fox nuts (makhana) in four grades, from compact 4 sutta kernels for food processing to extra-large 7 sutta kernels for premium-grade requirements.',
        'Supplied in bulk for roasting, flavouring, retail packing and export.',
      ],
      badges: ['4 to 7 Sutta', 'No palm oil', 'Nitrogen flushed'],
      grades: makhanaGrades,
      freezeDried: false,
    };
  }
  if (product.category === 'makhana') {
    return {
      ...base,
      subtitle: `Makhana · ${makhanaFlavours.length} flavours`,
      description: [makhanaFlavourIntro],
      badges: [`${makhanaFlavours.length} flavours`, 'No palm oil', 'Nitrogen flushed'],
      flavours: makhanaFlavours,
      flavourNote: 'Taste profiles, seasoning and makhana quality are customised to your requirements.',
      freezeDried: false,
    };
  }
  if (product.category === 'puffs') {
    const range = puffRanges[product.id];
    const flavours = range?.flavours ?? [];
    return {
      ...base,
      subtitle: `Millet-based puffs · ${flavours.length} flavours`,
      description: [
        range?.description ?? `${product.name}, light and crunchy.`,
        'For bulk supply, private label, vending and corporate packs. Pack formats are confirmed for each enquiry.',
      ],
      badges: [`${flavours.length} flavours`, 'No palm oil', 'Nitrogen flushed'],
      flavours,
      flavourNote: 'Flavours and seasoning can be customised to your requirements.',
      freezeDried: false,
    };
  }
  const fruit = product.name.replace('Freeze-Dried ', '').toLowerCase();
  return {
    ...base,
    subtitle: `${category.name} · ${product.mood}`,
    description: [
      `Freeze-dried ${fruit}: the water leaves as vapour without high heat, so the fruit keeps much of its shape, colour and aroma, with a light, crisp bite.`,
      'Suited to snack packs, cereals, baking, confectionery, beverage mixes and café use.',
    ],
    badges: ['Freeze dried', 'No palm oil', 'Nitrogen flushed'],
    freezeDried: true,
  };
}
