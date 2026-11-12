import type { ProductImage } from '@/content/catalogue';

export type HeroTheme = 'plum' | 'gold' | 'coral' | 'leaf';

export interface HeroSlide {
  id: string;
  theme: HeroTheme;
  label: string;
  tag: string;
  title: [string, string];
  description: string;
  href: string;
  seal: [string, string];
  image: ProductImage;
}

// Only products with a real photo can lead the hero. Makhana joins once the client sends photos.
export const featuredSlides: readonly HeroSlide[] = [
  {
    id: 'freeze-dried-black-jamun',
    theme: 'plum',
    label: 'Freeze-Dried Black Jamun',
    tag: 'FREEZE-DRIED FRUITS',
    title: ['Black', 'Jamun.'],
    description: 'Freeze-dried black jamun pieces for wholesale, private label and export enquiries.',
    href: '/catalog#product-freeze-dried-black-jamun',
    seal: ['FREEZE', 'DRIED'],
    image: { src: '/assets/products/freeze-dried-black-jamun.webp', width: 1200, height: 900, alt: 'Freeze-dried black jamun pieces in a glass bowl' },
  },
  {
    id: 'freeze-dried-mango-cubes',
    theme: 'gold',
    label: 'Freeze-Dried Mango Cubes',
    tag: 'FREEZE-DRIED FRUITS',
    title: ['Mango', 'Cubes.'],
    description: 'Freeze-dried mango cubes, supplied in bulk and for your own brand.',
    href: '/catalog#product-freeze-dried-mango-cubes',
    seal: ['FREEZE', 'DRIED'],
    image: { src: '/assets/products/freeze-dried-mango-cubes.webp', width: 1200, height: 900, alt: 'Freeze-dried mango cubes in a glass bowl' },
  },
  {
    id: 'puffs',
    theme: 'coral',
    label: 'Roasted Puffs',
    tag: 'MILLET · JOWAR · QUINOA · CHICKPEA',
    title: ['Roasted', 'Puffs.'],
    description: 'Millet, jowar, quinoa and chickpea puffs for bulk supply and private label.',
    href: '/catalog#category-puffs',
    seal: ['ROASTED', 'PUFFS'],
    image: { src: '/assets/products/puffs-curls.webp', width: 1000, height: 800, alt: 'Roasted puffs on a white plate' },
  },
  {
    id: 'freeze-dried-banana-slices',
    theme: 'leaf',
    label: 'Freeze-Dried Banana Slices',
    tag: 'FREEZE-DRIED FRUITS',
    title: ['Banana', 'Slices.'],
    description: 'Freeze-dried banana slices for wholesale, private label and export enquiries.',
    href: '/catalog#product-freeze-dried-banana-slices',
    seal: ['FREEZE', 'DRIED'],
    image: { src: '/assets/products/freeze-dried-banana-slices.webp', width: 1200, height: 1058, alt: 'Freeze-dried banana slices in a glass bowl' },
  },
];
