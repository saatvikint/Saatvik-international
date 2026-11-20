'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { products } from '@/content/catalogue';
import { Icon } from '../visuals';

/** Product chosen on a product page ("Request a quote for this product", client 2026-11-20). */
interface ProductPrefill {
  name: string;
  details: string;
}

export function ContactForm() {
  const [pending, setPending] = useState(false);
  const [reference, setReference] = useState('');
  const [error, setError] = useState('');
  const [prefill, setPrefill] = useState<ProductPrefill | null>(null);
  const [prefillMessage, setPrefillMessage] = useState('');

  // Read ?product=…&details=… after mount (keeps the page static; no Suspense boundary needed).
  // The message is pre-filled once; removing the product chip later keeps whatever the visitor typed.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const product = products.find(item => item.id === params.get('product'));
    if (!product) return;
    const details = (params.get('details') ?? '').slice(0, 200);
    setPrefill({ name: product.name, details });
    setPrefillMessage(`I would like a quote for ${product.name}${details ? ` (${details})` : ''}.\nEstimated quantity: \nDelivery location: `);
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const id = `STVK-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    setPending(true);
    setError('');
    try {
      const response = await fetch('/api/corporate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          name: String(data.get('name') || '').trim(),
          company: String(data.get('company') || '').trim() || 'Not specified',
          email: String(data.get('email') || '').trim(),
          phone: String(data.get('phone') || '').trim(),
          city: String(data.get('city') || '').trim() || 'Not specified',
          quantity: 'To be discussed',
          occasion: prefill ? 'Product quote request' : 'Contact page enquiry',
          customBranding: false,
          message: String(data.get('message') || '').trim(),
          flavours: prefill ? [prefill.details ? `${prefill.name} · ${prefill.details}` : prefill.name] : [],
        }),
      });
      const result = await response.json() as { id?: string; error?: string };
      if (!response.ok || !result.id) throw new Error(result.error || 'Unable to submit your message.');
      setReference(result.id);
      setPrefill(null);
      setPrefillMessage('');
      form.reset();
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : 'Unable to submit your message.');
    } finally {
      setPending(false);
    }
  }

  if (reference) {
    return <div className="contact-form-success" role="status"><Icon name="check" /><h2>Message received.</h2><p>Your reference is <strong>{reference}</strong>. Our team will review the details and contact you.</p><button className="button primary" type="button" onClick={() => setReference('')}>Send another message</button></div>;
  }

  return (
    <form className="contact-form trade-enquiry-form" onSubmit={submit}>
      {prefill && (
        <p className="contact-prefill" role="status">
          <Icon name="package" /> <span>Quote for <strong>{prefill.name}</strong>{prefill.details && <> · {prefill.details}</>}</span>
          <button type="button" onClick={() => setPrefill(null)} aria-label="Remove product from this message"><Icon name="close" /></button>
        </p>
      )}
      <div className="trade-form-grid">
        <div className="trade-form-field"><label htmlFor="contact-name">Your name *</label><input id="contact-name" name="name" autoComplete="name" required /></div>
        <div className="trade-form-field"><label htmlFor="contact-company">Company / business</label><input id="contact-company" name="company" autoComplete="organization" /></div>
        <div className="trade-form-field"><label htmlFor="contact-email">Email *</label><input id="contact-email" name="email" type="email" autoComplete="email" required /></div>
        <div className="trade-form-field"><label htmlFor="contact-phone">Phone / WhatsApp *</label><input id="contact-phone" name="phone" type="tel" autoComplete="tel" required /></div>
        <div className="trade-form-field trade-full-width"><label htmlFor="contact-city">City / country</label><input id="contact-city" name="city" autoComplete="address-level2" /></div>
        <div className="trade-form-field trade-full-width"><label htmlFor="contact-message">How can we help? *</label><textarea key={prefillMessage} id="contact-message" name="message" rows={5} required defaultValue={prefillMessage} placeholder="Tell us which products or services you are interested in." /></div>
      </div>
      {error && <p className="trade-form-error" role="alert">{error}</p>}
      <div className="contact-form-actions"><button className="button yellow" type="submit" disabled={pending}>{pending ? 'Sending…' : 'Send message'} <Icon name="arrow" /></button></div>
    </form>
  );
}
