'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, type MouseEventHandler } from 'react';
import { PanelButton, useShop } from './shop';
import { Icon } from './visuals';

const messages = ['MAKHANA · PUFFS · FREEZE-DRIED FRUITS', 'WHOLESALE & BULK SUPPLY', 'PRIVATE LABEL SOLUTIONS', 'EXPORT ENQUIRIES WELCOME', 'PREMIUM HEALTHY SNACKING SOLUTIONS'];

const star = 'M7.787.19c.03-.253.396-.253.426 0l.252 2.121a5.969 5.969 0 0 0 5.224 5.224l2.121.252c.253.03.253.396 0 .426l-2.121.252a5.969 5.969 0 0 0-5.224 5.224l-.252 2.121c-.03.253-.396.253-.426 0l-.252-2.121A5.969 5.969 0 0 0 2.31 8.465L.19 8.213c-.253-.03-.253-.396 0-.426l2.121-.252A5.969 5.969 0 0 0 7.535 2.31L7.787.19Z';

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
                  <svg className="announcement-star" viewBox="0 0 16 16"><path d={star} /></svg>
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

function NavLinks({ onClick }: { onClick?: MouseEventHandler<HTMLAnchorElement> }) {
  return (
    <>
      <Link href="/catalog" onClick={onClick}>Products</Link>
      <Link href="/corporate" onClick={onClick}>Corporate &amp; Bulk</Link>
      <Link href="/faq" onClick={onClick}>FAQ</Link>
      <Link href="/#build" onClick={onClick}>Build a Pack</Link>
      <Link href="/#story" onClick={onClick}>Our Story</Link>
    </>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const { wishlist } = useShop();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => setMenuOpen(false), [pathname]);
  const isHome = pathname === '/';

  return (
    <>
      <Announcement />
      <header className={isHome ? 'site-header is-home' : 'site-header'}>
        <div className="shell header-inner">
          <Link className="wordmark" href="/" aria-label="Saatvik International home">
            <span className="wordmark-frame"><img src="/assets/saatvik-logo.png" width="2048" height="522" alt="Saatvik International" /></span>
          </Link>
          <nav aria-label="Main navigation"><NavLinks /></nav>
          <div className="header-actions">
            <PanelButton className="icon-button wishlist-button" panel="wishlist" aria-label={'Open wishlist' + (wishlist.length ? ', ' + wishlist.length + ' saved' : '')}>
              <Icon name="heart-icon" /><span id="wishlist-count" hidden={!wishlist.length}>{wishlist.length}</span>
            </PanelButton>
            <PanelButton className="icon-button" panel="search" aria-label="Search products"><Icon name="search-icon" /></PanelButton>
            <Link href="/#enquiry" className="header-enquiry-btn" aria-label="Trade & Distributorship Enquiry">
              <Icon name="chat" />
              <span>Trade Enquiry</span>
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
        }}><NavLinks onClick={() => setMenuOpen(false)} /></nav>
      </header>
    </>
  );
}
