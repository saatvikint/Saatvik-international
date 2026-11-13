'use client';

import { useState, type FormEvent } from 'react';
import { Icon } from './visuals';
import { categories, products } from './products';
import { StickerHeading } from './sticker-heading';
import { APP_CONFIG } from '@/config/APP_CONFIG';
import { SOCIAL_CONFIG } from '@/config/SOCIAL_CONFIG';

export function HomeTradeEnquiry() {
  const [pending, setPending] = useState(false);
  const [receiptId, setReceiptId] = useState<string | null>(null);
  const [error, setError] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get('name') || '').trim();
    const company = String(formData.get('company') || '').trim();
    const phone = String(formData.get('phone') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const product = String(formData.get('product') || 'Multiple Products (Assorted)');
    const volume = String(formData.get('volume') || 'Commercial Wholesale');
    const city = String(formData.get('city') || '').trim();
    const message = String(formData.get('message') || '').trim();

    if (!name || !phone || !email) {
      setError('Please provide your name, phone number, and email.');
      return;
    }

    setPending(true);
    setError('');

    const id = 'STVK-' + Math.random().toString(36).substring(2, 8).toUpperCase();

    try {
      const response = await fetch('/api/corporate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          name,
          company: company || 'Not specified',
          email,
          phone,
          city: city || 'Not specified',
          quantity: volume,
          occasion: `Trade Enquiry - ${product}`,
          customBranding: true,
          message: `[B2B TRADE ENQUIRY for ${product}] Company: ${company || 'N/A'}. Volume: ${volume}. City: ${city}. Notes: ${message}`,
          flavours: [product],
        }),
      });

      const result = await response.json() as { success?: boolean; id?: string; error?: string };

      if (!response.ok || !result.id) {
        setError(result.error || 'Failed to submit enquiry. Please WhatsApp us directly.');
        return;
      }

      setReceiptId(result.id);
      form.reset();
    } catch {
      setError('Connection interrupted. Please reach out to us directly on WhatsApp.');
    } finally {
      setPending(false);
    }
  }

  return (
    <section className="trade-enquiry-section shell" id="enquiry" aria-labelledby="trade-enquiry-title">
      <div className="trade-enquiry-card">
        {/* Header Block */}
        <header className="trade-enquiry-header">
          <StickerHeading id="trade-enquiry-title" size="md" kicker="Trade & distributorship enquiries"
            rows={[[{ text: 'Partner', tone: 'red' }], [{ text: 'with', tone: 'pink', small: true }, { text: 'Us', tone: 'purple' }]]} />
          <p className="trade-enquiry-subtitle">
            Looking for bulk wholesale supply, retail distribution, private-label packaging, or corporate gifting? Connect directly with our commercial sourcing desk.
          </p>
        </header>

        {/* Direct Regional / Trade Contacts (Inspired by Lahori Zeera's trade desk) */}
        <div className="trade-desk-strip">
          <div className="trade-desk-item">
            <span className="desk-label">DIRECT SOURCING &amp; WHATSAPP</span>
            <a href={SOCIAL_CONFIG.whatsappHref()} target="_blank" rel="noreferrer" className="desk-val desk-link">
              <Icon name="chat" /> {APP_CONFIG.phone.display}
            </a>
          </div>
          <div className="trade-desk-item">
            <span className="desk-label">PROCUREMENT EMAIL</span>
            <a href={APP_CONFIG.mailtoHref('Trade enquiry')} className="desk-val desk-link">
              <Icon name="mail" /> {APP_CONFIG.email}
            </a>
          </div>
          <div className="trade-desk-item">
            <span className="desk-label">COMMERCIAL HEADQUARTERS</span>
            <span className="desk-val">{APP_CONFIG.address.line1}, {APP_CONFIG.address.city}-{APP_CONFIG.address.postalCode}</span>
          </div>
          <div className="trade-desk-item">
            <span className="desk-label">GST REGISTRATION</span>
            <span className="desk-val desk-gst">{APP_CONFIG.gstin}</span>
          </div>
        </div>

        {/* Form or Confirmation */}
        {receiptId ? (
          <div className="trade-enquiry-success" role="status">
            <div className="trade-success-icon"><Icon name="check" /></div>
            <h3>Enquiry Registered Successfully!</h3>
            <p>Your B2B reference code is: <strong>{receiptId}</strong></p>
            <p>Our team in Pune will review your requirements and get back to you.</p>
            <div className="trade-success-actions">
              <a
                href={SOCIAL_CONFIG.whatsappHref(`Hello ${APP_CONFIG.name}, I have submitted trade enquiry ref ${receiptId}.`)}
                target="_blank"
                rel="noreferrer"
                className="button yellow"
              >
                <Icon name="chat" /> Instant WhatsApp Follow-Up
              </a>
              <button
                type="button"
                className="button primary"
                onClick={() => setReceiptId(null)}
              >
                Submit Another Enquiry
              </button>
            </div>
          </div>
        ) : (
          <form className="trade-enquiry-form" onSubmit={handleSubmit}>
            <div className="trade-form-grid">
              <div className="trade-form-field">
                <label htmlFor="enquiry-name">Contact Person *</label>
                <input
                  id="enquiry-name"
                  name="name"
                  type="text"
                  required
                  placeholder="e.g. Ramesh Patel"
                  autoComplete="name"
                />
              </div>

              <div className="trade-form-field">
                <label htmlFor="enquiry-company">Company / Business Name *</label>
                <input
                  id="enquiry-company"
                  name="company"
                  type="text"
                  placeholder="e.g. Apex FMCG Distributors LLP"
                  autoComplete="organization"
                />
              </div>

              <div className="trade-form-field">
                <label htmlFor="enquiry-phone">Phone / WhatsApp Number *</label>
                <input
                  id="enquiry-phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  autoComplete="tel"
                />
              </div>

              <div className="trade-form-field">
                <label htmlFor="enquiry-email">Work Email Address *</label>
                <input
                  id="enquiry-email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@company.com"
                  autoComplete="email"
                />
              </div>

              <div className="trade-form-field">
                <label htmlFor="enquiry-product">Product of Interest *</label>
                <select id="enquiry-product" name="product" className="trade-select" defaultValue="Multiple Products (Assorted)">
                  <option value="Multiple Products (Assorted)">Multiple Products (Assorted)</option>
                  {categories.map(category => (
                    <optgroup key={category.id} label={category.name}>
                      {products.filter(product => product.category === category.id).map(product => (
                        <option key={product.id} value={product.name}>{product.name}</option>
                      ))}
                    </optgroup>
                  ))}
                  <option value="Private Label Packaging">Turnkey Private-Label Contract Packaging</option>
                  <option value="Corporate Gifting Hampers">Corporate Gifting Hampers</option>
                </select>
              </div>

              <div className="trade-form-field">
                <label htmlFor="enquiry-volume">Estimated Requirement / Volume</label>
                <select id="enquiry-volume" name="volume" className="trade-select" defaultValue="Commercial Wholesale (50 - 200 Cartons)">
                  <option value="Sample Tasting Kit (Evaluation)">Sample Tasting Kit (Evaluation)</option>
                  <option value="Trial Wholesale Lot (50 - 200 Cartons)">Trial Wholesale Lot (50 - 200 Cartons)</option>
                  <option value="Commercial Wholesale (500+ Cartons / Tonne Lots)">Commercial Wholesale (500+ Cartons / Tonne Lots)</option>
                  <option value="Full Truck Load (FTL) / Container Load">Full Truck Load (FTL) / Container Load</option>
                  <option value="Corporate Gifting (100 - 1000+ Hampers)">Corporate Gifting (100 - 1000+ Hampers)</option>
                  <option value="Private Label Sourcing Run">Private Label Sourcing Run</option>
                </select>
              </div>

              <div className="trade-form-field trade-full-width">
                <label htmlFor="enquiry-city">Destination City &amp; State / Country</label>
                <input
                  id="enquiry-city"
                  name="city"
                  type="text"
                  placeholder="e.g. Pune, Maharashtra / Bengaluru, Karnataka"
                />
              </div>

              <div className="trade-form-field trade-full-width">
                <label htmlFor="enquiry-message">Specific Requirements or Questions</label>
                <textarea
                  id="enquiry-message"
                  name="message"
                  rows={3}
                  placeholder="Mention any custom seasoning, packaging preferences (bulk sacks vs PET jars), required delivery schedule, or sample requests."
                />
              </div>
            </div>

            {error && <p className="trade-form-error" role="alert">{error}</p>}

            {/* Signature Pill Submit Row */}
            <div className="trade-form-actions-row">
              <div className="trade-tax-note">
                <span><Icon name="check" /> Official B2B GST Tax Invoicing</span>
                <span><Icon name="check" /> Direct Wholesale Factory &amp; Sourcing Coordination</span>
              </div>

              <div className="trade-submit-buttons">
                <button
                  type="submit"
                  className="button yellow trade-submit-pill"
                  disabled={pending}
                >
                  <span>{pending ? 'Submitting Enquiry…' : 'Submit Sourcing Enquiry'}</span>
                  <span className="submit-circle-arrow">
                    <Icon name="arrow" />
                  </span>
                </button>

                <a
                  href={SOCIAL_CONFIG.whatsappHref()}
                  target="_blank"
                  rel="noreferrer"
                  className="button primary trade-whatsapp-pill"
                >
                  <Icon name="chat" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

