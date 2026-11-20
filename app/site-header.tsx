'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, type MouseEventHandler } from 'react';
import { ProductPhoto, categories, products, type CategoryId } from './products';
import { PanelButton, useShop } from './shop';
import { Icon } from './visuals';
import { APP_CONFIG } from '@/config/APP_CONFIG';

// Banner copy from client feedback 2026-11-16.
const messages = ['YOUR TRUSTED SUPPLIER OF HEALTHY SNACKS', 'MAKHANA · PUFFS · FREEZE-DRIED FRUITS', 'NO PALM OIL', 'GLOBAL TRADE', 'WHOLESALE & BULK SUPPLY', 'PRIVATE LABEL SOLUTIONS'];

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
            <li><Link href="/product-catalogue" onClick={onNavigate}>Catalogue (PDF)</Link></li>
          </ul>
        </div>
        <div className="mega-menu-featured">
          <p className="mega-menu-title">Featured</p>
          <ul className="mega-menu-cards">
            {featured.map(product => {
              const category = categories.find(item => item.id === product.category);
              return (
                <li key={product.id}>
                  <Link className={`mega-card ${menuTheme[product.category]}`} href={`/products/${product.id}`} onClick={onNavigate}>
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
      <Link href="/corporate" onClick={onClick}>Corporate &amp; Bulk</Link>
      <Link href="/export-query" onClick={onClick}>Export Query</Link>
      <Link href="/faq" onClick={onClick}>FAQ</Link>
      <Link href="/contact" onClick={onClick}>Contact</Link>
    </>
  );
}

// Dropdown groups: the same links appear in the mobile menu.
const serviceLinks = [
  { href: '/services#private-label', label: 'Private Labelling' },
  { href: '/services#corporate', label: 'Corporate Requirements' },
  { href: '/services#bulk-supply', label: 'Bulk Supplies' },
  { href: '/services#packing-options', label: 'Packing Options' },
  { href: '/services', label: 'All services' },
];
const companyLinks = [
  { href: '/our-story', label: 'About Us' },
  { href: '/certifications', label: 'Certifications' },
  { href: '/testimonials', label: 'Testimonials' },
];

type MenuId = 'products' | 'services' | 'company';

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<MenuId | null>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const triggers = useRef<Partial<Record<MenuId, HTMLButtonElement | null>>>({});
  const headerRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => { setMenuOpen(false); setOpenMenu(null); }, [pathname]);

  // Sticky header (client, 2026-11-16): solid background + shadow once the page scrolls under it.
  const [stuck, setStuck] = useState(false);
  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!openMenu) return;
    function onPointerDown(event: PointerEvent) {
      if (!headerRef.current?.contains(event.target as Node)) setOpenMenu(null);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key !== 'Escape' || !openMenu) return;
      triggers.current[openMenu]?.focus();
      setOpenMenu(null);
    }
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [openMenu]);

  const finePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  function hoverOpen(id: MenuId) {
    if (!finePointer()) return;
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(id);
  }
  function hoverClose() {
    if (!finePointer()) return;
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 180);
  }
  const toggle = (id: MenuId) => setOpenMenu(current => (current === id ? null : id));
  const productsOpen = openMenu === 'products';

  function dropdown({ id, label, links }: { id: MenuId; label: string; links: { href: string; label: string }[] }) {
    return (
      <div className="nav-dropdown" onPointerEnter={() => hoverOpen(id)} onPointerLeave={hoverClose}>
        <button ref={el => { triggers.current[id] = el; }} type="button" className="nav-menu-trigger" aria-expanded={openMenu === id} aria-controls={`${id}-menu`}
          onClick={() => toggle(id)}>
          {label} <Icon name="chevron-down" />
        </button>
        <ul id={`${id}-menu`} className="nav-dropdown-panel" hidden={openMenu !== id}>
          {links.map(link => (
            <li key={link.href}><Link href={link.href} onClick={() => setOpenMenu(null)}>{link.label}</Link></li>
          ))}
        </ul>
      </div>
    );
  }
  const isHome = pathname === '/';

  return (
    <>
      <Announcement />
      <header ref={headerRef} className={['site-header', isHome && 'is-home', productsOpen && 'is-menu-open', stuck && 'is-stuck'].filter(Boolean).join(' ')} onPointerLeave={hoverClose}>
        <div className="shell header-inner">
          <Link className="wordmark" href="/" aria-label={`${APP_CONFIG.name} home`}>
            <span className="wordmark-frame"><img src={APP_CONFIG.logo.src} width={APP_CONFIG.logo.width} height={APP_CONFIG.logo.height} alt={APP_CONFIG.name} /></span>
          </Link>
          <nav aria-label="Main navigation">
            <Link href="/" aria-current={isHome ? 'page' : undefined}>Home</Link>
            <button ref={el => { triggers.current.products = el; }} type="button" className="nav-menu-trigger" aria-expanded={productsOpen} aria-controls="products-menu"
              onClick={() => toggle('products')} onPointerEnter={() => hoverOpen('products')}>
              Products <Icon name="chevron-down" />
            </button>
            {dropdown({ id: 'services', label: 'Services', links: serviceLinks })}
            <Link href="/corporate">Corporate &amp; Bulk</Link>
            <Link href="/export-query">Export Query</Link>
            {dropdown({ id: 'company', label: 'Company', links: companyLinks })}
            <Link href="/faq">FAQ</Link>
            <Link href="/contact">Contact</Link>
          </nav>
          <div className="header-actions">
            <PanelButton className="icon-button" panel="search" aria-label="Search products"><Icon name="search-icon" /></PanelButton>
            <Link href="/contact" className="header-enquiry-btn">
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
          <Link className="mobile-nav-home" href="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <p className="mobile-nav-label">Products</p>
          {categories.map(category => (
            <Link key={category.id} className="mobile-nav-category" href={`/catalog#category-${category.id}`} onClick={() => setMenuOpen(false)}>{category.name}</Link>
          ))}
          <Link className="mobile-nav-category" href="/catalog" onClick={() => setMenuOpen(false)}>All products</Link>
          <Link className="mobile-nav-category" href="/product-catalogue" onClick={() => setMenuOpen(false)}>Catalogue (PDF)</Link>
          <p className="mobile-nav-label">Services</p>
          {serviceLinks.map(link => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</Link>
          ))}
          <NavLinks onClick={() => setMenuOpen(false)} />
          <p className="mobile-nav-label">Company</p>
          {companyLinks.map(link => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</Link>
          ))}
        </nav>
        <div onPointerEnter={() => hoverOpen('products')}>
          <ProductsMenu open={productsOpen} onNavigate={() => setOpenMenu(null)} />
        </div>
      </header>
    </>
  );
}
