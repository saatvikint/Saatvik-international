'use client';

import Link from 'next/link';
import { useState, type CSSProperties, type FormEvent } from 'react';
import { Icon } from '../visuals';
import { products, type ProductId } from '../products';
import { APP_CONFIG } from '@/config/APP_CONFIG';
import { SOCIAL_CONFIG } from '@/config/SOCIAL_CONFIG';

interface CorporateReceipt {
  id: string;
  company?: string;
}

function generateCorporateId(): string {
  const num = Math.floor(100000 + Math.random() * 900000);
  return `CORP-${num}`;
}

const occasions = [
  'Diwali & Festive Gifting',
  'Office Pantry Stash',
  'Team Welcome & Onboarding',
  'Client Appreciation Hampers',
  'Events, Retreats & Summits',
  'Wholesale / Reseller',
];

const tiers = [
  { id: 'tier-1', qty: '50 – 150 Jars', discount: '15% Off', perk: 'Pantry Starter Pack' },
  { id: 'tier-2', qty: '151 – 500 Jars', discount: '25% Off', perk: 'Includes Custom Gift Notes' },
  { id: 'tier-3', qty: '500+ Jars', discount: '35% Off', perk: 'Bespoke Co-Branded Sleeves' },
];

export function CorporateEnquiry() {
  const [occasion, setOccasion] = useState(occasions[0]);
  const [selectedTier, setSelectedTier] = useState(tiers[1]);
  const [selectedFlavours, setSelectedFlavours] = useState<ProductId[]>(() => products.map(product => product.id));
  const [customBranding, setCustomBranding] = useState(true);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const [receipt, setReceipt] = useState<CorporateReceipt | null>(null);

  function toggleFlavour(id: ProductId) {
    setSelectedFlavours(prev =>
      prev.includes(id)
        ? prev.length > 1 ? prev.filter(f => f !== id) : prev
        : [...prev, id]
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError('');

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      id: generateCorporateId(),
      name: formData.get('name'),
      company: formData.get('company'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      city: formData.get('city'),
      quantity: selectedTier.qty,
      occasion: occasion,
      customBranding: customBranding,
      deliveryDate: formData.get('deliveryDate'),
      flavours: selectedFlavours,
      message: formData.get('message'),
    };

    try {
      const res = await fetch('/api/corporate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json() as CorporateReceipt & { error?: string };
      if (!res.ok || !result.id) {
        setError(result.error || 'Failed to submit enquiry. Please try again.');
        return;
      }

      setReceipt(result);
    } catch {
      setError('Could not connect to the server. Please check your connection and retry.');
    } finally {
      setPending(false);
    }
  }

  if (receipt) {
    return (
      <div className="checkout-form-card corporate-confirmation-card">
        <span className="sticker corporate-confirm-sticker">Enquiry Received!</span>
        <h2 className="confirm-title">Thanks, {receipt.company || 'Partner'}!</h2>
        <p className="confirm-desc">
          Your corporate bulk enquiry has been safely received. A dedicated Saatvik International gifting lead will reach out within <strong>2 business hours</strong> with a formal GST quotation and your free sample kit dispatch confirmation.
        </p>

        <div className="confirm-ref-badge">
          <span>Enquiry Reference</span>
          <strong>{receipt.id}</strong>
        </div>

        <div className="confirm-next-steps">
          <div className="confirm-step-row">
            <span className="step-badge">1</span>
            <div>
              <strong>Instant Proposal &amp; GST Quote</strong>
              <p>We’ll share customized volume pricing, tax breakdown, and packaging mockup on your email.</p>
            </div>
          </div>
          <div className="confirm-step-row">
            <span className="step-badge">2</span>
            <div>
              <strong>Free 4-Jar Tasting Box</strong>
              <p>We courier a complimentary tasting box of all four flavours directly to your office address.</p>
            </div>
          </div>
          <div className="confirm-step-row">
            <span className="step-badge">3</span>
            <div>
              <strong>Fresh Nitrogen-Packed Dispatch</strong>
              <p>Fresh batch dispatched to your central warehouse or delivered door-to-door to individual employees.</p>
            </div>
          </div>
        </div>

        <div className="confirm-actions">
          <Link href="/catalog" className="button primary">
            Explore the Catalog <Icon name="arrow" />
          </Link>
          <a
            href={SOCIAL_CONFIG.whatsappHref(`Hi ${APP_CONFIG.name}, I just submitted a corporate bulk enquiry.`)}
            target="_blank"
            rel="noreferrer"
            className="button yellow"
          >
            Direct WhatsApp Chat
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-layout corporate-layout" id="enquiry-builder">
      {/* Left Column: Form & Configuration */}
      <section className="checkout-form-card corporate-builder-card" aria-labelledby="corporate-builder-title">
        <span className="eyebrow">CUSTOMIZE YOUR ORDER</span>
        <h2 id="corporate-builder-title">Corporate Enquiry &amp; Free Sample Kit</h2>
        <p className="corporate-form-intro">
          Select your requirements below. We provide factory-direct pricing, customized branding, and a complimentary 4-jar tasting box for review committees.
        </p>

        <form className="corporate-order-form" onSubmit={handleSubmit}>
          {/* Section A: Occasion Pill Selector */}
          <div className="form-section-block">
            <span className="section-label">1. What’s the occasion or use case?</span>
            <div className="pill-selector-wrap">
              {occasions.map(item => (
                <button
                  key={item}
                  type="button"
                  className={`occasion-pill ${occasion === item ? 'is-active' : ''}`}
                  onClick={() => setOccasion(item)}
                >
                  {occasion === item && <span className="pill-dot" aria-hidden="true">●</span>}
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Section B: Quantity Tier Cards */}
          <div className="form-section-block">
            <span className="section-label">2. Select estimated order volume:</span>
            <div className="b2b-tier-grid">
              {tiers.map(t => (
                <button
                  key={t.id}
                  type="button"
                  className={`b2b-tier-card ${selectedTier.id === t.id ? 'is-active' : ''}`}
                  onClick={() => setSelectedTier(t)}
                >
                  <span className="tier-discount-tag">{t.discount}</span>
                  <strong className="tier-qty-text">{t.qty}</strong>
                  <span className="tier-perk-text">{t.perk}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Section C: Flavour Mix Selector */}
          <div className="form-section-block">
            <span className="section-label">3. Select flavour mix:</span>
            <div className="b2b-flavours-grid">
              {products.map(p => {
                const active = selectedFlavours.includes(p.id);
                return (
                  <button
                    key={p.id}
                    type="button"
                    className={`b2b-flavour-card ${active ? 'is-selected' : ''}`}
                    onClick={() => toggleFlavour(p.id)}
                    style={{ '--flavour-tint': p.tint } as CSSProperties}
                  >
                    <span className="flavour-check-mark"><Icon name={active ? 'check' : 'plus'} /></span>
                    <div className="flavour-card-info">
                      <strong className="flavour-card-name">{p.name}</strong>
                      <span className="flavour-card-mood">{p.mood}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section D: Contact & Delivery Fields */}
          <div className="form-section-block">
            <span className="section-label">4. Your details &amp; delivery location:</span>
            <div className="form-fields">
              <label>
                Full name *
                <input name="name" required placeholder="e.g. Aditi Sharma" maxLength={100} />
              </label>

              <label>
                Company / Organization name *
                <input name="company" required placeholder="e.g. Razorpay, Infosys, Google" maxLength={100} />
              </label>

              <label>
                Work email address *
                <input name="email" type="email" required placeholder="aditi@company.com" maxLength={120} />
              </label>

              <label>
                Phone / WhatsApp number *
                <input name="phone" type="tel" required placeholder="+91 98765 43210" maxLength={30} />
              </label>

              <label>
                Delivery city &amp; state *
                <input name="city" required placeholder="e.g. Bengaluru, Karnataka" maxLength={100} />
              </label>

              <label>
                Target delivery date (optional)
                <input name="deliveryDate" type="date" />
              </label>

              <div className="field-wide branding-checkbox-wrap">
                <label className="branding-checkbox-label">
                  <input
                    type="checkbox"
                    checked={customBranding}
                    onChange={e => setCustomBranding(e.target.checked)}
                  />
                  <span>Include custom company logo sleeves &amp; branded gift notes</span>
                </label>
              </div>

              <label className="field-wide">
                Special requirements or message
                <textarea
                  name="message"
                  rows={3}
                  placeholder="Tell us about custom packaging requirements, budget targets, or multiple employee delivery addresses..."
                  maxLength={800}
                />
              </label>
            </div>
          </div>

          {error && <p className="form-status" style={{ color: 'var(--red)' }}>{error}</p>}

          <div className="b2b-form-cta-wrap">
            <button className="button primary send-enquiry" type="submit" disabled={pending}>
              {pending ? 'Sending enquiry…' : 'Submit Corporate Enquiry & Request Free Sample Kit'}
              <Icon name="arrow" />
            </button>
            <p className="corporate-micro-disclosure">
              Enquiry only · No upfront payment collected · Full GST input credit invoices provided
            </p>
          </div>
        </form>
      </section>

      {/* Right Column: Live Sticky Summary */}
      <aside className="checkout-summary corporate-summary-aside" aria-labelledby="corporate-summary-title">
        <div className="summary-head">
          <h2 id="corporate-summary-title">Enquiry Summary</h2>
          <span className="sticker summary-tag">Corporate</span>
        </div>

        <div className="corporate-summary-details">
          <div className="summary-spec-row">
            <span className="spec-label">Selected Volume</span>
            <strong className="spec-value">{selectedTier.qty}</strong>
          </div>

          <div className="summary-spec-row">
            <span className="spec-label">Volume Tier Discount</span>
            <strong className="spec-value text-discount">{selectedTier.discount}</strong>
          </div>

          <div className="summary-spec-row">
            <span className="spec-label">Requirement Type</span>
            <span className="spec-value">{occasion}</span>
          </div>

          <div className="summary-spec-row">
            <span className="spec-label">Custom Branding</span>
            <span className="spec-value">{customBranding ? 'Included (Free Sleeves)' : 'Standard Jars'}</span>
          </div>

          <div className="summary-flavours-box">
            <span className="box-title">Selected Flavour Mix:</span>
            <div className="flavours-chips-row">
              {selectedFlavours.map(id => {
                const prod = products.find(p => p.id === id);
                return (
                  <span key={id} className="selected-flavour-badge" style={{ '--flavour-tint': prod?.tint } as CSSProperties}>
                    {prod?.name}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="free-sample-kit-card">
            <div className="sample-kit-head">
              <span className="sample-badge">FREE PERK</span>
              <strong>Complimentary Tasting Box</strong>
            </div>
            <p>
              For all bulk and corporate orders, we courier a full 4-jar sample tasting box to your office before production.
            </p>
          </div>

          <div className="b2b-trust-checklist">
            <div><Icon name="check" /> 100% Roasted Makhana (Zero Palm Oil)</div>
            <div><Icon name="check" /> Official GST Tax Invoices (Input Credit)</div>
            <div><Icon name="check" /> Pan-India Doorstep Deliveries (WFH Ready)</div>
            <div><Icon name="check" /> Fresh Nitrogen-Flushed Jars (9 Months Shelf Life)</div>
          </div>

          <div className="direct-b2b-contact">
            <span className="contact-head">Need an immediate quote?</span>
            <a href={APP_CONFIG.mailtoHref('Corporate enquiry')} className="text-link">
              {APP_CONFIG.email} <Icon name="arrow" />
            </a>
          </div>
        </div>
      </aside>
    </div>
  );
}
