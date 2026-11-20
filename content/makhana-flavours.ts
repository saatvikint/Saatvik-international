// Flavoured makhana range, supplied by the client on 2026-11-16 (.agent/client/2026-11-16-makhana-flavours-grades.md).
// Flavour names, colours and taste notes live in ./flavours.ts.
import { flavourList } from './flavours';

export type { Flavour } from './flavours';

export const makhanaFlavourIntro =
  'Explore our range of flavoured makhana, carefully processed and seasoned to deliver a delicious crunch with every bite. Available in a variety of flavours, with taste profiles, seasoning and makhana quality customised to meet specific buyer requirements.';

export const makhanaFlavours = flavourList(
  'peri-peri',
  'cheese',
  'tomato',
  'pudina',
  'cream-onion',
  'salt-pepper',
  'himalayan-pink-salt',
  'classic-masala',
);
