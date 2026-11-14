// Product catalogue. Data only: safe to import from server routes and client components.
// Source of truth: .agent/client/product-notes.md.
// Never add prices. Current images are labelled illustrative visuals, not client product photography.

export type CategoryId = 'makhana' | 'puffs' | 'freeze-dried-fruits';

export interface ProductImage {
  src: string;
  width: number;
  height: number;
  alt: string;
  illustrative?: boolean;
}

export interface Category {
  id: CategoryId;
  name: string;
  /** Short label for stickers and chips. */
  shortName: string;
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
  /** Short, product-specific descriptor (size, cut, form) shown on the card pill and chips. */
  mood: string;
  note: string;
  tint: string;
  image?: ProductImage;
}

const bowl = (file: string, alt: string): ProductImage => ({
  src: `/assets/products/bowls/${file}.png`,
  width: 900,
  height: 900,
  alt: `Illustrative product visual of ${alt} in a ceramic bowl`,
  illustrative: true,
});

export const categories: readonly Category[] = [
  {
    id: 'makhana',
    name: 'Makhana',
    shortName: 'Makhana',
    summary: 'Raw makhana in sizes 4, 5 and 6, plus roasted and flavoured makhana.',
    tagline: ['Raw, sizes 4 to 6', 'Roasted & flavoured'],
    tint: '#f3ecdb',
    image: bowl('raw-makhana', 'raw makhana'),
  },
  {
    id: 'puffs',
    name: 'Puffs',
    shortName: 'Puffs',
    summary: 'Roasted millet, jowar, quinoa and chickpea puffs for bulk supply and private label.',
    tagline: ['Millet · Jowar', 'Quinoa · Chickpea'],
    tint: '#ffe5a1',
    image: bowl('jowar-puffs', 'roasted puffs'),
  },
  {
    id: 'freeze-dried-fruits',
    name: 'Freeze-Dried Fruits',
    shortName: 'Freeze-dried',
    summary: 'Black jamun, strawberry, banana, mango and pineapple, freeze-dried to keep their shape and colour.',
    tagline: ['Jamun · Mango', 'Banana · Pineapple', '& Strawberry'],
    tint: '#fbd1c5',
    image: bowl('freeze-dried-mango-cubes', 'freeze-dried mango cubes'),
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
    image: bowl('raw-makhana', 'raw makhana'),
  },
  {
    id: 'flavoured-makhana',
    name: 'Roasted & Flavoured Makhana',
    category: 'makhana',
    mood: 'Roasted',
    note: 'Roasted and flavoured makhana for B2B supply enquiries.',
    tint: '#ffe5a1',
    image: bowl('flavoured-makhana', 'roasted and flavoured makhana'),
  },
  {
    id: 'jowar-puffs',
    name: 'Jowar Puffs',
    category: 'puffs',
    mood: 'Roasted',
    note: 'Roasted jowar (sorghum) puffs for bulk and private label.',
    tint: '#ffe5a1',
    image: bowl('jowar-puffs', 'roasted jowar puffs'),
  },
  {
    id: 'millet-puffs',
    name: 'Millet Roasted Puffs',
    category: 'puffs',
    mood: 'Roasted',
    note: 'Roasted millet puffs for bulk and private label.',
    tint: '#f6dcb4',
    image: bowl('millet-puffs', 'roasted millet puffs'),
  },
  {
    id: 'quinoa-puffs',
    name: 'Quinoa Puffs',
    category: 'puffs',
    mood: 'Roasted',
    note: 'Roasted quinoa puffs for bulk and private label.',
    tint: '#eef0cf',
    image: bowl('quinoa-puffs', 'roasted quinoa puffs'),
  },
  {
    id: 'chickpea-puffs',
    name: 'Chickpea Puffs',
    category: 'puffs',
    mood: 'Roasted',
    note: 'Roasted chickpea puffs for bulk and private label.',
    tint: '#ffd9a8',
    image: bowl('chickpea-puffs', 'roasted chickpea puffs'),
  },
  {
    id: 'freeze-dried-black-jamun',
    name: 'Freeze-Dried Black Jamun',
    category: 'freeze-dried-fruits',
    mood: 'Pieces',
    note: 'Black jamun pieces, freeze-dried.',
    tint: '#ead2e6',
    image: bowl('freeze-dried-black-jamun', 'freeze-dried black jamun pieces'),
  },
  {
    id: 'freeze-dried-strawberry-slices',
    name: 'Freeze-Dried Strawberry Slices',
    category: 'freeze-dried-fruits',
    mood: 'Slices',
    note: 'Strawberry slices, freeze-dried.',
    tint: '#fbd1c5',
    image: bowl('freeze-dried-strawberry-slices', 'freeze-dried strawberry slices'),
  },
  {
    id: 'freeze-dried-banana-slices',
    name: 'Freeze-Dried Banana Slices',
    category: 'freeze-dried-fruits',
    mood: 'Slices',
    note: 'Banana slices, freeze-dried.',
    tint: '#f7efcf',
    image: bowl('freeze-dried-banana-slices', 'freeze-dried banana slices'),
  },
  {
    id: 'freeze-dried-mango-cubes',
    name: 'Freeze-Dried Mango Cubes',
    category: 'freeze-dried-fruits',
    mood: 'Cubes',
    note: 'Mango cubes, freeze-dried.',
    tint: '#ffe0a6',
    image: bowl('freeze-dried-mango-cubes', 'freeze-dried mango cubes'),
  },
  {
    id: 'freeze-dried-pineapple-slices',
    name: 'Freeze-Dried Pineapple Slices',
    category: 'freeze-dried-fruits',
    mood: 'Slices',
    note: 'Pineapple slices, freeze-dried.',
    tint: '#f6f0c4',
    image: bowl('freeze-dried-pineapple-slices', 'freeze-dried pineapple slices'),
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
