// Every flavour Saatvik offers, shared by makhana and puffs.
// Names: client 2026-11-16 (makhana) and 2026-11-20 (puffs), spelling tidied for the site.
// Icons: client-supplied artwork; Classic Masala reuses the Masala spice icon.
// Dot colours are design choices that hint at each seasoning; they are not product claims.
// Taste notes are MaximiseTeck copy, pending client confirmation (Q34). Keep them to taste only:
// no ingredients beyond the flavour name, no allergens, nutrition or health claims
// (.agent/knowledge/content-and-claims.md).

export interface Flavour {
  id: string;
  name: string;
  colour: string;
  /** One-line taste note shown on the product page. */
  taste: string;
  /** Illustrated flavour icon (client artwork, 2026-11-25). Without one, the colour dot is shown. */
  icon?: string;
}

const library = {
  'peri-peri': { name: 'Peri Peri', colour: '#e0412b', taste: 'Hot and tangy, with a bold chilli kick.', icon: '/assets/flavours/peri-peri.webp' },
  cheese: { name: 'Cheese', colour: '#f5b72f', taste: 'Rich, creamy and savoury, with a gentle salty finish.', icon: '/assets/flavours/cheese.webp' },
  tomato: { name: 'Tomato', colour: '#c62f22', taste: 'Tangy and slightly sweet, with a mild spice.', icon: '/assets/flavours/tomato.webp' },
  pudina: { name: 'Pudina / Mint', colour: '#3d9a5a', taste: 'Cool and refreshing mint with a light chatpata tang.', icon: '/assets/flavours/pudina.webp' },
  'cream-onion': { name: 'Cream and Onion', colour: '#cfe3a3', taste: 'Mellow and creamy, with a sweet onion flavour.', icon: '/assets/flavours/cream-onion.webp' },
  'salt-pepper': { name: 'Salt and Pepper', colour: '#8c8279', taste: 'A simple classic: lightly salted, with a peppery bite.', icon: '/assets/flavours/salt-pepper.webp' },
  'himalayan-pink-salt': { name: 'Himalayan Pink Salt', colour: '#f3a6b6', taste: 'Lightly salted, so the toasty taste of the makhana comes through.', icon: '/assets/flavours/himalayan-pink-salt.webp' },
  'classic-masala': { name: 'Classic Masala', colour: '#c7712a', taste: 'A warm, savoury Indian spice blend with mild chilli heat.', icon: '/assets/flavours/masala.webp' },
  masala: { name: 'Masala', colour: '#d0802f', taste: 'A warm, savoury Indian spice blend.', icon: '/assets/flavours/masala.webp' },
  'pani-puri': { name: 'Pani Puri', colour: '#2f8f6a', taste: 'Tangy and minty with a spicy kick, inspired by the street-side favourite.', icon: '/assets/flavours/pani-puri.webp' },
  'lime-sriracha': { name: 'Lime Sriracha', colour: '#9bc53d', taste: 'Zingy lime with a sweet chilli heat.', icon: '/assets/flavours/lime-sriracha.webp' },
  'dahi-puri-chaat': { name: 'Dahi Puri Chaat', colour: '#efe3c2', taste: 'Cool and creamy, with sweet, tangy and spicy chaat notes.', icon: '/assets/flavours/dahi-puri-chaat.webp' },
  chaat: { name: 'Chaat', colour: '#b8562b', taste: 'Tangy, spicy and a little sweet, like a plate of street chaat.', icon: '/assets/flavours/chaat.webp' },
  'zesty-spicy': { name: 'Zesty Spicy', colour: '#f07a1a', taste: 'Bright and zesty, with a lively chilli heat.', icon: '/assets/flavours/zesty-spicy.webp' },
  'cheese-garlic': { name: 'Cheese Garlic', colour: '#f2d27a', taste: 'Creamy cheese with a savoury garlic punch.', icon: '/assets/flavours/cheese-garlic.webp' },
} as const satisfies Record<string, Omit<Flavour, 'id'>>;

export type FlavourId = keyof typeof library;

/** Look up flavours by id, in the order given. */
export const flavourList = (...ids: FlavourId[]): Flavour[] => ids.map(id => ({ id, ...(library[id] as Omit<Flavour, 'id'>) }));
