import type { MouseEventHandler } from 'react';
import { Button } from '@/components/ui/button';
import { categoryOf, type Product, type ProductId } from '@/content/catalogue';
import { Icon } from './visuals';

export { categories, categoryOf, products, type Category, type CategoryId, type Product, type ProductId } from '@/content/catalogue';

export type Quantities = Partial<Record<ProductId, number>>;

export function quantityTotal(quantities: Quantities) {
  return Object.values(quantities).reduce((sum, quantity) => sum + quantity, 0);
}

/** Real product photo, or a plainly labelled placeholder until the client supplies one. */
export function ProductPhoto({ product, className, eager = false }: { product: Product; className?: string; eager?: boolean }) {
  const { image } = product;
  if (!image) {
    return (
      <span className={['product-photo', 'is-placeholder', className].filter(Boolean).join(' ')} role="img" aria-label={`${product.name}: photo coming soon`}>
        <span aria-hidden="true">{categoryOf(product).name}</span>
        <small aria-hidden="true">Photo coming soon</small>
      </span>
    );
  }
  return (
    <img className={['product-photo', className].filter(Boolean).join(' ')} src={image.src} width={image.width} height={image.height}
      alt={image.alt} loading={eager ? 'eager' : 'lazy'} decoding="async" />
  );
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
      <span className="add-plus" aria-hidden="true"><Icon name="arrow" /></span>
    </Button>
  );
}
