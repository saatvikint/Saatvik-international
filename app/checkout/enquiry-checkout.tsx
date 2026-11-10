'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { DrawerRow } from '../drawer';
import { Icon } from '../visuals';
import { products, quantityTotal, type Quantities } from '../products';
import { PanelButton, useShop } from '../shop';

interface EnquiryReceipt {
  id: string;
  items: Quantities;
}

interface PendingRequest {
  payload: string;
  id: string;
}

function createEnquiryId(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');
  return [hex.slice(0, 8), hex.slice(8, 12), hex.slice(12, 16), hex.slice(16, 20), hex.slice(20)].join('-');
}

export function EnquiryCheckout() {
  const { cart, removeSubmitted } = useShop();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const [receipt, setReceipt] = useState<EnquiryReceipt | null>(null);
  const request = useRef<PendingRequest | null>(null);
  const confirmation = useRef<HTMLDivElement>(null);
  const quantities = receipt?.items ?? cart;
  const selected = products.filter(product => quantities[product.id]);
  const count = quantityTotal(quantities);

  useEffect(() => {
    if (receipt) confirmation.current?.focus();
  }, [receipt]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending || !count) return;
    const items = { ...cart };
    const details = Object.fromEntries(new FormData(event.currentTarget)) as Record<string, string>;
    const payload = JSON.stringify({ ...details, items });
    if (request.current?.payload !== payload) request.current = { payload, id: createEnquiryId() };
    setPending(true);
    setError('');

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...details, items, id: request.current?.id }),
      });
      const result = await response.json() as { id?: string; error?: string };
      if (!response.ok || !result.id) {
        setError(result.error || 'Could not send your enquiry. Please try again.');
        return;
      }
      setReceipt({ id: result.id, items });
      removeSubmitted(items);
    } catch {
      setError('Could not reach the site. Your details are still here. Please try again.');
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="checkout-layout">
      <section className="checkout-form-card" aria-labelledby={receipt ? 'enquiry-confirmation-title' : 'details-title'}>
        {receipt ? (
          <div className="checkout-confirmation" tabIndex={-1} ref={confirmation}>
            <span className="eyebrow">ENQUIRY RECEIVED</span>
            <h2 id="enquiry-confirmation-title">Thanks for your enquiry.</h2>
            <p>Your selection and contact details have been submitted.</p>
            <p className="enquiry-reference">Enquiry reference: {receipt.id.slice(0, 8).toUpperCase()}</p>
            <Link className="button primary" href="/catalog">Back to the catalog <Icon name="arrow" /></Link>
          </div>
        ) : (
          <form id="enquiry-form" method="post" action="/api/enquiries" onSubmit={submit}>
            <h2 id="details-title">Business &amp; Contact Details</h2>
            <p className="form-hint">Fields marked * are required.</p>
            <div className="form-fields">
              <label>Full name *<input name="name" autoComplete="name" maxLength={100} required placeholder="Your full name" /></label>
              <label>Email address *<input name="email" type="email" autoComplete="email" maxLength={150} required placeholder="you@company.com" /></label>
              <label>Phone / WhatsApp<input name="phone" type="tel" autoComplete="tel" maxLength={30} placeholder="+91 98765 43210" /></label>
              <label>City &amp; State<input name="city" autoComplete="address-level2" maxLength={100} placeholder="e.g. Pune, Maharashtra" /></label>
              <label className="field-wide">Message &amp; Requirement<textarea name="message" rows={4} maxLength={1000} placeholder="Mention company name, target quantities (e.g. cartons/boxes), delivery timeline, or custom packaging specifications." /></label>
            </div>
            <p className="form-hint checkout-disclosure">B2B wholesale enquiry · Official GST invoice provided · No payment collected online.</p>
            <button className="button primary send-enquiry" type="submit" disabled={pending || !count}>Submit Quotation Request <Icon name="arrow" /></button>
            <p className="form-status" role="status">{pending ? 'Sending your enquiry…' : error}</p>
          </form>
        )}
      </section>
      <aside className="checkout-summary" aria-labelledby="summary-title">
        <div className="summary-head">
          <h2 id="summary-title">{receipt ? 'Submitted selection' : 'Your selection'}</h2>
          {!receipt && <PanelButton className="summary-edit" panel="cart">Edit selection</PanelButton>}
        </div>
        <div id="checkout-items">
          {selected.map(product => (
            <DrawerRow key={product.id} product={product}><span className="summary-quantity">× {quantities[product.id]}</span></DrawerRow>
          ))}
          {!selected.length && <p className="drawer-copy">No flavours selected yet. <Link href="/catalog">Choose flavours</Link> to start an enquiry.</p>}
        </div>
        <p id="checkout-total" className="checkout-total">{count} {count === 1 ? 'item' : 'items'} in quotation list</p>
      </aside>
    </div>
  );
}
