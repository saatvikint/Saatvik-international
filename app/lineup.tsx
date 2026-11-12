'use client';

import Link from 'next/link';
import { useEffect, useState, type CSSProperties } from 'react';
import { AddButton, ProductPhoto, categories, categoryOf, products, type Category, type CategoryId, type Product } from './products';
import { useShop } from './shop';
import { Icon } from './visuals';
import { StickerHeading } from './sticker-heading';

type Filter = 'all' | CategoryId;

function tintStyle(tint: string): CSSProperties {
  return { '--tint': tint } as CSSProperties;
}

function isCategoryId(value: string): value is CategoryId {
  return categories.some(category => category.id === value);
}

// Category cards (Paper design, 2026-11-12): solid colour card, big title, tagline,
// and a tilted arch-shaped photo breaking out of the bottom-right corner.
const cardTheme: Record<CategoryId, string> = {
  makhana: 'theme-purple',
  puffs: 'theme-lime',
  'freeze-dried-fruits': 'theme-orange',
};

function CategoryArch({ category }: { category: Category }) {
  return (
    <span className="category-arch" aria-hidden="true">
      {category.image ? (
        <img src={category.image.src} width={category.image.width} height={category.image.height} alt="" loading="lazy" decoding="async" />
      ) : (
        <span className="category-arch-placeholder">Photo<br />coming soon</span>
      )}
    </span>
  );
}

export function CategoryGrid() {
  return (
    <div className="category-cards">
      {categories.map(category => {
        const [first, ...rest] = category.name.split(' ');
        return (
          <Link key={category.id} className={`category-tile ${cardTheme[category.id]}`} href={`/catalog#category-${category.id}`}>
            <span className="category-tile-copy">
              <span className="category-tile-title">{first}{rest.length > 0 && <><br />{rest.join(' ')}</>}</span>
              <span className="category-tile-tagline">
                {category.tagline.map((line, index) => <span key={line}>{index > 0 && <br />}{line}</span>)}
                <span className="sr-only">: view products</span>
              </span>
            </span>
            <CategoryArch category={category} />
          </Link>
        );
      })}
    </div>
  );
}

function ProductCard({ product, hidden }: { product: Product; hidden: boolean }) {
  const { addJar, wishlist, toggleFavourite } = useShop();
  return (
    <article className="product-card" id={`product-${product.id}`} data-reveal="" hidden={hidden} style={tintStyle(product.tint)}>
      <button className="favourite-button" type="button" aria-pressed={wishlist.includes(product.id)}
        aria-label={`Save ${product.name}`} onClick={event => {
          const lineup = event.currentTarget.closest('#products');
          if (wishlist.includes(product.id) && lineup?.querySelector('.saved-filter[aria-pressed=true]')) {
            lineup.querySelector<HTMLButtonElement>('.saved-filter')?.focus({ preventScroll: true });
          }
          toggleFavourite(product);
        }}><Icon name="heart-icon" /></button>
      <div className="product-image">
        <ProductPhoto product={product} />
      </div>
      <div className="card-copy">
        <h3>{product.name}</h3>
        <p className="product-note">{product.note}</p>
        <div className="card-footer"><span className="weight">{categoryOf(product).name}</span><AddButton product={product} onAdd={() => addJar(product)} /></div>
      </div>
    </article>
  );
}

export function Lineup({ collection = false }: { collection?: boolean }) {
  const { wishlist } = useShop();
  const [savedOnly, setSavedOnly] = useState(false);
  const [filter, setFilter] = useState<Filter>('all');

  useEffect(() => {
    function showTarget(hash: string) {
      if (hash.startsWith('#category-')) {
        const id = hash.slice('#category-'.length);
        if (isCategoryId(id)) {
          setSavedOnly(false);
          setFilter(id);
          requestAnimationFrame(() => document.getElementById('products')?.scrollIntoView());
        }
        return;
      }
      if (!hash.startsWith('#product-')) return;
      const target = document.getElementById(hash.slice(1));
      if (!target?.hidden) return;
      setSavedOnly(false);
      setFilter('all');
      requestAnimationFrame(() => target.scrollIntoView());
    }
    function onHash() { showTarget(location.hash); }
    function onClick(event: globalThis.MouseEvent) {
      const target = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href*="#product-"],a[href*="#category-"]') : null;
      if (target && target.pathname === location.pathname) showTarget(target.hash);
    }
    showTarget(location.hash);
    window.addEventListener('hashchange', onHash);
    document.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('hashchange', onHash);
      document.removeEventListener('click', onClick);
    };
  }, []);

  const shown = products.filter(product =>
    (!savedOnly || wishlist.includes(product.id)) && (filter === 'all' || product.category === filter));

  return (
    <section className={collection ? 'flavours collection-lineup' : 'flavours'} id="products" aria-labelledby="products-title">
      <header className="section-heading">
        {collection ? (
          <div>
            <StickerHeading as="h1" id="products-title" size="md" align="start" kicker="Wholesale · Private label · Export"
              rows={[[{ text: 'Product', tone: 'purple' }], [{ text: 'Catalogue', tone: 'red' }]]} />
            <p className="collection-intro">Makhana, roasted puffs and freeze-dried fruits for wholesale, private label and export enquiries.</p>
          </div>
        ) : (
          <StickerHeading id="products-title" size="md" align="start" kicker="Wholesale · Private label · Export"
            rows={[[{ text: 'Explore', tone: 'purple' }, { text: 'the', tone: 'pink', small: true }], [{ text: 'Range', tone: 'lime' }]]} />
        )}
        {!collection && <Link className="lineup-collection text-link" href="/catalog">View Catalogue <Icon name="arrow" /></Link>}
        <button type="button" className="saved-filter" aria-pressed={savedOnly} aria-controls="product-grid" onClick={() => setSavedOnly(value => !value)}>
          <Icon name="heart-icon" /><span>{savedOnly ? 'Show all products' : 'Show saved'}</span>
        </button>
      </header>
      {collection && (
        <div className="collection-controls">
          <div className="taste-filters" role="group" aria-label="Filter by category">
            <button type="button" aria-pressed={filter === 'all'} onClick={() => setFilter('all')}>All products</button>
            {categories.map(category => (
              <button key={category.id} type="button" aria-pressed={filter === category.id} onClick={() => setFilter(category.id)}>{category.name}</button>
            ))}
          </div>
          <span className="collection-count" role="status">{shown.length} {shown.length === 1 ? 'product' : 'products'}</span>
        </div>
      )}
      <div id="product-grid" className="product-grid">
        {products.map(product => <ProductCard key={product.id} product={product} hidden={!shown.includes(product)} />)}
      </div>
      {!shown.length && <p className="saved-empty">{collection ? 'No saved products match this view. Browse the catalogue to find one.' : 'No saved products yet. Tap a heart to save one.'}</p>}
    </section>
  );
}
