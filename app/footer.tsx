'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { Icon } from './visuals';
import { APP_CONFIG } from '@/config/APP_CONFIG';
import { SOCIAL_CONFIG } from '@/config/SOCIAL_CONFIG';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  }

  return (
    <footer className="site-footer" id="footer">
      <div className="footer-card">
        <div className="footer-main-grid">
          {/* Left Column: Headline, Newsletter, Apps */}
          <div className="footer-col-left">
            <h2 className="footer-headline">
              All crunch. No spam.<br />
              Get the newsletter here.
            </h2>

            {subscribed ? (
              <div className="footer-subscribed-badge" role="status">
                <span><Icon name="check" /> You’re on the VIP snack list!</span>
              </div>
            ) : (
              <form className="footer-newsletter-pill" onSubmit={handleSubmit}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  required
                  aria-label="Email address for newsletter"
                />
                <button type="submit" className="footer-submit-btn" aria-label="Subscribe to newsletter">
                  <Icon name="arrow" />
                </button>
              </form>
            )}

            <p className="footer-tagline">
              Leading Supplier of Healthy Snacks in India: makhana, puffs and freeze-dried fruits for business buyers.
            </p>
          </div>

          {/* Vertical Divider */}
          <div className="footer-vertical-line" aria-hidden="true" />

          {/* Right Column: Multi-column Nav & Bottom Bar */}
          <div className="footer-col-right">
            <div className="footer-links-grid">
              {/* Order/Shop */}
              <div className="footer-link-group">
                <h3 className="footer-nav-title">ORDER</h3>
                <ul className="footer-nav-list">
                  <li><Link href="/catalog">Product Catalogue</Link></li>
                  <li><Link href="/corporate">Corporate &amp; Bulk Orders</Link></li>
                  <li><Link href="/services">Services</Link></li>
                  <li><Link href="/#build">Build a Pack</Link></li>
                  <li><Link href="/catalog#category-makhana">Makhana</Link></li>
                  <li><Link href="/catalog#category-puffs">Puffs</Link></li>
                  <li><Link href="/catalog#category-freeze-dried-fruits">Freeze-Dried Fruits</Link></li>
                </ul>
              </div>

              {/* Read/About */}
              <div className="footer-link-group">
                <h3 className="footer-nav-title">READ</h3>
                <ul className="footer-nav-list">
                  <li><Link href="/faq">FAQ &amp; Help Center</Link></li>
                  <li><Link href="/our-story">Our Story</Link></li>
                  <li><Link href="/services">Private Label Services</Link></li>
                  <li><Link href="/certifications">Certifications</Link></li>
                  <li><Link href="/testimonials">Testimonials</Link></li>
                  <li><Link href="/corporate">Corporate &amp; Bulk Supply</Link></li>
                  <li><Link href="/#main">Why Makhana?</Link></li>
                  <li><Link href="/#cravings">Browse by Category</Link></li>
                </ul>
              </div>

              {/* Follow (only confirmed profiles), otherwise direct contact */}
              {SOCIAL_CONFIG.hasActiveProfiles ? (
                <div className="footer-link-group">
                  <h3 className="footer-nav-title">FOLLOW</h3>
                  <ul className="footer-nav-list">
                    {SOCIAL_CONFIG.active.map(profile => (
                      <li key={profile.platform}><a href={profile.url ?? undefined} target="_blank" rel="noreferrer">{profile.label}</a></li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="footer-link-group">
                  <h3 className="footer-nav-title">CONTACT</h3>
                  <ul className="footer-nav-list">
                    <li><a href={APP_CONFIG.telHref}>{APP_CONFIG.phone.display}</a></li>
                    <li><a href={APP_CONFIG.mailtoHref()}>Email us</a></li>
                    <li><Link href="/contact">Contact page</Link></li>
                    <li><Link href="/export-query">Export query</Link></li>
                    {SOCIAL_CONFIG.whatsappEnabled && <li><a href={SOCIAL_CONFIG.whatsappHref()} target="_blank" rel="noreferrer">WhatsApp</a></li>}
                    <li>{APP_CONFIG.address.city}, {APP_CONFIG.address.region}</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Bottom Row inside Right Col */}
            <div className="footer-right-footer-row">

              <div className="footer-legal-nav">
                <Link href="/catalog">Catalog</Link>
                <Link href="/corporate">Corporate Orders</Link>
                <Link href="/services">Services</Link>
                <Link href="/faq">FAQ</Link>
                <Link href="/certifications">Certifications</Link>
                <Link href="/#privacy">Privacy</Link>
                <Link href="/contact">Contact</Link>
              </div>

              <div className="footer-copy-text">
                {APP_CONFIG.copyright()} · GSTIN {APP_CONFIG.gstin}
              </div>
            </div>
          </div>
        </div>

        {/* Big Giant Brand Banner */}
        <div className="footer-brand-stage" aria-hidden="true">
          <img
            className="footer-brand-art"
            src="/assets/footer-saatvik-3d-green.webp"
            width={1800}
            height={352}
            alt=""
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </footer>
  );
}
