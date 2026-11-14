'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ProductPhoto, categories, categoryOf, products, type Category, type CategoryId, type Product } from './products';
import { useShop } from './shop';
import { Icon } from './visuals';
import { StickerHeading } from './sticker-heading';

type Filter = 'all' | CategoryId;

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
        <img className={category.image.illustrative ? 'is-illustrative' : undefined} src={category.image.src} width={category.image.width} height={category.image.height} alt="" loading="lazy" decoding="async" />
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

// Product card (2026-11-13): coloured image area with an option pill and a category sticker,
// white name strip below, and stacked actions over the image (on hover/focus; always on touch).
function ProductCard({ product, hidden }: { product: Product; hidden: boolean }) {
  const { addJar } = useShop();
  const category = categoryOf(product);
  return (
    <article className={`product-tile ${cardTheme[product.category]}`} id={`product-${product.id}`} data-reveal="" hidden={hidden}
      aria-labelledby={`product-${product.id}-name`}>
      <div className="product-tile-media">
        <ProductPhoto product={product} className="product-tile-photo" />
        <span className="product-tile-pill">{product.mood}</span>
        <span className="product-tile-sticker" aria-hidden="true">{category.shortName}</span>
        <div className="product-tile-actions">
          <button type="button" className="product-action is-primary" onClick={() => addJar(product)} aria-label={`Add ${product.name} to enquiry`}>
            <Icon name="chat" /><span className="label-long">Add to enquiry</span><span className="label-short" aria-hidden="true">Enquire</span>
          </button>
        </div>
      </div>
      <div className="product-tile-copy">
        <h3 id={`product-${product.id}-name`} className="product-tile-name">{product.name}</h3>
        <p className="product-tile-note">{product.note}</p>
      </div>
    </article>
  );
}

export function Lineup({ collection = false }: { collection?: boolean }) {
  const [filter, setFilter] = useState<Filter>('all');

  useEffect(() => {
    function showTarget(hash: string) {
      if (hash.startsWith('#category-')) {
        const id = hash.slice('#category-'.length);
        if (isCategoryId(id)) {
              setFilter(id);
          requestAnimationFrame(() => document.getElementById('products')?.scrollIntoView());
        }
        return;
      }
      if (!hash.startsWith('#product-')) return;
      const target = document.getElementById(hash.slice(1));
      if (!target?.hidden) return;
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
    filter === 'all' || product.category === filter);

  return (
    <section className={collection ? 'flavours collection-lineup' : 'flavours'} id="products" aria-labelledby="products-title">
      {collection ? (
        // "All products" page header (team reference, 2026-11-13): big title left, filter pills right.
        <header className="shop-all-header">
          <h1 id="products-title" className="shop-all-title">All Products</h1>
          <div className="shop-all-filters" role="group" aria-label="Filter products">
            <button type="button" className="filter-pill" aria-pressed={filter === 'all'} onClick={() => setFilter('all')}>All</button>
            {categories.map(category => (
              <button key={category.id} type="button" className="filter-pill" aria-pressed={filter === category.id} onClick={() => setFilter(category.id)}>{category.shortName}</button>
            ))}
          </div>
          <p className="shop-all-count" role="status">{shown.length} {shown.length === 1 ? 'product' : 'products'}</p>
        </header>
      ) : (
        <header className="section-heading is-centered">
          <StickerHeading id="products-title" kicker="Wholesale · Corporate · Export"
            rows={[[{ text: 'Explore', tone: 'purple' }, { text: 'the', tone: 'pink', small: true }], [{ text: 'Range', tone: 'lime' }]]} />
          <div className="section-heading-actions">
            <Link className="lineup-collection text-link" href="/catalog">View all products <Icon name="arrow" /></Link>
          </div>
        </header>
      )}
      <div id="product-grid" className="product-grid">
        {products.map(product => <ProductCard key={product.id} product={product} hidden={!shown.includes(product)} />)}
      </div>
      {!shown.length && <p className="saved-empty">No products in this category yet.</p>}
    </section>
  );
}
