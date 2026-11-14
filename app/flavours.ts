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

const bowl = (file: string, alt: string): ProductImage => ({
  src: `/assets/products/bowls/${file}.png`,
  width: 900,
  height: 900,
  alt: `Illustrative product visual of ${alt} in a ceramic bowl`,
  illustrative: true,
});

export const featuredSlides: readonly HeroSlide[] = [
  {
    id: 'flavoured-makhana',
    theme: 'leaf',
    label: 'Roasted & Flavoured Makhana',
    tag: 'MAKHANA',
    title: ['Roasted', 'Makhana.'],
    description: 'Roasted and flavoured makhana for wholesale, private label and export enquiries.',
    href: '/catalog#product-flavoured-makhana',
    seal: ['ROASTED', 'MAKHANA'],
    image: bowl('flavoured-makhana', 'roasted and flavoured makhana'),
  },
  {
    id: 'freeze-dried-black-jamun',
    theme: 'plum',
    label: 'Freeze-Dried Black Jamun',
    tag: 'FREEZE-DRIED FRUITS',
    title: ['Black', 'Jamun.'],
    description: 'Freeze-dried black jamun pieces for wholesale, private label and export enquiries.',
    href: '/catalog#product-freeze-dried-black-jamun',
    seal: ['FREEZE', 'DRIED'],
    image: bowl('freeze-dried-black-jamun', 'freeze-dried black jamun pieces'),
  },
  {
    id: 'freeze-dried-mango-cubes',
    theme: 'gold',
    label: 'Freeze-Dried Mango Cubes',
    tag: 'FREEZE-DRIED FRUITS',
    title: ['Mango', 'Cubes.'],
    description: 'Freeze-dried mango cubes for wholesale, private-label and export enquiries.',
    href: '/catalog#product-freeze-dried-mango-cubes',
    seal: ['FREEZE', 'DRIED'],
    image: bowl('freeze-dried-mango-cubes', 'freeze-dried mango cubes'),
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
    image: bowl('jowar-puffs', 'roasted puffs'),
  },
];
