'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, type MouseEventHandler } from 'react';
import { PanelButton, useShop } from './shop';
import { Icon } from './visuals';

const messages = ['FOUR FLAVOURS. ONE BIG CRUNCH.', 'SNACK ON, GUILT OFF.', 'ROASTED MAKHANA', 'BUILD YOUR OWN 3-PACK', 'FIND YOUR FAVOURITE FLAVOUR'];

function Announcement({ home }: { home: boolean }) {
  const [paused, setPaused] = useState(false);
  if (!home) return <div className="announcement">{messages[0]}</div>;

  return (
    <div className={paused ? 'announcement is-ready is-paused' : 'announcement is-ready'}>
      <span className="announcement-static">{messages[0]}</span>
      <div className="announcement-window" aria-hidden="true">
        <div className="announcement-track">
          {[0, 1].map(copy => <div key={copy} className="announcement-group">{messages.map(message => <span key={message}>{message}</span>)}</div>)}
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
      <Link href="/catalog" onClick={onClick}>Catalog</Link>
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
      <Announcement home={isHome} />
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
            <PanelButton className="icon-button" panel="search" aria-label="Search flavours"><Icon name="search-icon" /></PanelButton>
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
