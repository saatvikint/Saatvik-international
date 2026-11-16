// Flavoured makhana range, supplied by the client on 2026-11-16 (.agent/client/2026-11-16-makhana-flavours-grades.md).
// Dot colours are design choices that hint at each seasoning; they are not product claims.

export interface Flavour {
  id: string;
  name: string;
  colour: string;
}

export const makhanaFlavourIntro =
  'Explore our range of flavoured makhana, carefully processed and seasoned to deliver a delicious crunch with every bite. Available in a variety of flavours, with taste profiles, seasoning and makhana quality customised to meet specific buyer requirements.';

export const makhanaFlavours: Flavour[] = [
  { id: 'peri-peri', name: 'Peri Peri', colour: '#e0412b' },
  { id: 'cheese', name: 'Cheese', colour: '#f5b72f' },
  { id: 'tomato', name: 'Tomato', colour: '#c62f22' },
  { id: 'pudina', name: 'Pudina / Mint', colour: '#3d9a5a' },
  { id: 'cream-onion', name: 'Cream and Onion', colour: '#cfe3a3' },
  { id: 'salt-pepper', name: 'Salt and Pepper', colour: '#8c8279' },
  { id: 'himalayan-pink-salt', name: 'Himalayan Pink Salt', colour: '#f3a6b6' },
  { id: 'classic-masala', name: 'Classic Masala', colour: '#c7712a' },
];
