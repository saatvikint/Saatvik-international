'use client';

import Link from 'next/link';
import { useEffect, useState, type CSSProperties, type MouseEvent } from 'react';
import { AddButton, products, type Product } from './products';
import { useShop } from './shop';
import { Icon } from './visuals';

const tastes = [
  ['all', 'All flavours'],
  ['spiced', 'Spiced'],
  ['mellow', 'Cheesy & creamy'],
] as const;

type Taste = typeof tastes[number][0];

function tintStyle(tint: string): CSSProperties {
  return { '--tint': tint } as CSSProperties;
}

export function CravingGrid() {
  return (
    <div id="craving-grid" className="craving-grid">
      {products.map(product => {
        const bite = product.id === 'onion' ? 'bite' : 'bite-' + product.id;
        return (
          <a key={product.id} className="craving-card" href={`#flavour-${product.id}`} style={tintStyle(product.tint)}>
            <span className="craving-art" aria-hidden="true">
              {[0, 1, 2].map(index => <svg className="craving-bite" key={index}><use href={`#${bite}`} /></svg>)}
            </span>
            <span className="craving-caption"><span>{product.mood}</span><span className="craving-arrow"><Icon name="arrow" /></span></span>
          </a>
        );
      })}
    </div>
  );
}

function ProductCard({ product, hidden }: { product: Product; hidden: boolean }) {
  const { addJar, wishlist, toggleFavourite } = useShop();
  return (
    <article className="product-card" id={`flavour-${product.id}`} data-reveal="" hidden={hidden} style={tintStyle(product.tint)}>
      <button className="favourite-button" type="button" aria-pressed={wishlist.includes(product.id)}
        aria-label={`Save ${product.name} as a favourite`} onClick={event => {
          const flavours = event.currentTarget.closest('#flavours');
          if (wishlist.includes(product.id) && flavours?.querySelector('.saved-filter[aria-pressed=true]')) {
            flavours.querySelector<HTMLButtonElement>('.saved-filter')?.focus({ preventScroll: true });
          }
          toggleFavourite(product);
        }}><Icon name="heart-icon" /></button>
      <div className="product-image" role="img" aria-label={`${product.name} roasted makhana jar`}>
        <svg className="product-jar" aria-hidden="true"><use href={`#jar-${product.id}`} /></svg>
      </div>
      <div className="card-copy">
        <h3>{product.name}</h3>
        <p className="product-note">{product.note}</p>
        <div className="card-footer"><span className="weight">75 g jar</span><AddButton product={product} onAdd={() => addJar(product)} /></div>
      </div>
    </article>
  );
}

export function Lineup({ collection = false }: { collection?: boolean }) {
  const { wishlist } = useShop();
  const [savedOnly, setSavedOnly] = useState(false);
  const [taste, setTaste] = useState<Taste>('all');

  useEffect(() => {
    function showTarget(hash: string) {
      if (!hash.startsWith('#flavour-')) return;
      const target = document.getElementById(hash.slice(1));
      if (!target?.hidden) return;
      setSavedOnly(false);
      setTaste('all');
      requestAnimationFrame(() => target.scrollIntoView());
    }
    function onHash() { showTarget(location.hash); }
    function onClick(event: globalThis.MouseEvent) {
      const target = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href^="#flavour-"]') : null;
      if (target) showTarget(target.hash);
    }
    window.addEventListener('hashchange', onHash);
    document.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('hashchange', onHash);
      document.removeEventListener('click', onClick);
    };
  }, []);

  const shown = products.filter(product => {
    const profile = ['masala', 'peri'].includes(product.id) ? 'spiced' : 'mellow';
    return (!savedOnly || wishlist.includes(product.id)) && (taste === 'all' || taste === profile);
  });

  return (
    <section className={collection ? 'flavours collection-lineup' : 'flavours'} id="flavours" aria-labelledby="flavour-title">
      <header className="section-heading">
        {collection ? (
          <div><span className="eyebrow">THE SNACK MUNCH CATALOGUE</span><h1 id="flavour-title">Roasted Makhana Catalog</h1>
            <p className="collection-intro">Browse the full Snack Munch catalogue. Four iconic flavours, zero palm oil, big crunch.</p></div>
        ) : (
          <div><span className="sticker lineup-sticker">Our Favourites</span><h2 id="flavour-title">Explore the Lineup</h2></div>
        )}
        {!collection && <Link className="lineup-collection text-link" href="/catalog">View Catalog <Icon name="arrow" /></Link>}
        <button type="button" className="saved-filter" aria-pressed={savedOnly} aria-controls="product-grid" onClick={() => setSavedOnly(value => !value)}>
          <Icon name="heart-icon" /><span>{savedOnly ? 'Show all flavours' : 'Show saved'}</span>
        </button>
      </header>
      {collection && (
        <div className="collection-controls">
          <div className="taste-filters" role="group" aria-label="Filter by flavour profile">
            {tastes.map(([value, label]) => <button key={value} type="button" aria-pressed={taste === value} onClick={() => setTaste(value)}>{label}</button>)}
          </div>
          <span className="collection-count" role="status">{shown.length} {shown.length === 1 ? 'flavour' : 'flavours'}</span>
        </div>
      )}
      <div id="product-grid" className="product-grid">
        {products.map(product => <ProductCard key={product.id} product={product} hidden={!shown.includes(product)} />)}
      </div>
      {!shown.length && <p className="saved-empty">{collection ? 'No saved flavours match this view. Browse the catalog to find a favourite.' : 'No saved flavours yet. Tap a heart to add a favourite.'}</p>}
    </section>
  );
}
