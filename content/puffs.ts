// Puff descriptions and flavours, supplied by the client on 2026-11-20 (.agent/client/2026-11-20-puff-flavours.md).
// Descriptions are the client's text with spelling tidied. Millet Roasted Puffs has no flavour list yet (Q10).
import { flavourList, type Flavour } from './flavours';

export interface PuffRange {
  description: string;
  flavours: Flavour[];
}

export const puffRanges: Record<string, PuffRange> = {
  'jowar-puffs': {
    description: 'Light, crispy and flavourful puffs made from jowar, offering a delightful snacking experience with a variety of exciting flavours.',
    flavours: flavourList('masala', 'cheese', 'cream-onion', 'pani-puri'),
  },
  'chickpea-puffs': {
    description: 'Crunchy and delicious puffs made from chickpeas, bringing together great taste and a unique snacking experience in every bite.',
    flavours: flavourList('lime-sriracha', 'cheese', 'peri-peri', 'tomato'),
  },
  'quinoa-puffs': {
    description: 'Crispy, light and delicious quinoa-based puffs, crafted to bring a modern twist to everyday snacking with exciting flavour combinations.',
    flavours: flavourList('dahi-puri-chaat', 'chaat', 'zesty-spicy', 'cream-onion', 'cheese-garlic'),
  },
};
