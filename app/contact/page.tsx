import type { Metadata } from 'next';
import Link from 'next/link';
import { APP_CONFIG } from '@/config/APP_CONFIG';
import { SOCIAL_CONFIG } from '@/config/SOCIAL_CONFIG';
import { Icon } from '../visuals';
import { StickerHeading } from '../sticker-heading';
import { ContactForm } from './contact-form';

export const metadata: Metadata = {
  title: APP_CONFIG.pageTitle('Contact Us'),
  description: `Contact ${APP_CONFIG.name} for wholesale, private-labelling, corporate supply and export snack enquiries.`,
};

export default function ContactPage() {
  return (
    <main id="main" className="content-page contact-page shell">
      <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Contact Us</span></nav>
      <header className="content-page-header">
        <StickerHeading id="contact-title" kicker="Talk to our sourcing desk" rows={[[{ text: 'Contact', tone: 'lime' }], [{ text: 'Us', tone: 'red' }]]} />
        <p>Tell us what your business needs. We handle product sourcing, wholesale supply, private-labelling, corporate supply and export enquiries.</p>
      </header>

      <section className="contact-layout" aria-labelledby="contact-title">
        <div className="contact-direct-grid">
          <article className="contact-direct-card tone-yellow"><Icon name="chat" /><p className="eyebrow">PHONE &amp; WHATSAPP</p><a href={SOCIAL_CONFIG.whatsappHref()} target="_blank" rel="noreferrer">{APP_CONFIG.phone.display}</a><span>Speak with our commercial sourcing desk.</span></article>
          <article className="contact-direct-card tone-pink"><Icon name="mail" /><p className="eyebrow">EMAIL</p><a href={APP_CONFIG.mailtoHref('Business enquiry')}>{APP_CONFIG.email}</a><span>Share product lists, quantities and requirements.</span></article>
          <article className="contact-direct-card tone-lime"><Icon name="building" /><p className="eyebrow">PUNE OFFICE</p><address>{APP_CONFIG.address.line1}, {APP_CONFIG.address.line2}, {APP_CONFIG.address.street}, {APP_CONFIG.address.city}-{APP_CONFIG.address.postalCode}, {APP_CONFIG.address.country}</address></article>
          <Link className="contact-export-card" href="/export-query"><span><p className="eyebrow">INTERNATIONAL BUYERS</p><h2>Have an export requirement?</h2></span><Icon name="arrow" /></Link>
        </div>
        <div className="contact-form-wrap"><p className="eyebrow">SEND A MESSAGE</p><h2>Start the conversation.</h2><ContactForm /></div>
      </section>
    </main>
  );
}
