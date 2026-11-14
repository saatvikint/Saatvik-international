'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, type MouseEventHandler } from 'react';
import { ProductPhoto, categories, products, type CategoryId } from './products';
import { PanelButton, useShop } from './shop';
import { Icon } from './visuals';
import { APP_CONFIG } from '@/config/APP_CONFIG';

const messages = ['MAKHANA · PUFFS · FREEZE-DRIED FRUITS', 'WHOLESALE & BULK SUPPLY', 'PRIVATE LABEL SOLUTIONS', 'EXPORT ENQUIRIES WELCOME', 'LEADING SUPPLIER OF HEALTHY SNACKS IN INDIA'];

/** Marquee announcement bar (Paper design, 2026-11-12). Pausable for WCAG 2.2.2. */
function Announcement() {
  const [paused, setPaused] = useState(false);
  return (
    <div className={paused ? 'announcement is-ready is-paused' : 'announcement is-ready'}>
      <span className="announcement-static">{messages.join(' · ')}</span>
      <div className="announcement-window" aria-hidden="true">
        <div className="announcement-track">
          {[0, 1].map(copy => (
            <div key={copy} className="announcement-group">
              {messages.map(message => (
                <span key={message} className="announcement-item">
                  {message}
                  <span className="announcement-leaf" aria-hidden="true" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <button className="announcement-toggle" type="button" aria-label={(paused ? 'Play' : 'Pause') + ' announcement ticker'} onClick={() => setPaused(value => !value)}>
        <Icon name={paused ? 'play-icon' : 'pause-icon'} />
      </button>
    </div>
  );
}

// Products mega-menu (team reference, 2026-11-13): category list left, featured products right.
// "Featured" not "Best sellers": we have no sales data to back a best-seller claim.
const featuredIds = ['flavoured-makhana', 'jowar-puffs', 'freeze-dried-mango-cubes'];
const menuTheme: Record<CategoryId, string> = { makhana: 'theme-purple', puffs: 'theme-lime', 'freeze-dried-fruits': 'theme-orange' };

function ProductsMenu({ open, onNavigate }: { open: boolean; onNavigate: () => void }) {
  const featured = featuredIds.map(id => products.find(product => product.id === id)).filter(product => product !== undefined);
  return (
    <div id="products-menu" className="mega-menu" hidden={!open}>
      <div className="shell mega-menu-inner">
        <div className="mega-menu-categories">
          <p className="mega-menu-label">Products</p>
          <ul>
            {categories.map(category => (
              <li key={category.id}><Link href={`/catalog#category-${category.id}`} onClick={onNavigate}>{category.name}</Link></li>
            ))}
            <li><Link href="/catalog" onClick={onNavigate}>All products</Link></li>
          </ul>
        </div>
        <div className="mega-menu-featured">
          <p className="mega-menu-title">Featured</p>
          <ul className="mega-menu-cards">
            {featured.map(product => {
              const category = categories.find(item => item.id === product.category);
              return (
                <li key={product.id}>
                  <Link className={`mega-card ${menuTheme[product.category]}`} href={`/catalog#product-${product.id}`} onClick={onNavigate}>
                    <span className="mega-card-media"><ProductPhoto product={product} /></span>
                    <span className="mega-card-name">{product.name}</span>
                    <span className="mega-card-sub">{category?.shortName} · {product.mood}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

function NavLinks({ onClick }: { onClick?: MouseEventHandler<HTMLAnchorElement> }) {
  return (
    <>
      <Link href="/services" onClick={onClick}>Services</Link>
      <Link href="/corporate" onClick={onClick}>Corporate &amp; Bulk</Link>
      <Link href="/faq" onClick={onClick}>FAQ</Link>
      <Link href="/our-story" onClick={onClick}>Our Story</Link>
      <Link href="/contact" onClick={onClick}>Contact</Link>
    </>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const productsButton = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => { setMenuOpen(false); setProductsOpen(false); }, [pathname]);

  useEffect(() => {
    if (!productsOpen) return;
    function onPointerDown(event: PointerEvent) {
      if (!headerRef.current?.contains(event.target as Node)) setProductsOpen(false);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setProductsOpen(false);
        productsButton.current?.focus();
      }
    }
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [productsOpen]);

  const finePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  function hoverOpen() {
    if (!finePointer()) return;
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setProductsOpen(true);
  }
  function hoverClose() {
    if (!finePointer()) return;
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setProductsOpen(false), 180);
  }
  const isHome = pathname === '/';

  return (
    <>
      <Announcement />
      <header ref={headerRef} className={['site-header', isHome && 'is-home', productsOpen && 'is-menu-open'].filter(Boolean).join(' ')} onPointerLeave={hoverClose}>
        <div className="shell header-inner">
          <Link className="wordmark" href="/" aria-label={`${APP_CONFIG.name} home`}>
            <span className="wordmark-frame"><img src={APP_CONFIG.logo.src} width={APP_CONFIG.logo.width} height={APP_CONFIG.logo.height} alt={APP_CONFIG.name} /></span>
          </Link>
          <nav aria-label="Main navigation">
            <button ref={productsButton} type="button" className="nav-menu-trigger" aria-expanded={productsOpen} aria-controls="products-menu"
              onClick={() => setProductsOpen(value => !value)} onPointerEnter={hoverOpen}>
              Products <Icon name="chevron-down" />
            </button>
            <NavLinks />
          </nav>
          <div className="header-actions">
            <PanelButton className="icon-button" panel="search" aria-label="Search products"><Icon name="search-icon" /></PanelButton>
            <Link href="/export-query" className="header-enquiry-btn" aria-label="Trade & Distributorship Enquiry">
              <Icon name="chat" />
              <span>Get a Quote</span>
            </Link>
            <button className="icon-button menu-toggle" type="button" ref={menuButton} aria-controls="mobile-nav"
              aria-expanded={menuOpen} aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen(value => !value)}><span /><span /></button>
          </div>
        </div>
        <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation" hidden={!menuOpen} onKeyDown={event => {
          if (event.key === 'Escape') {
            setMenuOpen(false);
            menuButton.current?.focus();
          }
        }}>
          <p className="mobile-nav-label">Products</p>
          {categories.map(category => (
            <Link key={category.id} className="mobile-nav-category" href={`/catalog#category-${category.id}`} onClick={() => setMenuOpen(false)}>{category.name}</Link>
          ))}
          <Link className="mobile-nav-category" href="/catalog" onClick={() => setMenuOpen(false)}>All products</Link>
          <NavLinks onClick={() => setMenuOpen(false)} />
          <p className="mobile-nav-label">Company</p>
          <Link href="/certifications" onClick={() => setMenuOpen(false)}>Certifications</Link>
          <Link href="/testimonials" onClick={() => setMenuOpen(false)}>Testimonials</Link>
          <Link href="/export-query" onClick={() => setMenuOpen(false)}>Export Query</Link>
        </nav>
        <div onPointerEnter={hoverOpen}>
          <ProductsMenu open={productsOpen} onNavigate={() => setProductsOpen(false)} />
        </div>
      </header>
    </>
  );
}
