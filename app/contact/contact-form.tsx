'use client';

import { useState, type FormEvent } from 'react';
import { Icon } from '../visuals';

export function ContactForm() {
  const [pending, setPending] = useState(false);
  const [reference, setReference] = useState('');
  const [error, setError] = useState('');

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
          occasion: 'Contact page enquiry',
          customBranding: false,
          message: String(data.get('message') || '').trim(),
          flavours: [],
        }),
      });
      const result = await response.json() as { id?: string; error?: string };
      if (!response.ok || !result.id) throw new Error(result.error || 'Unable to submit your message.');
      setReference(result.id);
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
      <div className="trade-form-grid">
        <div className="trade-form-field"><label htmlFor="contact-name">Your name *</label><input id="contact-name" name="name" autoComplete="name" required /></div>
        <div className="trade-form-field"><label htmlFor="contact-company">Company / business</label><input id="contact-company" name="company" autoComplete="organization" /></div>
        <div className="trade-form-field"><label htmlFor="contact-email">Email *</label><input id="contact-email" name="email" type="email" autoComplete="email" required /></div>
        <div className="trade-form-field"><label htmlFor="contact-phone">Phone / WhatsApp *</label><input id="contact-phone" name="phone" type="tel" autoComplete="tel" required /></div>
        <div className="trade-form-field trade-full-width"><label htmlFor="contact-city">City / country</label><input id="contact-city" name="city" autoComplete="address-level2" /></div>
        <div className="trade-form-field trade-full-width"><label htmlFor="contact-message">How can we help? *</label><textarea id="contact-message" name="message" rows={5} required placeholder="Tell us which products or services you are interested in." /></div>
      </div>
      {error && <p className="trade-form-error" role="alert">{error}</p>}
      <div className="contact-form-actions"><button className="button yellow" type="submit" disabled={pending}>{pending ? 'Sending…' : 'Send message'} <Icon name="arrow" /></button></div>
    </form>
  );
}
