// Product catalogue. Data only: safe to import from server routes and client components.
// Source of truth: .agent/client/product-notes.md and the 2026-11-12 photo set.
// Never add prices. Leave an image out rather than using a photo of a different product.

export type CategoryId = 'makhana' | 'puffs' | 'freeze-dried-fruits';

export interface ProductImage {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export interface Category {
  id: CategoryId;
  name: string;
  summary: string;
  /** Short lines for the category card, from the client's product list. */
  tagline: string[];
  tint: string;
  /** Category-level photo. Only used where it is honest at category level. */
  image?: ProductImage;
}

interface ProductData {
  id: string;
  name: string;
  category: CategoryId;
  /** Short descriptor shown on chips and in the corporate selector. */
  mood: string;
  note: string;
  tint: string;
  image?: ProductImage;
}

const photo = (file: string, width: number, height: number, alt: string): ProductImage => ({
  src: `/assets/products/${file}.webp`, width, height, alt,
});

export const categories: readonly Category[] = [
  {
    id: 'makhana',
    name: 'Makhana',
    summary: 'Raw makhana in sizes 4, 5 and 6, plus roasted makhana with flavours customised to your brief.',
    tagline: ['Raw, sizes 4 to 6', 'Roasted & flavoured'],
    tint: '#f3ecdb',
  },
  {
    id: 'puffs',
    name: 'Puffs',
    summary: 'Roasted millet, jowar, quinoa and chickpea puffs for bulk supply and private label.',
    tagline: ['Millet · Jowar', 'Quinoa · Chickpea'],
    tint: '#ffe5a1',
    image: photo('puffs-curls', 1000, 800, 'Roasted puffs on a white plate'),
  },
  {
    id: 'freeze-dried-fruits',
    name: 'Freeze-Dried Fruits',
    summary: 'Black jamun, strawberry, banana, mango and pineapple, freeze-dried to keep their shape and colour.',
    tagline: ['Jamun · Mango', 'Banana · Pineapple', '& Strawberry'],
    tint: '#fbd1c5',
    image: photo('freeze-dried-mango-cubes', 1200, 900, 'Freeze-dried mango cubes in a glass bowl'),
  },
];

const catalogue = [
  {
    id: 'raw-makhana',
    name: 'Raw Makhana',
    category: 'makhana',
    mood: 'Sizes 4, 5 & 6',
    note: 'Raw fox nuts supplied in sizes 4, 5 and 6.',
    tint: '#f3ecdb',
  },
  {
    id: 'flavoured-makhana',
    name: 'Roasted & Flavoured Makhana',
    category: 'makhana',
    mood: 'Custom flavours',
    note: 'Roasted makhana with flavours customised to your brief.',
    tint: '#ffe5a1',
  },
  {
    id: 'jowar-puffs',
    name: 'Jowar Puffs',
    category: 'puffs',
    mood: 'Roasted puffs',
    note: 'Roasted jowar (sorghum) puffs for bulk and private label.',
    tint: '#ffe5a1',
  },
  {
    id: 'millet-puffs',
    name: 'Millet Roasted Puffs',
    category: 'puffs',
    mood: 'Roasted puffs',
    note: 'Roasted millet puffs for bulk and private label.',
    tint: '#f6dcb4',
  },
  {
    id: 'quinoa-puffs',
    name: 'Quinoa Puffs',
    category: 'puffs',
    mood: 'Roasted puffs',
    note: 'Roasted quinoa puffs for bulk and private label.',
    tint: '#eef0cf',
  },
  {
    id: 'chickpea-puffs',
    name: 'Chickpea Puffs',
    category: 'puffs',
    mood: 'Roasted puffs',
    note: 'Roasted chickpea puffs for bulk and private label.',
    tint: '#ffd9a8',
  },
  {
    id: 'freeze-dried-black-jamun',
    name: 'Freeze-Dried Black Jamun',
    category: 'freeze-dried-fruits',
    mood: 'Freeze-dried',
    note: 'Black jamun pieces, freeze-dried.',
    tint: '#ead2e6',
    image: photo('freeze-dried-black-jamun', 1200, 900, 'Freeze-dried black jamun pieces in a glass bowl beside a ruler'),
  },
  {
    id: 'freeze-dried-strawberry-slices',
    name: 'Freeze-Dried Strawberry Slices',
    category: 'freeze-dried-fruits',
    mood: 'Freeze-dried',
    note: 'Strawberry slices, freeze-dried.',
    tint: '#fbd1c5',
  },
  {
    id: 'freeze-dried-banana-slices',
    name: 'Freeze-Dried Banana Slices',
    category: 'freeze-dried-fruits',
    mood: 'Freeze-dried',
    note: 'Banana slices, freeze-dried.',
    tint: '#f7efcf',
    image: photo('freeze-dried-banana-slices', 1200, 1058, 'Freeze-dried banana slices in a glass bowl'),
  },
  {
    id: 'freeze-dried-mango-cubes',
    name: 'Freeze-Dried Mango Cubes',
    category: 'freeze-dried-fruits',
    mood: 'Freeze-dried',
    note: 'Mango cubes, freeze-dried.',
    tint: '#ffe0a6',
    image: photo('freeze-dried-mango-cubes', 1200, 900, 'Freeze-dried mango cubes in a glass bowl'),
  },
  {
    id: 'freeze-dried-pineapple-slices',
    name: 'Freeze-Dried Pineapple Slices',
    category: 'freeze-dried-fruits',
    mood: 'Freeze-dried',
    note: 'Pineapple slices, freeze-dried.',
    tint: '#f6f0c4',
    image: photo('freeze-dried-pineapple-slices', 500, 333, 'Freeze-dried pineapple slices in a glass bowl'),
  },
] as const satisfies readonly ProductData[];

export type ProductId = (typeof catalogue)[number]['id'];

export interface Product extends ProductData {
  id: ProductId;
}

export const products: readonly Product[] = catalogue;

export const productIds: ReadonlySet<string> = new Set(products.map(product => product.id));

export function categoryOf(product: Product): Category {
  return categories.find(category => category.id === product.category) ?? categories[0];
}
