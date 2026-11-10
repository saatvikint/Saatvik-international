'use client';

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type PropsWithChildren,
} from 'react';
import { usePathname } from 'next/navigation';
import { Drawer } from './drawer';
import { products, type Product, type ProductId, type Quantities } from './products';

export type Panel = 'cart' | 'wishlist' | 'builder' | 'search' | null;

interface FavouriteOptions {
  announce?: boolean;
}

interface ShopContextValue {
  cart: Quantities;
  wishlist: ProductId[];
  openPanel: (panel: Panel) => void;
  addJar: (product: Product) => void;
  toggleFavourite: (product: Product, options?: FavouriteOptions) => void;
  removeSubmitted: (items: Quantities) => void;
}

const ShopContext = createContext<ShopContextValue | null>(null);
const bagKey = 'snack-munch-bag';
const wishlistKey = 'snack-munch-favourites';
const emptyBag: Quantities = {};
const emptyWishlist: ProductId[] = [];

function readBrowserValue<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) as T : fallback;
  } catch {
    return fallback;
  }
}

function writeBrowserValue(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // This visit remains usable if browser storage is disabled.
  }
}

function readBag(): Quantities {
  const saved = readBrowserValue<Record<string, unknown>>(bagKey, emptyBag);
  return Object.fromEntries(products.flatMap(({ id }) =>
    typeof saved[id] === 'number' && Number.isSafeInteger(saved[id]) && saved[id] > 0 ? [[id, saved[id]]] : [],
  )) as Quantities;
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop must be used inside ShopProvider.');
  return context;
}

interface PanelButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  panel: Exclude<Panel, null>;
}

export function PanelButton({ panel, children, ...props }: PanelButtonProps) {
  const { openPanel } = useShop();
  return <button {...props} type="button" onClick={() => openPanel(panel)}>{children}</button>;
}

export function ShopProvider({ children }: PropsWithChildren) {
  const [cart, setCart] = useState<Quantities | null>(null);
  const [wishlist, setWishlist] = useState<ProductId[] | null>(null);
  const [panel, openPanel] = useState<Panel>(null);
  const [toast, setToast] = useState('');
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    setCart(current => current ?? readBag());
    const saved = readBrowserValue(wishlistKey, emptyWishlist);
    setWishlist(current => current ?? products.filter(({ id }) => Array.isArray(saved) && saved.includes(id)).map(({ id }) => id));
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  useEffect(() => {
    if (cart) writeBrowserValue(bagKey, cart);
  }, [cart]);

  useEffect(() => {
    if (wishlist) writeBrowserValue(wishlistKey, wishlist);
  }, [wishlist]);

  useEffect(() => {
    openPanel(null);
    const observer = 'IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? new IntersectionObserver((entries, activeObserver) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            entry.target.classList.add('is-visible');
            activeObserver.unobserve(entry.target);
          }
        }, { threshold: 0.12 })
      : null;
    if (!observer) return;
    document.documentElement.classList.add('motion-ready');
    document.querySelectorAll('[data-reveal]').forEach(item => observer.observe(item));
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove('motion-ready');
    };
  }, [pathname]);

  function changeQuantity(id: ProductId, delta: number) {
    setCart(current => {
      const bag = { ...(current ?? readBag()) };
      const quantity = (bag[id] || 0) + delta;
      if (quantity > 0) bag[id] = quantity;
      else delete bag[id];
      return bag;
    });
  }

  function removeSubmitted(items: Quantities) {
    setCart(current => {
      const bag = { ...(current ?? readBag()) };
      for (const [id, count] of Object.entries(items)) {
        const productId = id as ProductId;
        const remaining = (bag[productId] || 0) - (count ?? 0);
        if (remaining > 0) bag[productId] = remaining;
        else delete bag[productId];
      }
      return bag;
    });
  }

  function addJar(product: Product) {
    changeQuantity(product.id, 1);
    if (typeof window !== 'undefined') {
      const enquiryEl = document.getElementById('enquiry');
      if (enquiryEl) {
        const select = document.getElementById('enquiry-product') as HTMLSelectElement | null;
        if (select) {
          for (const opt of Array.from(select.options)) {
            if (opt.value.toLowerCase().includes(product.name.toLowerCase()) || product.name.toLowerCase().includes(opt.value.toLowerCase())) {
              select.value = opt.value;
              break;
            }
          }
        }
        enquiryEl.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = '/#enquiry';
      }
    }
  }

  function addPack(pack: Quantities) {
    setCart(current => {
      const bag = { ...(current ?? readBag()) };
      for (const [id, quantity] of Object.entries(pack)) {
        const productId = id as ProductId;
        if (quantity) bag[productId] = (bag[productId] || 0) + quantity;
      }
      return bag;
    });
    if (typeof window !== 'undefined') {
      const enquiryEl = document.getElementById('enquiry');
      if (enquiryEl) {
        enquiryEl.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = '/#enquiry';
      }
    }
  }

  function toggleFavourite(product: Product, { announce = true }: FavouriteOptions = {}) {
    const isSaved = wishlist?.includes(product.id);
    setWishlist(current => isSaved
      ? (current ?? emptyWishlist).filter(id => id !== product.id)
      : [...new Set([...(current ?? emptyWishlist), product.id])]);
    if (!announce) return;
    setToast(product.name + (isSaved ? ' removed from wishlist' : ' saved to wishlist'));
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 2300);
  }

  return (
    <ShopContext.Provider value={{
      cart: cart ?? emptyBag, wishlist: wishlist ?? emptyWishlist, openPanel, addJar, toggleFavourite, removeSubmitted,
    }}>
      {children}
      <Drawer panel={panel === 'cart' ? null : panel} cart={cart ?? emptyBag} wishlist={wishlist ?? emptyWishlist}
        onClose={() => openPanel(null)} onAdd={addJar} onQuantityChange={changeQuantity}
        onAddPack={addPack} onToggleFavourite={toggleFavourite} />
      <div className={toast ? 'toast visible' : 'toast'} role="status" aria-live="polite">{toast}</div>
    </ShopContext.Provider>
  );
}
