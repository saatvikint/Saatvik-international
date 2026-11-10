import type { MouseEventHandler } from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from './visuals';

export type ProductId = 'masala' | 'cheese' | 'peri' | 'onion';

export interface Product {
  id: ProductId;
  name: string;
  mood: string;
  note: string;
  tint: string;
}

export type Quantities = Partial<Record<ProductId, number>>;

export const products: readonly Product[] = [
  { id: 'masala', name: 'Desi AF Masala', mood: 'Desi & punchy', note: 'Bold, spice-forward crunch.', tint: '#e6d8f5' },
  { id: 'cheese', name: 'Sigma Chad Cheese', mood: 'Rich & cheesy', note: 'Big, savoury cheese flavour.', tint: '#ffe5a1' },
  { id: 'peri', name: 'Goated Peri Peri', mood: 'Hot & fiery', note: 'A chilli kick in every bite.', tint: '#fbd1c5' },
  { id: 'onion', name: 'No Cap Cream N’ Onion', mood: 'Creamy & mellow', note: 'Mellow cream and tangy onion.', tint: '#cde8cc' }
];

export function quantityTotal(quantities: Quantities) {
  return Object.values(quantities).reduce((sum, quantity) => sum + quantity, 0);
}

interface AddButtonProps {
  product: Product;
  onAdd: MouseEventHandler<HTMLButtonElement>;
}

export function AddButton({ product, onAdd }: AddButtonProps) {
  return (
    <Button type="button" className="button primary add-button" onClick={onAdd} aria-label={`Enquire about ${product.name}`}>
      <Icon name="chat" />
      <span>Enquire Now</span>
      <span className="add-plus" aria-hidden="true">→</span>
    </Button>
  );
}
