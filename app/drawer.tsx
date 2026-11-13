'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react';
import { AddButton, ProductPhoto, categoryOf, products, quantityTotal, type Product, type ProductId, type Quantities } from './products';
import type { Panel } from './shop';
import { Icon } from './visuals';

const packSize = 3;
const titles: Record<Exclude<Panel, null>, string> = {
  cart: 'Your Enquiry Selection',
  builder: 'Build a Mixed Enquiry',
  search: 'Find a Product',
};

export function DrawerRow({ product, children }: { product: Product; children: ReactNode }) {
  return (
    <div className="drawer-row">
      <ProductPhoto product={product} />
      <div>
        <strong>{product.name}</strong>
        <small>{categoryOf(product).name}</small>
      </div>
      {children}
    </div>
  );
}

interface StepperProps {
  product: Product;
  quantity: number;
  onChange: (id: ProductId, delta: number) => void;
  incrementDisabled?: boolean;
}

function Stepper({ product, quantity, onChange, incrementDisabled = false }: StepperProps) {
  return (
    <div className="stepper">
      <button type="button" aria-label={`Remove one ${product.name}`} disabled={quantity === 0} onClick={() => onChange(product.id, -1)}><Icon name="minus" /></button>
      <span aria-label={`Quantity ${quantity}`}>{quantity}</span>
      <button type="button" aria-label={`Add one ${product.name}`} disabled={incrementDisabled} onClick={() => onChange(product.id, 1)}><Icon name="plus" /></button>
    </div>
  );
}

function Cart({ quantities, onQuantityChange, onClose }: {
  quantities: Quantities;
  onQuantityChange: (id: ProductId, delta: number) => void;
  onClose: () => void;
}) {
  const selected = products.filter(product => quantities[product.id]);
  if (selected.length === 0) {
    return (
      <>
        <p className="drawer-copy">No products selected yet. Pick a product to start your enquiry.</p>
        <Link href="/catalog" className="button primary" onClick={onClose}>Explore the Catalog <Icon name="arrow" /></Link>
      </>
    );
  }
  return (
    <>
      <p className="drawer-copy">Review your selection before requesting a quotation.</p>
      {selected.map(product => (
        <DrawerRow key={product.id} product={product}>
          <Stepper product={product} quantity={quantities[product.id] ?? 0} onChange={onQuantityChange} />
        </DrawerRow>
      ))}
      <div className="drawer-footer cart-footer">
        <div className="cart-total"><span>Selected</span><strong>{quantityTotal(quantities)}</strong></div>
        <Link className="button primary" href="/checkout" onClick={onClose}>Proceed to Quotation <Icon name="arrow" /></Link>
        <p>B2B Wholesale Enquiry · No payment collected</p>
      </div>
    </>
  );
}


function PackBuilder({ onAddPack }: { onAddPack: (pack: Quantities) => void }) {
  const [pack, setPack] = useState<Quantities>({});
  const count = quantityTotal(pack);

  function changeSelection(id: ProductId, delta: number) {
    setPack(current => {
      const quantity = (current[id] || 0) + delta;
      if (quantity < 0 || quantityTotal(current) + delta > packSize) return current;
      return { ...current, [id]: quantity };
    });
  }

  return (
    <>
      <p className="drawer-copy" role="status">Pick any three products to enquire about together. <strong>{count} of {packSize} selected.</strong></p>
      {products.map(product => (
        <DrawerRow key={product.id} product={product}>
          <Stepper product={product} quantity={pack[product.id] || 0} onChange={changeSelection} incrementDisabled={count === packSize} />
        </DrawerRow>
      ))}
      <div className="drawer-footer">
        <button type="button" className="button primary builder-add" disabled={count !== packSize} onClick={() => onAddPack(pack)}>
          Add pack to enquiry <Icon name="arrow" />
        </button>
      </div>
    </>
  );
}

function normalize(value: string) {
  return value.trim().toLowerCase().replace(/[’']/g, '');
}

function Search({ onAdd }: { onAdd: (product: Product) => void }) {
  const [query, setQuery] = useState('');
  const results = products.filter(product => normalize(`${product.name} ${product.note} ${categoryOf(product).name}`).includes(normalize(query)));

  return (
    <>
      <label htmlFor="flavour-search" className="search-label">Search products</label>
      <input type="search" id="flavour-search" placeholder="Try mango or makhana" autoComplete="off" value={query} onChange={event => setQuery(event.target.value)} />
      <div id="search-results" aria-live="polite">
        {results.map(product => (
          <DrawerRow key={product.id} product={product}>
            <AddButton product={product} onAdd={() => onAdd(product)} />
          </DrawerRow>
        ))}
        {results.length === 0 && <p className="drawer-copy">No products found. Try makhana, puffs or mango.</p>}
      </div>
    </>
  );
}

interface DrawerProps {
  panel: Panel;
  cart: Quantities;
  onClose: () => void;
  onAdd: (product: Product) => void;
  onQuantityChange: (id: ProductId, delta: number) => void;
  onAddPack: (pack: Quantities) => void;
}

export function Drawer({ panel, cart, onClose, onAdd, onQuantityChange, onAddPack }: DrawerProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const drawer = ref.current;
    if (!drawer) return;
    if (!panel) {
      if (drawer.open) drawer.close();
      return;
    }
    if (!drawer.open) drawer.showModal();
    drawer.scrollTop = 0;
    drawer.querySelector<HTMLElement>(panel === 'search' ? '#flavour-search' : '.drawer-close')?.focus();
  }, [panel]);

  function closeDrawer() {
    ref.current?.close();
  }

  function closeOnBackdrop(event: MouseEvent<HTMLDialogElement>) {
    if (event.target !== ref.current) return;
    const drawer = ref.current;
    if (!drawer) return;
    const { left, right, top, bottom } = drawer.getBoundingClientRect();
    if (event.clientX < left || event.clientX > right || event.clientY < top || event.clientY > bottom) closeDrawer();
  }

  return (
    <dialog id="drawer" aria-labelledby="drawer-title" ref={ref} onClose={onClose} onClick={closeOnBackdrop}>
      <div className="drawer-header">
        <h2 id="drawer-title">{panel ? titles[panel] : ''}</h2>
        <button className="icon-button drawer-close" type="button" aria-label="Close dialog" onClick={closeDrawer}><Icon name="close" /></button>
      </div>
      <div id="drawer-content">
        {panel === 'builder' && (
          <PackBuilder
            onAddPack={pack => {
              onAddPack(pack);
              closeDrawer();
            }}
          />
        )}
        {panel === 'search' && (
          <Search
            onAdd={product => {
              onAdd(product);
              closeDrawer();
            }}
          />
        )}
      </div>
    </dialog>
  );
}
